import "source-map-support/register";

import * as fs from "fs/promises";
import * as fsPath from "path";

import { isDeclarationFile, isJavaScriptFile, isJSONFile, isSourceMapFile, normalizePath } from "../compiler/path-utils";
import { isRelevantTestFile, loadTestCase } from "../test-runner/utils";
import { ArgType, parseArgs,parserConfiguration } from "../utils/cli-parser";
import ts = require("typescript");
import { compileFiles, setCompilerOptionsFromHarnessSetting, TestFile } from "../test-runner/tsc-infrastructure/compiler-run";
import { splitContentByNewlines, TestCaseContent, TestUnitData } from "../test-runner/tsc-infrastructure/test-file-parser";
import { ensureDir, readAllFiles } from "../utils/fs-utils";
import { addTypeAnnotationTransformer } from "./code-transform";

(ts as any).Debug .enableDebugInfo();

export const testRunnerCLIConfiguration = parserConfiguration({
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    rootPaths: ArgType.StringArray(),
    shard: ArgType.Number(),
    shardCount: ArgType.Number(),
});

const excludeFilter =/\/fourslash\//;
const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);
printUsageOnErrors();

const rootCasePaths = parsedArgs.rootPaths ?? [ "./tests/sources" ];
const filter = parsedArgs.default ? new RegExp(parsedArgs.default) : /.*\.ts/;

const shard = parsedArgs.shard;
const shardCount = parsedArgs.shardCount;

const allTests = rootCasePaths
    .flatMap(r => readAllFiles(r, filter).map((file) => ({ file, root: r})))
    .filter(f => !excludeFilter.exec(f.file));



async function writeTestCase(testData: TestCaseContent & { BOM: string }, path: string)  {
    const lines = splitContentByNewlines(testData.code);
    const result: string[] = [];
    let copyFrom = 0;
    function pushFrom(target: string[], source: string[], from = 0, to: number = source.length) {
        for(let i = from; i< to; i++) {
            target.push(source[i]);
        }
    }
    for (const file of testData.testUnitData) {
        if(file.content === undefined) continue;

        pushFrom(result, lines, copyFrom, file.startLine);

        pushFrom(result, splitContentByNewlines(file.content));

        copyFrom = file.endLine + 1;
    }
    pushFrom(result, lines, copyFrom, lines.length);
    await ensureDir(fsPath.dirname(path));
    const content = testData.BOM + result.join(lines.delimiter);
    await fs.writeFile(path, content);
}

async function main() {
    const testsPerShared = shardCount && Math.round(allTests.length / shardCount);
    const [start, end] = shard === undefined || shardCount === undefined || testsPerShared === undefined ?
        [0, allTests.length] :
        [shard * testsPerShared, (shard === shardCount - 1) ? allTests.length : (shard + 1) * testsPerShared];


    for (let count = start; count < end; count++) {
        const testFile = normalizePath(allTests[count].file);
        console.error(`Testing File ${testFile}`);
        const rootPath = normalizePath(allTests[count].root);
        const caseData = await loadTestCase(testFile);

        const settings: ts.CompilerOptions = {};
        setCompilerOptionsFromHarnessSetting(caseData.settings, settings);

        function createHarnessTestFile(lastUnit: TestUnitData): TestFile {
            return { unitName: lastUnit.name, content: lastUnit.content, fileOptions: lastUnit.fileOptions };
        }

        const toBeCompiled = caseData.testUnitData.map(unit => {
            return createHarnessTestFile(unit);
        });

        await writeTestCase(caseData, testFile.replace(rootPath, "./tsc-tests/original-tests"));

        const result = compileFiles(toBeCompiled, [], {
            declaration: "true",
            isolatedDeclarations: "true",
            removeComments: "false",
        }, settings, /** compilerOptions= */ undefined);
        const program = result.program!;



        for(const testFileContent of caseData.testUnitData) {
            if(!isRelevantTestFile(testFileContent)) continue;
            try {
                const sourceFile = program.getSourceFile(testFileContent.name)!;
                program.getDeclarationDiagnostics(sourceFile);

                if(!sourceFile) continue;
                let moduleResolutionHost: ts.ModuleResolutionHost| undefined;
                program.emit(sourceFile, /**writeFile=*/ undefined, /**cancellationToken=*/ undefined, /**emitOnlyDtsFiles=*/ true, {
                    afterDeclarations:[
                    (c) => {
                        // @ts-expect-error getEmitHost is not exposed
                        moduleResolutionHost = c.getEmitHost();
                        return (v) => v;
                    }]
                });
                const transformedFile = ts.transform(sourceFile, [
                    addTypeAnnotationTransformer(program, moduleResolutionHost),
                ]);

                const printer = ts.createPrinter({
                    onlyPrintJsDocStyle: true,
                    newLine: settings.newLine,
                    target: settings.target,
                    removeComments: false,
                } as ts.PrinterOptions);


                const resultStr = printer.printFile(
                    transformedFile.transformed[0] as ts.SourceFile
                );
                testFileContent.content = resultStr;
            }
            catch(e) {
                console.log(`Test ${testFile} failed to transform`);
                process.exit();
            }
        }
        await writeTestCase(caseData, testFile.replace(rootPath, "./tsc-tests/updated-tests"));
        console.log(`Ran: ${count}`);
    }
}

main();
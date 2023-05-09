import * as childProcess from "child_process";
import * as path from "path";

import { ArgType, parseArgs } from "../utils/cli-parser";

interface ExecuteResult {
    error: childProcess.ExecException | null
    stdout: string,
    stderr: string,
}

function exec(cmd: string, dir: string, onStdOut: (s: string) => void) {
    return new Promise<ExecuteResult>((resolve) => {
        console.log(`In ${dir} Executing: ${cmd}`);

        const ls  = childProcess.spawn(cmd, [], {
            cwd: path.resolve(path.join(process.cwd(), dir)),
            shell: true
        });
        let stdout = "";
        let stderr = "";
        ls.stdout.on("data", (data) => {
            if(!onStdOut) {
                process.stdout.write(data.toString());
            }
            else {
                onStdOut(data.toString());
            }
            stdout += data.toString();
        });

        ls.stderr.on("data", (data) => {
            process.stderr.write(data.toString());
            stderr += data.toString();
        });

        ls.on("error", (err) => {
            console.log(err);
        });
        ls.on("exit", (code) => {
            console.log("exited:" + code?.toString());
            resolve({
                error: !code ? null : Object.assign(new Error(""), {
                    code,
                    cmd,
                }),
                stderr,
                stdout
            });
        });
    });
}

const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), {
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    rootPaths: ArgType.StringArray(),
    shardCount: ArgType.Number(),
});
printUsageOnErrors();

const shardCount = parsedArgs.shardCount ?? 6;

async function main() {
    let runCount = 0;
    const commandLine = `node ./build/code-mod/test-updater.js  ${process.argv.slice(2).join(" ")} ${
        parsedArgs.shardCount === undefined ? `--shardCount=${shardCount} `: ""
    }`;
    let lastWrite = new Date().getTime();
    const startTime = new Date().getTime();
    const elapsedTime = (now: number) => `${((now - startTime) / 1000 / 60).toFixed(2)} minutes`;
    const promisees = Array.from({ length: shardCount }).map(async (_, index) => {
        await exec(commandLine + ` --shard=${index}`, "./", out => {
            runCount += (out.match(/Ran:/g) || []).length;
            if(new Date().getTime() - lastWrite > 2000) {
                lastWrite = new Date().getTime();
                console.log(`Run count: ${runCount} after ${elapsedTime(lastWrite)}`);
            }
        });
        console.log(`Shard ${index} completed`);
    });
    await Promise.all(promisees);
    const endTime = new Date().getTime();
    console.log(`Took ${elapsedTime(endTime)} to complete ${runCount}`);
}

main();
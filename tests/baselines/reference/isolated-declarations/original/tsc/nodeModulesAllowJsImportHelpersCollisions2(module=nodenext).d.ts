//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportHelpersCollisions2.ts] ////

//// [index.ts]
// cjs format file
export * from "fs";
export * as fs from "fs";
//// [index.js]
// esm format file
export * from "fs";
export * as fs from "fs";
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}

/// [Declarations] ////



//// [/.src/out/index.d.ts]
/// <reference path="../types.d.ts" />
export * from "fs";
export * as fs from "fs";

/// [Errors] ////

error TS6504: File 'index.js' is a JavaScript file. Did you mean to enable the 'allowJs' option?
  The file is in the program because:
    Root file specified for compilation
subfolder/index.ts(2,1): error TS2343: This syntax requires an imported helper named '__exportStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
subfolder/index.ts(2,1): error TS9024: Declaration emit for this expression requires adding a type reference directive to './types' with --isolatedDeclarations.
subfolder/index.ts(3,1): error TS2343: This syntax requires an imported helper named '__importStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.


!!! error TS6504: File 'index.js' is a JavaScript file. Did you mean to enable the 'allowJs' option?
!!! error TS6504:   The file is in the program because:
!!! error TS6504:     Root file specified for compilation
==== subfolder/index.ts (3 errors) ====
    // cjs format file
    export * from "fs";
    ~~~~~~~~~~~~~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__exportStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
    ~~~~~~~~~~~~~~~~~~~
!!! error TS9024: Declaration emit for this expression requires adding a type reference directive to './types' with --isolatedDeclarations.
    export * as fs from "fs";
    ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__importStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
==== index.js (0 errors) ====
    // esm format file
    export * from "fs";
    export * as fs from "fs";
==== package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module"
    }
==== subfolder/package.json (0 errors) ====
    {
        "type": "commonjs"
    }
==== types.d.ts (0 errors) ====
    declare module "fs";
    declare module "tslib" {
        export {};
        // intentionally missing all helpers
    }
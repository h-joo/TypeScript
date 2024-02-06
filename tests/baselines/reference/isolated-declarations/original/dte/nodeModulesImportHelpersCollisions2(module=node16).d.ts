//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions2.ts] ////

//// [index.ts]
// cjs format file
export * from "fs";
export * as fs from "fs";
//// [index.ts]
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



//// [index.d.ts]
export * from "fs";
export * as fs from "fs";

//// [subfolder/index.d.ts]
export * from "fs";
export * as fs from "fs";

/// [Errors] ////

subfolder/index.ts(2,1): error TS2343: This syntax requires an imported helper named '__exportStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
subfolder/index.ts(3,1): error TS2343: This syntax requires an imported helper named '__importStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.


==== subfolder/index.ts (2 errors) ====
    // cjs format file
    export * from "fs";
    ~~~~~~~~~~~~~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__exportStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
    export * as fs from "fs";
    ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__importStar' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
==== index.ts (0 errors) ====
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
//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions3.ts] ////

//// [index.ts]
// cjs format file
export {default} from "fs";
//// [index.ts]
// esm format file
export {default} from "fs";
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
/// <reference path="types.d.ts" />
export { default } from "fs";

//// [subfolder/index.d.ts]
/// <reference path="../types.d.ts" />
export { default } from "fs";

/// [Errors] ////

index.ts(2,1): error TS9024: Declaration emit for this expression requires adding a type reference directive to '.types.js' with --isolatedDeclarations.
subfolder/index.ts(2,1): error TS9024: Declaration emit for this expression requires adding a type reference directive to './types' with --isolatedDeclarations.
subfolder/index.ts(2,9): error TS2343: This syntax requires an imported helper named '__importDefault' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.


==== subfolder/index.ts (2 errors) ====
    // cjs format file
    export {default} from "fs";
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9024: Declaration emit for this expression requires adding a type reference directive to './types' with --isolatedDeclarations.
            ~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__importDefault' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
==== index.ts (1 errors) ====
    // esm format file
    export {default} from "fs";
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9024: Declaration emit for this expression requires adding a type reference directive to '.types.js' with --isolatedDeclarations.
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
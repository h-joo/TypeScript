//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.multiFileBackReferenceToSelf.ts] ////

//// [main.ts]
import { fa } from "ext";
import { fb } from "ext/other";

export const va: any = fa();
export const vb = fb();

//// [package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

//// [index.d.ts]
export interface A {}
export function fa(): A;

//// [other.d.ts]
export interface B {}
export function fb(): B;

//// [index.d.ts]
export * from "../";

//// [other.d.ts]
export * from "../other";


/// [Declarations] ////



//// [/.src/main.d.ts]
export declare const va: any;
export declare const vb: invalid;
//# sourceMappingURL=main.d.ts.map
/// [Errors] ////

main.ts(1,10): error TS2305: Module '"ext"' has no exported member 'fa'.
main.ts(5,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== main.ts (2 errors) ====
    import { fa } from "ext";
             ~~
!!! error TS2305: Module '"ext"' has no exported member 'fa'.
    import { fb } from "ext/other";
    
    export const va: any = fa();
    export const vb = fb();
                 ~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 main.ts:5:14: Add a type annotation to the variable vb.
    
==== node_modules/ext/package.json (0 errors) ====
    {
        "name": "ext",
        "version": "1.0.0",
        "types": "index",
        "typesVersions": {
            ">=3.1.0-0": { "*" : ["ts3.1/*"] }
        }
    }
    
==== node_modules/ext/index.d.ts (0 errors) ====
    export interface A {}
    export function fa(): A;
    
==== node_modules/ext/other.d.ts (0 errors) ====
    export interface B {}
    export function fb(): B;
    
==== node_modules/ext/ts3.1/index.d.ts (0 errors) ====
    export * from "../";
    
==== node_modules/ext/ts3.1/other.d.ts (0 errors) ====
    export * from "../other";
    
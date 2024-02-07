//// [tests/cases/compiler/declarationEmitUsingTypeAlias1.ts] ////

//// [inner.d.ts]
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

//// [index.d.ts]
export type OtherType = import('./inner').Other;
export type SomeType = import('./inner').SomeType;

//// [package.json]
{
  "name": "some-dep",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [index.ts]
import { SomeType } from "some-dep";

export const foo = (thing: SomeType): SomeType => {
  return thing;
};

export const bar = (thing: SomeType): Other => {
  return thing.arg;
};

/// [Declarations] ////


/// [Errors] ////

src/index.ts(7,39): error TS2304: Cannot find name 'Other'.
src/index.ts(7,39): error TS4025: Exported variable 'bar' has or is using private name 'Other'.


==== node_modules/some-dep/dist/inner.d.ts (0 errors) ====
    export declare type Other = { other: string };
    export declare type SomeType = { arg: Other };
    
==== node_modules/some-dep/dist/index.d.ts (0 errors) ====
    export type OtherType = import('./inner').Other;
    export type SomeType = import('./inner').SomeType;
    
==== node_modules/some-dep/package.json (0 errors) ====
    {
      "name": "some-dep",
      "exports": {
        ".": "./dist/index.js"
      }
    }
    
==== src/index.ts (2 errors) ====
    import { SomeType } from "some-dep";
    
    export const foo = (thing: SomeType): SomeType => {
      return thing;
    };
    
    export const bar = (thing: SomeType): Other => {
                                          ~~~~~
!!! error TS2304: Cannot find name 'Other'.
                                          ~~~~~
!!! error TS4025: Exported variable 'bar' has or is using private name 'Other'.
      return thing.arg;
    };
//// [tests/cases/compiler/declarationEmitReexportedSymlinkReference2.ts] ////

//// [index.ts]
export * from './keys';
//// [keys.ts]
import {MetadataAccessor} from "@raymondfeng/pkg2";

export const ADMIN = MetadataAccessor.create<boolean>('1');
//// [index.d.ts]
export * from './types';
//// [types.d.ts]
export declare type A = {
    id: string;
};
export declare type B = {
    id: number;
};
export declare type IdType = A | B;
export declare class MetadataAccessor<T, D extends IdType = IdType> {
    readonly key: string;
    private constructor();
    toString(): string;
    static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
}
//// [package.json]
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [index.d.ts]
import "./secondary";
export * from './types';
//// [types.d.ts]
export {MetadataAccessor} from '@raymondfeng/pkg1';
//// [secondary.d.ts]
export {IdType} from '@raymondfeng/pkg1';
//// [package.json]
{
    "name": "@raymondfeng/pkg2",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}

/// [Declarations] ////



//// [/.src/monorepo/pkg3/dist/index.d.ts]
export * from './keys';
//# sourceMappingURL=index.d.ts.map
//// [/.src/monorepo/pkg3/dist/keys.d.ts]
export declare const ADMIN: invalid;
//# sourceMappingURL=keys.d.ts.map
/// [Errors] ////

monorepo/pkg3/src/keys.ts(3,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== monorepo/pkg3/src/index.ts (0 errors) ====
    export * from './keys';
==== monorepo/pkg3/src/keys.ts (1 errors) ====
    import {MetadataAccessor} from "@raymondfeng/pkg2";
    
    export const ADMIN = MetadataAccessor.create<boolean>('1');
                 ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9028 monorepo/pkg3/src/keys.ts:3:14: Add a type annotation to the variable ADMIN.
==== monorepo/pkg1/dist/index.d.ts (0 errors) ====
    export * from './types';
==== monorepo/pkg1/dist/types.d.ts (0 errors) ====
    export declare type A = {
        id: string;
    };
    export declare type B = {
        id: number;
    };
    export declare type IdType = A | B;
    export declare class MetadataAccessor<T, D extends IdType = IdType> {
        readonly key: string;
        private constructor();
        toString(): string;
        static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
    }
==== monorepo/pkg1/package.json (0 errors) ====
    {
        "name": "@raymondfeng/pkg1",
        "version": "1.0.0",
        "description": "",
        "main": "dist/index.js",
        "typings": "dist/index.d.ts"
    }
==== monorepo/pkg2/dist/index.d.ts (0 errors) ====
    import "./secondary";
    export * from './types';
==== monorepo/pkg2/dist/types.d.ts (0 errors) ====
    export {MetadataAccessor} from '@raymondfeng/pkg1';
==== monorepo/pkg2/dist/secondary.d.ts (0 errors) ====
    export {IdType} from '@raymondfeng/pkg1';
==== monorepo/pkg2/package.json (0 errors) ====
    {
        "name": "@raymondfeng/pkg2",
        "version": "1.0.0",
        "description": "",
        "main": "dist/index.js",
        "typings": "dist/index.d.ts"
    }
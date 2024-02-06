//// [tests/cases/compiler/declarationEmitBundleWithAmbientReferences.ts] ////

//// [lib.d.ts]
declare module "lib/result" {
    export type Result<E extends Error, T> = (E & Failure<E>) | (T & Success<T>);
    export interface Failure<E extends Error> { }
    export interface Success<T> { }
}

//// [datastore_result.ts]
import { Result } from "lib/result";

export type T<T> = Result<Error, T>;

//// [conditional_directive_field.ts]
import * as DatastoreResult from "src/datastore_result";

export const build = (): DatastoreResult.T<string> => {
	return null;
};


/// [Declarations] ////



//// [src/conditional_directive_field.d.ts]
import * as DatastoreResult from "src/datastore_result";
export declare const build: () => DatastoreResult.T<string>;

//// [src/datastore_result.d.ts]
import { Result } from "lib/result";
export type T<T> = Result<Error, T>;

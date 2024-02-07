//// [tests/cases/compiler/declarationEmitInvalidReferenceAllowJs.ts] ////

//// [declarationEmitInvalidReferenceAllowJs.ts]
/// <reference path="invalid" />
var x = 0; 


/// [Declarations] ////



//// [declarationEmitInvalidReferenceAllowJs.d.ts]
declare var x: number;

/// [Errors] ////

declarationEmitInvalidReferenceAllowJs.ts(1,22): error TS6231: Could not resolve the path 'invalid' with the extensions: '.ts', '.tsx', '.d.ts', '.cts', '.d.cts', '.mts', '.d.mts'.


==== declarationEmitInvalidReferenceAllowJs.ts (1 errors) ====
    /// <reference path="invalid" />
                         ~~~~~~~
!!! error TS6231: Could not resolve the path 'invalid' with the extensions: '.ts', '.tsx', '.d.ts', '.cts', '.d.cts', '.mts', '.d.mts'.
    var x = 0; 
    
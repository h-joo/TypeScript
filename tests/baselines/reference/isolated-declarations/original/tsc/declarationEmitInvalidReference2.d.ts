//// [tests/cases/compiler/declarationEmitInvalidReference2.ts] ////

//// [declarationEmitInvalidReference2.ts]
/// <reference path="invalid.ts" />
var x = 0;

/// [Declarations] ////



//// [declarationEmitInvalidReference2.d.ts]
declare var x: number;

/// [Errors] ////

declarationEmitInvalidReference2.ts(1,22): error TS6053: File 'invalid.ts' not found.


==== declarationEmitInvalidReference2.ts (1 errors) ====
    /// <reference path="invalid.ts" />
                         ~~~~~~~~~~
!!! error TS6053: File 'invalid.ts' not found.
    var x = 0;
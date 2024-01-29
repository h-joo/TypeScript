//// [tests/cases/compiler/declarationEmitFunctionDuplicateNamespace.ts] ////

//// [declarationEmitFunctionDuplicateNamespace.ts]
function f(a: 0): 0;
function f(a: 1): 1;
function f(a: 0 | 1) {
    return a;
}

f.x = 2;


/// [Declarations] ////



//// [declarationEmitFunctionDuplicateNamespace.d.ts]
declare function f(a: 0): 0;
declare function f(a: 1): 1;
declare namespace f {
    var x: invalid;
}
//# sourceMappingURL=declarationEmitFunctionDuplicateNamespace.d.ts.map
/// [Errors] ////

declarationEmitFunctionDuplicateNamespace.ts(7,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitFunctionDuplicateNamespace.ts (1 errors) ====
    function f(a: 0): 0;
    function f(a: 1): 1;
    function f(a: 0 | 1) {
        return a;
    }
    
    f.x = 2;
    ~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
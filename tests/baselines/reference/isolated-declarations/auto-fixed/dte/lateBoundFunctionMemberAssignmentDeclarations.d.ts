//// [tests/cases/compiler/lateBoundFunctionMemberAssignmentDeclarations.ts] ////

//// [index.ts]
export function foo(): void {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];


/// [Declarations] ////



//// [index.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var bar: invalid;
}
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

index.ts(2,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index.ts(4,1): error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== index.ts (2 errors) ====
    export function foo(): void {}
    foo.bar = 12;
    ~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    const _private = Symbol();
    foo[_private] = "ok";
    ~~~~~~~~~~~~~
!!! error TS9023: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    const x: string = foo[_private];
    
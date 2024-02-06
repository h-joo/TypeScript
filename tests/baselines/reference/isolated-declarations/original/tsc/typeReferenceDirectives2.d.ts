//// [tests/cases/compiler/typeReferenceDirectives2.ts] ////

//// [app.ts]
interface A {
    x: $
}
//// [index.d.ts]
interface $ { x }


/// [Declarations] ////



//// [/app.d.ts]
interface A {
    x: $;
}

/// [Errors] ////

/app.ts(2,8): error TS9024: Declaration emit for this expression requires adding a type reference directive to 'lib' with --isolatedDeclarations.


==== /app.ts (1 errors) ====
    interface A {
        x: $
           ~
!!! error TS9024: Declaration emit for this expression requires adding a type reference directive to 'lib' with --isolatedDeclarations.
    }
==== /types/lib/index.d.ts (0 errors) ====
    interface $ { x }
    
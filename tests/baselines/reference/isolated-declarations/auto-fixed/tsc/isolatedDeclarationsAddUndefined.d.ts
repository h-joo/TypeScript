//// [tests/cases/compiler/isolatedDeclarationsAddUndefined.ts] ////

//// [file1.ts]
type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3?: 1 | undefined = 1 as N;
    readonly r = 1;
    f = 2;
}

//// [file2.ts]
export function foo(p = (ip = 10, v: number): void => {}): void{
}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

/// [Declarations] ////



//// [file1.d.ts]
type N = 1;
export declare class Bar {
    c?: readonly [N] | undefined;
    c3?: 1 | undefined;
    readonly r = 1;
    f: number;
}
export {};
//# sourceMappingURL=file1.d.ts.map
//// [file2.d.ts]
export declare function foo(p?: (ip: number | undefined, v: number) => void): void;
export declare class Bar2 {
    readonly r = 1;
    f: number;
}
//# sourceMappingURL=file2.d.ts.map
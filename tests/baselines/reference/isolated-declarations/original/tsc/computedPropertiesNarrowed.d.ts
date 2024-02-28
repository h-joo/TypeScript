//// [tests/cases/compiler/computedPropertiesNarrowed.ts] ////

//// [computedPropertiesNarrowed.ts]
const x: 0 | 1 = Math.random()? 0: 1;
declare function assert(n: number): asserts n is 1;
assert(x);
export let o = {
    [x]: 1 // error narrow type !== declared type
}


const y: 0 = 0
export let o2 = {
    [y]: 1 // ok literal computed type 
}

// literals are ok
export let o3 = { [1]: 1 }
export let o31 = { [-1]: 1 }

export let o32 = { [1-1]: 1 } // error number 

let u = Symbol();
export let o4 = {
    [u]: 1 // Should error, nut a unique symbol
}

export let o5  ={
    [Symbol()]: 1 // Should error
}

const uu: unique symbol = Symbol();
export let o6  = {
    [uu]: 1 // Should be ok
}


function foo (): 1 { return 1; }
export let o7 = {
    [foo()]: 1 // Should error
};

let E = { A: 1 } as const
export const o8 = {
    [E.A]: 1 // Fresh 
}

function ns() { return { v: 0 } as const }
export const o9 = {
    [ns().v]: 1
}


/// [Declarations] ////



//// [computedPropertiesNarrowed.d.ts]
declare const x: 0 | 1;
export declare let o: {
    [x]: number;
};
declare const y: 0;
export declare let o2: {
    [y]: number;
};
export declare let o3: {
    [1]: number;
};
export declare let o31: {
    [-1]: number;
};
export declare let o32: invalid;
declare let u: invalid;
export declare let o4: {
    [u]: number;
};
export declare let o5: invalid;
declare const uu: unique symbol;
export declare let o6: {
    [uu]: number;
};
export declare let o7: invalid;
declare let E: {
    readonly A: 1;
};
export declare const o8: {
    [E.A]: number;
};
export declare const o9: invalid;
export {};

/// [Errors] ////

computedPropertiesNarrowed.ts(5,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertiesNarrowed.ts(18,20): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertiesNarrowed.ts(20,5): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
computedPropertiesNarrowed.ts(22,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertiesNarrowed.ts(26,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertiesNarrowed.ts(37,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertiesNarrowed.ts(47,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== computedPropertiesNarrowed.ts (7 errors) ====
    const x: 0 | 1 = Math.random()? 0: 1;
    declare function assert(n: number): asserts n is 1;
    assert(x);
    export let o = {
        [x]: 1 // error narrow type !== declared type
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:4:12: Add a type annotation to the variable o.
    }
    
    
    const y: 0 = 0
    export let o2 = {
        [y]: 1 // ok literal computed type 
    }
    
    // literals are ok
    export let o3 = { [1]: 1 }
    export let o31 = { [-1]: 1 }
    
    export let o32 = { [1-1]: 1 } // error number 
                       ~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:18:12: Add a type annotation to the variable o32.
    
    let u = Symbol();
        ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:20:5: Add a type annotation to the variable u.
    export let o4 = {
        [u]: 1 // Should error, nut a unique symbol
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:21:12: Add a type annotation to the variable o4.
    }
    
    export let o5  ={
        [Symbol()]: 1 // Should error
        ~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:25:12: Add a type annotation to the variable o5.
    }
    
    const uu: unique symbol = Symbol();
    export let o6  = {
        [uu]: 1 // Should be ok
    }
    
    
    function foo (): 1 { return 1; }
    export let o7 = {
        [foo()]: 1 // Should error
        ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:36:12: Add a type annotation to the variable o7.
    };
    
    let E = { A: 1 } as const
    export const o8 = {
        [E.A]: 1 // Fresh 
    }
    
    function ns() { return { v: 0 } as const }
    export const o9 = {
        [ns().v]: 1
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertiesNarrowed.ts:46:14: Add a type annotation to the variable o9.
    }
    
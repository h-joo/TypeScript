//// [tests/cases/compiler/declarationEmitObjectAssignedDefaultExport.ts] ////

//// [index.d.ts]
interface Statics {
    "$$whatever": string;
}
declare namespace hoistNonReactStatics {
    type NonReactStatics<T> = {[X in Exclude<keyof T, keyof Statics>]: T[X]}
}
export = hoistNonReactStatics;
//// [index.d.ts]
import * as hoistNonReactStatics from "hoist-non-react-statics";
export interface DefaultTheme {}
export type StyledComponent<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> =
    string
    & StyledComponentBase<TTag, TTheme, TStyle, TWhatever>
    & hoistNonReactStatics.NonReactStatics<TTag>;
export interface StyledComponentBase<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> {
    tag: TTag;
    theme: TTheme;
    style: TStyle;
    whatever: TWhatever;
}
export interface StyledInterface {
    div: (a: TemplateStringsArray) => StyledComponent<"div">;
}

declare const styled: StyledInterface;
export default styled;
//// [index.ts]
import styled, { DefaultTheme, StyledComponent } from "styled-components";

const A = styled.div``;
const B = styled.div``;
export const C: StyledComponent<"div", DefaultTheme, {}, never> = styled.div``;

export default Object.assign(A, {
    B,
    C
});


/// [Declarations] ////



//// [index.d.ts]
import { DefaultTheme, StyledComponent } from "styled-components";
export declare const C: StyledComponent<"div", DefaultTheme, {}, never>;
declare const _default: invalid;
export default _default;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

index.ts(7,1): error TS2742: The inferred type of 'default' cannot be named without a reference to 'styled-components/node_modules/hoist-non-react-statics'. This is likely not portable. A type annotation is necessary.
index.ts(7,16): error TS9038: Default exports can't be inferred with --isolatedDeclarations.


==== node_modules/styled-components/node_modules/hoist-non-react-statics/index.d.ts (0 errors) ====
    interface Statics {
        "$$whatever": string;
    }
    declare namespace hoistNonReactStatics {
        type NonReactStatics<T> = {[X in Exclude<keyof T, keyof Statics>]: T[X]}
    }
    export = hoistNonReactStatics;
==== node_modules/styled-components/index.d.ts (0 errors) ====
    import * as hoistNonReactStatics from "hoist-non-react-statics";
    export interface DefaultTheme {}
    export type StyledComponent<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> =
        string
        & StyledComponentBase<TTag, TTheme, TStyle, TWhatever>
        & hoistNonReactStatics.NonReactStatics<TTag>;
    export interface StyledComponentBase<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> {
        tag: TTag;
        theme: TTheme;
        style: TStyle;
        whatever: TWhatever;
    }
    export interface StyledInterface {
        div: (a: TemplateStringsArray) => StyledComponent<"div">;
    }
    
    declare const styled: StyledInterface;
    export default styled;
==== index.ts (2 errors) ====
    import styled, { DefaultTheme, StyledComponent } from "styled-components";
    
    const A = styled.div``;
    const B = styled.div``;
    export const C: StyledComponent<"div", DefaultTheme, {}, never> = styled.div``;
    
    export default Object.assign(A, {
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   ~~~~~~~~~~~~~~~~~~
        B,
    ~~~~~~
    ~~~~~~
        C
    ~~~~~
    ~~~~~
    });
    ~~~
!!! error TS2742: The inferred type of 'default' cannot be named without a reference to 'styled-components/node_modules/hoist-non-react-statics'. This is likely not portable. A type annotation is necessary.
    ~~
!!! error TS9038: Default exports can't be inferred with --isolatedDeclarations.
!!! related TS9037 index.ts:7:1: Move the expression in default export to a variable and add a type annotation to it.
    
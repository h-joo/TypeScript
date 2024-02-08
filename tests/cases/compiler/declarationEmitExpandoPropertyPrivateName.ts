// @declaration: true
// @isolatedDeclarationFixedDiffReason: Cannot name internal type
// @filename: a.ts
interface I {}
export function f(): I { return null as I; }
// @filename: b.ts
import {f} from "./a";

export function q() {}
q.val = f();

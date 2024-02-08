// @strictNullChecks: true
// @declaration: true
// @isolatedDeclarationDiffReason: Implicit undefined in parameter can only be detected by TSC.
// @isolatedDeclarationFixedDiffReason: Implicit undefined not fixed by code mod yet
export class Foo {
  constructor(public bar?: string) {
  }
}

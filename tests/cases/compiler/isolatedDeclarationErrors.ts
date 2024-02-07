// @declaration: true
// @isolatedDeclarations: true
// @isolatedDeclarationFixedDiffReason: Function declarations are not fixed
// @target: ESNext

function errorOnAssignmentBelowDecl(): void {}
errorOnAssignmentBelowDecl.a = "";

const errorOnAssignmentBelow = (): void => {}
errorOnAssignmentBelow.a = "";

const errorOnMissingReturn = () => {}
errorOnMissingReturn.a = "";

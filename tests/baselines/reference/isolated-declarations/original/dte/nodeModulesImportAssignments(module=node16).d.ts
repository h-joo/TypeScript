//// [tests/cases/conformance/node/nodeModulesImportAssignments.ts] ////

//// [index.ts]
// cjs format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [index.ts]
// esm format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [file.ts]
// esm format file
const __require = null;
const _createRequire = null;
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";

/// [Declarations] ////



//// [file.d.ts]
export import fs2 = require("fs");

//// [index.d.ts]
export import fs2 = require("fs");

//// [subfolder/index.d.ts]
export import fs2 = require("fs");

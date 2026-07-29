const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/return \\\`<a target="_blank"\\\$\\{p1\\}>\\\`;/, 'return `<a target="_blank"${p1}>`;');
code = code.replace(/return \\\`<a \\\$\\{p1\\}>\\\`;/, 'return `<a ${p1}>`;');
fs.writeFileSync('server.ts', code);

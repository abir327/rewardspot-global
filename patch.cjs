const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/\\`\<a/g, '`<a');
code = code.replace(/\\$\{p1\}>\\`/g, '${p1}>`');
fs.writeFileSync('server.ts', code);

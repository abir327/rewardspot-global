const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(
    /html = html\.replace\(\/<a\(\\s\+\[\^>\]\+\)>\/ig, \(match, p1\) => \{\s+if \(\!p1\.includes\('target="_blank"'\)\) \{\s+return `<a target="_blank"\$\{p1\}>`;\s+\}\s+return match;\s+\}\);/,
    `html = html.replace(/<a(\\s+[^>]+)>/ig, (match, p1) => {
                if (p1.includes('http') && !p1.includes('target="_blank"')) {
                    return \`<a target="_blank"\${p1}>\`;
                }
                // Strip target="_blank" from relative links to fix navigation in iframe
                if (!p1.includes('http') && p1.includes('target="_blank"')) {
                    p1 = p1.replace(/target="_blank"\\s*/g, '');
                    return \`<a \${p1}>\`;
                }
                return match;
            });`
);

fs.writeFileSync('server.ts', serverCode);
console.log('Fixed target=_blank for internal links');

const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
    /html = html\.replace\(\/€250\/g, '500 zł'\);\s*html = html\.replace\(\/Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!\/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card'\);\s*html = html\.replace\(\/Sichern Sie sich die Chance auf einen Biedronka-Gutschein im Wert von 500 zł!\/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card'\);/g,
    `
                html = html.replace(/Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card');
                html = html.replace(/€250/g, '500 zł');
    `
);

fs.writeFileSync('server.ts', code);
console.log('Patched');

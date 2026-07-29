const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
    /html = html.replace\(\/Edeka-Gutschein im Wert von €250!\/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card'\);/,
    `html = html.replace(/Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card');
                html = html.replace(/Sichern Sie sich die Chance auf einen Biedronka-Gutschein im Wert von 500 zł!/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card');`
);

code = code.replace(
    /html = html.replace\(\/Discover a Germany-focused/g, 'html = html.replace(/Discover a Germany-focused/g, "Discover a Poland-focused"); html = html.replace(/Discover a Germany-focused'
); // Just in case, I will do it explicitly

code = code.replace(
    /html = html\.replace\(\/Edeka\/g, 'Biedronka'\);/,
    `html = html.replace(/Edeka/g, 'Biedronka');
                html = html.replace(/Discover a Germany-focused/g, 'Discover a Poland-focused');
                html = html.replace(/offer_id=19137/g, 'offer_id=99999');`
);

fs.writeFileSync('server.ts', code);
console.log('Patched');

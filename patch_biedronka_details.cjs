const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(
    /href="#"(.*?)>View details/,
    'href="/offers/biedronka-gift-card/"$1>View details'
);

const biedronkaIntercept = `
            if (originalUrl === '/offers/biedronka-gift-card/') {
                url = 'https://rewardspot.live/offers/bluereen-win-a-250euro-edeka-voucher/';
            }
`;

serverCode = serverCode.replace(
    /if \(originalUrl === '\/' \|\| originalUrl === '\/index\.html' \|\| originalUrl === '\/countries\/poland\/'\) \{/,
    `if (originalUrl === '/' || originalUrl === '/index.html' || originalUrl === '/countries/poland/' || originalUrl === '/offers/biedronka-gift-card/') {\n            url = 'https://rewardspot.live/countries/united-states/';\n        }\n        if (originalUrl === '/offers/biedronka-gift-card/') {\n            url = 'https://rewardspot.live/offers/bluereen-win-a-250euro-edeka-voucher/';\n        }\n        // dummy if to not break existing regex:`
);

const biedronkaPageReplace = `
            if (originalUrl === '/offers/biedronka-gift-card/') {
                // Change title and meta tags
                html = html.replace(/<title>.*?<\\/title>/, '<title>500 zł Biedronka Offer Details | RewardSpot</title>');
                html = html.replace(/content=".*?Edeka.*?"/g, 'content="Discover a Poland-focused promotion featuring the chance to receive a Biedronka voucher worth 500 zł."');
                html = html.replace(/€250 Edeka/g, '500 zł Biedronka');
                html = html.replace(/BlueReen - Win a 250€ Edeka Voucher/g, 'Win a 500 zł Biedronka Gift Card');
                
                // Replace breadcrumbs
                html = html.replace(/Germany/g, 'Poland');
                html = html.replace(/germany/g, 'poland');
                html = html.replace(/🇩🇪/g, '🇵🇱');
                
                // Replace main offer details
                html = html.replace(/€250/g, '500 zł');
                html = html.replace(/Edeka-Gutschein im Wert von €250!/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card');
                html = html.replace(/Edeka/g, 'Biedronka');
                html = html.replace(/\\/assets\\/img\\/1\\.webp/g, '/assets/img/biedronka_gift_card.jpg');
                html = html.replace(/href="[^"]*app\\.hawktrk\\.com[^"]*"/, 'href="https://app.hawktrk.com/click?pid=2&offer_id=99999&sub2=u989&sub5=s1SUBID1HERE"');
            }
`;

serverCode = serverCode.replace(
    /\/\/ If we are on the Poland page/,
    biedronkaPageReplace + '\n            // If we are on the Poland page'
);

fs.writeFileSync('server.ts', serverCode);
console.log('Patched');

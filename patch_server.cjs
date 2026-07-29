const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(
    /if \(originalUrl === '\/offers\/biedronka-gift-card\/'\) \{[\s\S]*?\/\/ If we are on the Poland page, CLEAR the other offers and just show Poland/m,
    `if (originalUrl === '/offers/biedronka-gift-card/') {
                // Change title and meta tags
                html = html.replace(/<title>.*?<\\/title>/, '<title>500 zł Biedronka Offer Details | RewardSpot</title>');
                html = html.replace(/content=".*?Edeka.*?"/g, 'content="Discover a Poland-focused promotion featuring the chance to receive a Biedronka voucher worth 500 zł."');
                
                // Replace breadcrumbs carefully
                html = html.replace(/>Germany</g, '>Poland<');
                html = html.replace(/\\/countries\\/germany\\//g, '/countries/poland/');
                html = html.replace(/🇩🇪 Germany/g, '🇵🇱 Poland');
                
                // Replace main offer details (using generic string replace for the specific Edeka strings)
                html = html.replace(/€250 Edeka/g, '500 zł Biedronka');
                html = html.replace(/BlueReen - Win a 250€ Edeka Voucher/g, 'Win a 500 zł Biedronka Gift Card');
                html = html.replace(/Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!/g, 'GlobalDataLeads - Win 500 zł Biedronka Gift Card');
                
                // Image
                html = html.replace(/\\/assets\\/img\\/1\\.webp/g, '/assets/img/biedronka_gift_card.jpg');
                
                // Action link
                html = html.replace(/href="[^"]*app\\.hawktrk\\.com\\/click\\?pid=2&amp;offer_id=19137[^"]*"/g, 'href="https://app.hawktrk.com/click?pid=2&amp;offer_id=99999&amp;sub2=u989&amp;sub5=s1SUBID1HERE"');
            }
            
            // If we are on the Poland page, CLEAR the other offers and just show Poland`
);

fs.writeFileSync('server.ts', serverCode);
console.log('patched');

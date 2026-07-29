const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const polandHtml = `
<article class="offer-card" data-category="grocery-vouchers" data-country="poland" data-search="globaldataleads win 500 zt biedronka gift card poland shopping &amp; food">
  <div class="offer-visual">
    <img alt="Win 500 zt Biedronka Gift Card" height="520" loading="lazy" src="/assets/img/10.webp" width="800"/>
    <span class="country-badge">🇵🇱 Poland</span>
  </div>
  <div class="offer-content">
    <div class="offer-label">Shopping &amp; food</div>
    <h3>500 zł Biedronka</h3>
    <p>GlobalDataLeads - Win 500 zł Biedronka Gift Card</p>
    <div class="offer-actions">
      <a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=99999&amp;sub2=u989&amp;sub5=s1SUBID1HERE">Go to offer <span>↗</span></a>
      <a class="button button-ghost" href="#">View details <span>→</span></a>
    </div>
  </div>
</article>
`;

const germanyHtml = `
<article class="offer-card" data-category="grocery-vouchers" data-country="germany" data-search="bluereen - win a 250€ edeka voucher sichern sie sich die chance auf einen edeka-gutschein im wert von €250! germany shopping &amp; food">
  <div class="offer-visual">
    <img alt="BlueReen - Win a 250€ Edeka Voucher" height="520" loading="lazy" src="/assets/img/1.webp" width="800"/>
    <span class="country-badge">🇩🇪 Germany</span>
  </div>
  <div class="offer-content">
    <div class="offer-label">Shopping &amp; food</div>
    <h3>€250 Edeka</h3>
    <p>Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!</p>
    <div class="offer-actions">
      <a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=19137&amp;sub2=u989&amp;sub5=s1SUBID1HERE">Go to offer <span>↗</span></a>
      <a class="button button-ghost" href="/offers/bluereen-win-a-250euro-edeka-voucher/">View details <span>→</span></a>
    </div>
  </div>
</article>
`;

serverCode = serverCode.replace(
    /if \(originalUrl === '\/' \|\| originalUrl === '\/index\.html'\) \{\s*html = html\.replace\('<div class="offer-grid">', '<div class="offer-grid">' \+ polandHtml\);\s*\}/,
    `if (originalUrl === '/' || originalUrl === '/index.html') {
                html = html.replace('<div class="offer-grid">', '<div class="offer-grid">' + \`${polandHtml}\` + \`${germanyHtml}\`);
            }`
);

fs.writeFileSync('server.ts', serverCode);
console.log('Done');

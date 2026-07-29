const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(
    /\/\/ Replace Sidebar Action Card exactly[\s\S]*?\/\/ Replace Main Article text/m,
    `// Replace Sidebar Action Card
                html = html.replace(/<aside class="detail-sidebar">[\\s\\S]*?<\\/aside>/, '<aside class="detail-sidebar"><div class="action-card"><img alt="Win a 500 zł Biedronka Gift Card" src="/assets/img/biedronka_gift_card.jpg"/><h2>500 zł Biedronka</h2><p>GlobalDataLeads - Win 500 zł Biedronka Gift Card</p><a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=99999&amp;sub2=u989&amp;sub5=s1SUBID1HERE">Go to offer <span>↗</span></a><p class="fine-print">You will leave RewardSpot and continue to the advertiser. Current terms and eligibility apply.</p></div></aside>');
                
                // Replace Main Article text`
);

fs.writeFileSync('server.ts', serverCode);
console.log('Fixed');

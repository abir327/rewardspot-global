const fs = require('fs');

const serverCode = `import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve our generated Biedronka image
app.get('/assets/img/biedronka_gift_card.jpg', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/assets/images/biedronka_gift_card_1784893609769.jpg'));
});

const styleToInject = \`<style>
  /* Base button shape */
  .button, .button-primary, .button-ghost, .button-dark, .button-sm, .action-card .button {
    border-radius: 0 !important;
  }
  
  @keyframes spin-neon {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Buttons with Rotating Neon Border */
  .button {
    position: relative !important;
    overflow: hidden !important;
    background: transparent !important;
    color: #fff !important;
    border: none !important;
    z-index: 1 !important;
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.4) !important;
    transition: box-shadow 0.3s ease !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  
  .button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    padding-bottom: 300%;
    background: conic-gradient(from 0deg, transparent 0%, transparent 75%, #00f2fe 90%, #ffffff 100%);
    animation: spin-neon 2s linear infinite;
    z-index: -2;
  }
  
  .button::after {
    content: '';
    position: absolute;
    inset: 2px;
    background: linear-gradient(135deg, #06b6d4, #0369a1);
    z-index: -1;
  }
  
  .button:hover {
    box-shadow: 0 0 25px rgba(0, 242, 254, 0.8) !important;
  }

  .button:hover::after {
    background: linear-gradient(135deg, #0891b2, #0284c7);
  }
  
  .button span {
    position: relative;
    z-index: 2;
  }
</style>
</head>\`;

const polandHtml = \`<article class="offer-card" data-category="grocery-vouchers" data-country="poland" data-search="globaldataleads win 500 zt biedronka gift card poland shopping &amp; food">
  <div class="offer-visual">
    <img alt="Win 500 zt Biedronka Gift Card" height="520" loading="lazy" src="/assets/img/biedronka_gift_card.jpg" width="800"/>
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
</article>\`;

const germanyHtml = \`<article class="offer-card" data-category="grocery-vouchers" data-country="germany" data-search="bluereen - win a 250€ edeka voucher sichern sie sich die chance auf einen edeka-gutschein im wert von €250! germany shopping &amp; food">
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
</article>\`;

app.get('*', async (req, res) => {
    try {
        let originalUrl = req.originalUrl;
        
        // If they click on Poland tab, we don't have it on the real site, so we just proxy US and we will replace the content below
        let url = 'https://rewardspot.live' + originalUrl;
        if (originalUrl === '/' || originalUrl === '/index.html' || originalUrl === '/countries/poland/') {
            url = 'https://rewardspot.live/countries/united-states/';
        }
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        });
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
            let html = await response.text();
            
            // Replace absolute URLs that point to rewardspot.live with our proxy
            html = html.replace(/https:\\/\\/rewardspot\\.live/g, '');
            
            html = html.replace('</head>', styleToInject);
            
            // Inject Poland to Header/Footer Navigation
            html = html.replace(
                /<a href="\\/countries\\/germany\\/">Germany<\\/a>/g,
                '<a href="/countries/poland/">Poland</a><a href="/countries/germany/">Germany</a>'
            );
            
            // If we are on the Poland page, CLEAR the other offers and just show Poland
            if (originalUrl === '/countries/poland/') {
                // Change H1 title and description
                html = html.replace(/<h1>.*?<\\/h1>/, '<h1>Reward offers in Poland</h1>');
                html = html.replace(/<p>Explore promotions intended for visitors in United States.*?<\\/p>/, '<p>Explore promotions intended for visitors in Poland. Additional advertiser requirements may apply.</p>');
                
                // Replace breadcrumbs
                html = html.replace(/<div class="container breadcrumbs">.*?<\\/div>/, '<div class="container breadcrumbs"><a href="/">Home</a> / Countries / Poland</div>');
                
                // Replace grid content
                html = html.replace(/<div class="offer-grid">[\\s\\S]*?<aside/i, '<div class="offer-grid">' + polandHtml + '</div></section><aside');
                html = html.replace(/<div class="offer-grid">[\\s\\S]*?<\\/main>/i, '<div class="offer-grid">' + polandHtml + '</div></div></section></main>');
            } 
            // If front page, ADD both at the top
            else if (originalUrl === '/' || originalUrl === '/index.html') {
                html = html.replace('<div class="offer-grid">', '<div class="offer-grid">' + polandHtml + germanyHtml);
            }
            // If Germany page, Edeka is already there natively! So we don't need to inject.
            
            // Fix target blanks
            html = html.replace(/<a(\\s+[^>]+)>/ig, (match, p1) => {
                if (p1.includes('http') && !p1.includes('target="_blank"')) {
                    return \`<a target="_blank"\${p1}>\`;
                }
                if (!p1.includes('http') && p1.includes('target="_blank"')) {
                    p1 = p1.replace(/target="_blank"\\s*/g, '');
                    return \`<a \${p1}>\`;
                }
                return match;
            });
            
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } else {
            res.redirect('https://rewardspot.live' + originalUrl);
        }
    } catch (e) {
        res.status(500).send(String(e));
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
});
`
fs.writeFileSync('server.ts', serverCode);
console.log('Done');

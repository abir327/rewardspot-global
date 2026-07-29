import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve our generated Biedronka image
app.get('/assets/img/biedronka_gift_card.jpg', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/assets/images/biedronka_exact_match_1784903754198.jpg'));
});

// Serve our custom professional favicon
app.get('/favicon.ico', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#FFBF2F"/><text x="50" y="72" font-size="65" fill="#05070A" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900">R</text></svg>');
});

const styleToInject = `<link rel="icon" href="/favicon.ico" type="image/svg+xml" />
<style>
  /* Offer actions layout fix for extra offers */
  .offer-actions {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
  }
  .offer-actions .button {
    width: 100% !important;
    padding-inline: 4px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    letter-spacing: normal !important;
    min-height: 44px !important;
  }
  .article-card .offer-actions {
    gap: 4px !important;
  }
  .article-card .offer-actions .button {
    padding-inline: 2px !important;
    font-size: 10.5px !important;
    letter-spacing: -0.2px !important;
    min-height: 36px !important;
    font-weight: normal !important;
  }

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
    white-space: nowrap !important;
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

  @keyframes spinNeonRing {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }

  .offer-card::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(90deg, #00ffff, #ff00ea, #0051ff, #00ffff, #ff00ea);
    background-size: 400% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.4), 0 0 20px rgba(0, 255, 255, 0.4);
    z-index: 101;
  }
  .offer-card {
    border: none !important;
    border-radius: 0 !important;
  }

  /* Unzoom and fit offer images perfectly */
  .offer-visual img, .action-card img {
    object-fit: contain !important;
    transform: none !important;
    background-color: #05070b !important;
  }
  .offer-card:hover .offer-visual img {
    transform: scale(1.01) !important;
  }
  
  /* God Level Cyan Glass Navigation Bar */
  .site-header {
    background: linear-gradient(135deg, rgba(6, 18, 25, 0.6) 0%, rgba(3, 10, 15, 0.8) 100%) !important;
    backdrop-filter: blur(28px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(28px) saturate(200%) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 999 !important;
  }
  
  /* God Level Page Hero */
  .page-hero {
    background: radial-gradient(circle at 50% -20%, rgba(0, 255, 255, 0.15) 0%, rgba(3, 10, 15, 1) 70%) !important;
    border-bottom: 1px solid rgba(0, 255, 255, 0.15) !important;
    position: relative;
    overflow: hidden;
  }
  .page-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.6), transparent);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }
  @keyframes rgb-text-gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  .page-hero h1 {
    background-image: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000) !important;
    background-size: 200% auto !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    animation: rgb-text-gradient 3s linear infinite !important;
    text-shadow: none !important;
  }
  .page-hero .eyebrow {
    color: #00ffff !important;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  .page-hero p {
    color: #a0aec0 !important;
  }
  
  .nav-wrap {
    height: 80px !important;
  }
  .brand {
    font-size: 24px !important;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  }
  .brand > span:last-child > span {
    color: #00ffff !important;
    text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
  }
  .brand-symbol i {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  .brand-symbol i:nth-child(1) {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
    background: #00ffff !important;
  }
  .brand-symbol i:nth-child(2) {
    box-shadow: 0 0 15px rgba(0, 150, 255, 0.8);
    background: #0096ff !important;
  }
  .brand-symbol i:nth-child(3) {
    box-shadow: 0 0 15px rgba(0, 255, 150, 0.8);
    background: #00ff96 !important;
  }
  .main-nav a {
    color: #b3e5fc !important;
    font-size: 14px !important;
    padding: 8px 16px !important;
    border-radius: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border: 1px solid transparent;
  }
  .main-nav a:hover {
    background: rgba(0, 255, 255, 0.08) !important;
    color: #ffffff !important;
    border: 1px solid rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  /* Desktop specific nav styles */
  @media (min-width: 900px) {
    .main-nav a.nav-cta {
      background: linear-gradient(135deg, #00d2ff, #3a7bd5) !important;
      color: #fff !important;
      font-weight: 800 !important;
      box-shadow: 0 0 25px rgba(0, 210, 255, 0.5) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .main-nav a.nav-cta:hover {
      box-shadow: 0 0 35px rgba(0, 210, 255, 0.8) !important;
      transform: translateY(-2px) scale(1.05);
      background: linear-gradient(135deg, #3a7bd5, #00d2ff) !important;
    }
  }

  /* Mobile Responsive adjustments */
  @media (max-width: 899px) {
    .nav-wrap {
      height: 70px !important;
    }
    .main-nav {
      background: linear-gradient(135deg, rgba(6, 18, 25, 0.95) 0%, rgba(3, 10, 15, 0.98) 100%) !important;
      backdrop-filter: blur(30px) !important;
      border: 1px solid rgba(0, 255, 255, 0.2) !important;
      border-radius: 24px !important;
      padding: 20px !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 255, 0.15) !important;
      top: 80px !important;
    }
    .main-nav a {
      font-size: 16px !important;
      padding: 12px 20px !important;
      border-radius: 12px !important;
      margin-bottom: 8px;
    }
    .main-nav a:last-child {
      margin-bottom: 0;
    }
    .main-nav a.nav-cta {
      background: linear-gradient(135deg, #00d2ff, #3a7bd5) !important;
      color: #fff !important;
      margin-top: 12px;
      text-align: center;
      font-weight: 800 !important;
      box-shadow: 0 0 25px rgba(0, 210, 255, 0.5) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
  }

  /* Super Premium Glowing Footer styles */
  .site-footer {
    position: relative;
    background: #05070a !important;
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
    padding: 80px 0 40px !important;
    overflow: hidden;
  }
  .footer-main, .footer-bottom {
    position: relative;
    z-index: 10;
  }
  
  /* Smart glassmorphism panels for columns */
  .footer-main > div {
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    backdrop-filter: none !important;
    box-shadow: none !important;
    transition: none !important;
  }
  .footer-main > div:hover {
    transform: none !important;
    box-shadow: none !important;
    border-color: transparent !important;
  }

  .footer-brand p {
    color: #9aa4b2 !important;
    font-size: 14px !important;
    line-height: 1.6;
    margin-top: 16px;
  }
  .footer-note {
    position: relative;
    border-left: 2px solid var(--gold) !important;
    background: transparent !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
    padding: 0 0 0 16px !important;
    border-radius: 0 !important;
    margin-top: 24px;
    color: #8b9bb4 !important;
    font-size: 12px !important;
    box-shadow: none !important;
  }
  .footer-note::before {
    content: none !important;
  }

  .site-footer h3 {
    color: #fff !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    text-transform: none !important;
    letter-spacing: normal !important;
    margin-bottom: 20px !important;
    position: relative;
    display: block;
  }
  .site-footer h3::after {
    display: none !important;
  }

  .site-footer div:not(.footer-brand) > a {
    color: #9aa4b2 !important;
    font-size: 14px !important;
    padding: 8px 0 !important;
    transition: color 0.2s ease !important;
    display: block !important;
  }
  .site-footer div:not(.footer-brand) > a::before {
    display: none !important;
  }
  .site-footer a:hover {
    color: #fff !important;
    transform: none !important;
    text-shadow: none !important;
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
    margin-top: 60px !important;
    padding-top: 24px !important;
    color: #64748b !important;
    font-size: 13px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  }
  
  @media (max-width: 899px) {
    .site-footer {
      padding: 70px 0 30px !important;
    }
    .footer-main {
      gap: 20px !important;
    }
    .footer-main > div {
      padding: 24px !important;
    }
    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }
  }
</style>
</head>`;

const polandHtml = `<article class="offer-card" data-category="grocery-vouchers" data-country="poland" data-search="globaldataleads win 500 zt biedronka gift card poland shopping &amp; food">
  <div class="offer-visual">
    <img alt="Win 500 zt Biedronka Gift Card" height="520" loading="lazy" src="/assets/img/biedronka_gift_card.jpg" width="800"/>
    <span class="country-badge">🇵🇱 Poland</span>
  </div>
  <div class="offer-content">
    <div class="offer-label">Shopping &amp; food</div>
    <h3>500 zł Biedronka</h3>
    <p>GlobalDataLeads - Win 500 zł Biedronka Gift Card</p>
    <div class="offer-actions">
      <a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=15613&amp;sub2=u809325&amp;sub5=Leads">Go to offer <span>↗</span></a>
      <a class="button button-ghost" href="/offers/biedronka-gift-card/">View details <span>→</span></a>
    </div>
  </div>
</article>`;

const germanyHtml = `<article class="offer-card" data-category="grocery-vouchers" data-country="germany" data-search="bluereen - win a 250€ edeka voucher sichern sie sich die chance auf einen edeka-gutschein im wert von €250! germany shopping &amp; food">
  <div class="offer-visual">
    <img alt="BlueReen - Win a 250€ Edeka Voucher" height="520" loading="lazy" src="/assets/img/1.webp" width="800"/>
    <span class="country-badge">🇩🇪 Germany</span>
  </div>
  <div class="offer-content">
    <div class="offer-label">Shopping &amp; food</div>
    <h3>€250 Edeka</h3>
    <p>Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!</p>
    <div class="offer-actions">
      <a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=19137&amp;sub2=u809325&amp;sub5=Lovewin">Go to offer <span>↗</span></a>
      <a class="button button-ghost" href="/offers/bluereen-win-a-250euro-edeka-voucher/">View details <span>→</span></a>
    </div>
  </div>
</article>`;

const amazonHtml = `<article class="offer-card" data-category="amazon-gift-cards-mystery-boxes" data-country="united-kingdom" data-search="amazon mystery box £100 enter your email for chance at amazon mystery box! united kingdom gift cards"><div class="offer-visual"><img alt="Amazon Mystery Box £100" height="520" loading="lazy" src="/assets/img/10.webp" width="800"/><span class="country-badge">🇬🇧 United Kingdom</span></div><div class="offer-content"><div class="offer-label">Gift cards</div><h3>£100 Amazon box</h3><p>Enter your Email for chance at Amazon Mystery Box!</p><div class="offer-actions"><a class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=19818&amp;sub2=u653724&amp;sub5=Amzbo">Go to offer <span>↗</span></a><button aria-controls="quick-amazon-mystery-box-pound100" aria-expanded="false" class="button button-ghost quick-toggle" type="button">Quick details <span>+</span></button></div></div><div class="quick-panel" hidden="" id="quick-amazon-mystery-box-pound100"><div class="quick-panel-inner"><div><strong>What to expect</strong><p>Explore a United Kingdom promotional opportunity featuring an Amazon Mystery Box valued at £100.</p></div><div><strong>Before you continue</strong><p>Make sure you are in United Kingdom, then read the advertiser’s current terms and required steps.</p></div><div class="quick-actions"><a class="text-link" href="/offers/amazon-mystery-box-pound100/">Full details <span>→</span></a><a class="button button-primary button-sm" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=19818&amp;sub2=u653724&amp;sub5=Amzbo">Go to offer <span>↗</span></a></div></div></div></article>`;

app.get('*', async (req, res) => {
    try {
        let originalUrl = req.originalUrl;
        
        let url = 'https://rewardspot.live' + originalUrl;
        if (originalUrl === '/' || originalUrl === '/index.html' || originalUrl === '/countries/poland/') {
            url = 'https://rewardspot.live/countries/united-states/';
        }
        else if (originalUrl === '/offers/biedronka-gift-card/') {
            url = 'https://rewardspot.live/offers/bluereen-win-a-250euro-edeka-voucher/';
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
            
            html = html.replace(/https:\/\/rewardspot\.live/g, '');
            html = html.replace('</head>', styleToInject);
            html = html.replace(/https:\/\/app\.hawktrk\.com\/click\?pid=2&(amp;)?offer_id=19137[^"]*/g, 'https://app.hawktrk.com/click?pid=2&amp;offer_id=19137&amp;sub2=u809325&amp;sub5=Lovewin');
            html = html.replace(
                /<a href="\/countries\/germany\/">Germany<\/a>/g,
                '<a href="/countries/poland/">Poland</a><a href="/countries/germany/">Germany</a>'
            );
            
            if (originalUrl === '/offers/biedronka-gift-card/') {
                // Precise replacements for the details page
                html = html.replace(/<title>.*?<\/title>/, '<title>500 zł Biedronka Offer Details | RewardSpot</title>');
                html = html.replace(/content="Discover a Germany-focused promotion featuring the chance to receive an Edeka voucher worth €250\./g, 'content="Discover a Poland-focused promotion featuring the chance to receive a Biedronka voucher worth 500 zł.');
                
                // Replace Breadcrumbs exactly
                html = html.replace(/<a href="\/offers\/">Offers<\/a> \/ €250 Edeka/, '<a href="/offers/">Offers</a> / 500 zł Biedronka');
                
                // Replace Hero text exactly
                html = html.replace(/<div class="eyebrow">🇩🇪 Germany/g, '<div class="eyebrow">🇵🇱 Poland');
                html = html.replace(/<h1>€250 Edeka<\/h1>/g, '<h1>500 zł Biedronka</h1>');
                html = html.replace(/<p>Sichern Sie sich die Chance auf einen Edeka-Gutschein im Wert von €250!<\/p>/g, '<p>GlobalDataLeads - Win 500 zł Biedronka Gift Card</p>');
                
                // Replace Fact Grid Country exactly
                html = html.replace(/<b>🇩🇪 Germany<\/b>/g, '<b>🇵🇱 Poland</b>');
                
                // Replace Main Article text
                html = html.replace(/<p>Discover a Germany-focused promotion featuring the chance to receive an Edeka voucher worth €250\.<\/p>/g, '<p>Discover a Poland-focused promotion featuring the chance to receive a Biedronka voucher worth 500 zł.</p>');
                
                // Sidebar fix (using regex that ignores intermediate content like classes/text)
                html = html.replace(/<aside class="detail-sidebar">[\s\S]*?<\/aside>/i, 
                    '<aside class="detail-sidebar"><div class="action-card"><img alt="Win a 500 zł Biedronka Gift Card" src="/assets/img/biedronka_gift_card.jpg"/><h2>500 zł Biedronka</h2><p>GlobalDataLeads - Win 500 zł Biedronka Gift Card</p><a target="_blank" class="button button-primary" href="https://app.hawktrk.com/click?pid=2&amp;offer_id=15613&amp;sub2=u809325&amp;sub5=Leads">Go to offer <span>↗</span></a><p class="fine-print">You will leave RewardSpot and continue to the advertiser. Current terms and eligibility apply.</p></div></aside>'
                );
            }
            else if (originalUrl === '/countries/poland/') {
                html = html.replace(/<h1>.*?<\/h1>/, '<h1>Reward offers in Poland</h1>');
                html = html.replace(/<p>Explore promotions intended for visitors in United States.*?<\/p>/, '<p>Explore promotions intended for visitors in Poland. Additional advertiser requirements may apply.</p>');
                html = html.replace(/<div class="container breadcrumbs">.*?<\/div>/, '<div class="container breadcrumbs"><a href="/">Home</a> / Countries / Poland</div>');
                html = html.replace(/<div class="offer-grid">[\s\S]*?<aside/i, '<div class="offer-grid">' + polandHtml + '</div></section><aside');
                html = html.replace(/<div class="offer-grid">[\s\S]*?<\/main>/i, '<div class="offer-grid">' + polandHtml + '</div></div></section></main>');
            } 
            else if (originalUrl === '/' || originalUrl === '/index.html') {
                html = html.replace(/<title>.*?<\/title>/, '<title>RewardSpot | Premium Gift Cards & Exclusive Giveaways</title>');
                html = html.replace(/<meta content=".*?visitors in United States.*?" name="description"\/>/, '<meta content="Browse top gift card, cash reward and giveaway offers currently listed for visitors worldwide." name="description"/>');
                html = html.replace(/<meta content=".*?visitors in United States.*?" property="og:description"\/>/, '<meta content="Browse top gift card, cash reward and giveaway offers currently listed for visitors worldwide." property="og:description"/>');
                html = html.replace(/<meta content="Reward Offers in United States.*?" property="og:title"\/>/, '<meta content="RewardSpot | Premium Gift Cards & Exclusive Giveaways" property="og:title"/>');
                html = html.replace(/<div class="eyebrow">.*?<\/div>/, '<div class="eyebrow">Global Reward Platform</div>');
                html = html.replace(/<h1>.*?<\/h1>/, '<h1>Exclusive Offers Worldwide</h1>');
                html = html.replace(/<p>Explore promotions intended for visitors in United States.*?<\/p>/, '<p>Explore top promotions and gift card opportunities across the globe. Select your country or browse all worldwide offers below.</p>');
                html = html.replace(/<div class="container breadcrumbs">.*?<\/div>/, '<div class="container breadcrumbs"><a href="/">Home</a> / Global Offers</div>');
                
                html = html.replace('<div class="offer-grid">', '<div class="offer-grid">' + amazonHtml + polandHtml + germanyHtml);
            }
            
            html = html.replace(/<a(\s+[^>]+)>/ig, (match, p1) => {
                if (p1.includes('http') && !p1.includes('target="_blank"')) {
                    return `<a target="_blank"${p1}>`;
                }
                if (!p1.includes('http') && p1.includes('target="_blank"')) {
                    p1 = p1.replace(/target="_blank"\s*/g, '');
                    return `<a ${p1}>`;
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

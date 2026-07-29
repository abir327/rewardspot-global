const fs = require('fs');
const https = require('https');

https.get('https://rewardspot.live/countries/united-states/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Replace relative paths
    data = data.replace(/src="\/assets\//g, 'src="https://rewardspot.live/assets/');
    data = data.replace(/href="\/assets\//g, 'href="https://rewardspot.live/assets/');
    data = data.replace(/href="\//g, 'href="https://rewardspot.live/');

    // Inject styles
    const styleToInject = `
<style>
  /* Base button shape */
  .button, .button-primary, .button-ghost, .button-dark, .button-sm {
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
  
  /* Make sure span icon also has z-index if needed */
  .button span {
    position: relative;
    z-index: 2;
  }
</style>
</head>
`;
    data = data.replace('</head>', styleToInject);

    // Fix links correctly to have target="_blank"
    data = data.replace(/<a(\s+[^>]+)>/ig, (match, p1) => {
        if (!p1.includes('target="_blank"')) {
            return `<a target="_blank"${p1}>`;
        }
        return match;
    });

    fs.writeFileSync('index.html', data);
    console.log('Fixed everything');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

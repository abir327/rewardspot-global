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
  .button, .button-primary, .button-ghost, .button-dark, .button-sm {
    border-radius: 0 !important;
  }
  .button-primary {
    background: linear-gradient(135deg, #00f2fe, #4facfe) !important;
    box-shadow: 0 15px 36px rgba(0, 242, 254, 0.3) !important;
    color: #fff !important;
  }
  .button-primary:hover {
    box-shadow: 0 18px 42px rgba(0, 242, 254, 0.5) !important;
    background: linear-gradient(135deg, #4facfe, #00f2fe) !important;
  }
</style>
</head>
`;
    data = data.replace('</head>', styleToInject);

    // Fix links correctly to have target="_blank"
    // Match <a ...> strictly by ensuring space after 'a'
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

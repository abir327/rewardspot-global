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
    
    // Write to index.html
    fs.writeFileSync('index.html', data);
    console.log('Successfully wrote to index.html');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

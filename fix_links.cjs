const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// replace <a with <a target="_blank"
// but only if it has an href that points somewhere else (starts with http)
html = html.replace(/<a([^>]+)href="https:\/\//g, '<a target="_blank"$1href="https:\/\/');

fs.writeFileSync('index.html', html);
console.log('Fixed links');

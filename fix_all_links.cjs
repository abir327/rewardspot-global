const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace all <a ...> with <a target="_blank" ...> if it doesn't already have target="_blank"
html = html.replace(/<a([^>]+)>/g, (match, p1) => {
    if (!p1.includes('target="_blank"')) {
        return `<a target="_blank"${p1}>`;
    }
    return match;
});

fs.writeFileSync('index.html', html);
console.log('Fixed all links');

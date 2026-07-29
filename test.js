const fs = require('fs');
let html = fs.readFileSync('dist/server.cjs', 'utf-8');
let amazonBoxHtml = '';
html.replace(/<article class="offer-card"[^>]*amazon mystery box £100[^>]*>[\s\S]*?<\/article>/i, (match) => {
    amazonBoxHtml = match;
    return '';
});
console.log(amazonBoxHtml.substring(0, 50));

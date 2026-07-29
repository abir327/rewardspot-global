const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

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

if (!html.includes('.button-primary { background: linear-gradient')) {
    html = html.replace('</head>', styleToInject);
    fs.writeFileSync('index.html', html);
    console.log('Styles injected successfully!');
} else {
    console.log('Styles already injected or not found.');
}

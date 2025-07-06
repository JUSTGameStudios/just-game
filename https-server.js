const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Generate self-signed certificate if it doesn't exist
if (!fs.existsSync('cert.pem') || !fs.existsSync('key.pem')) {
  console.log('Generating self-signed certificate...');
  execSync('openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"');
}

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  
  const extname = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.svg': 'image/svg+xml'
  };
  
  const contentType = contentTypes[extname] || 'text/plain';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = 8443;
server.listen(PORT, () => {
  console.log(`HTTPS Server running at https://localhost:${PORT}`);
  console.log('\nFor Firefox PWA support:');
  console.log('1. Visit https://localhost:8443 in Firefox');
  console.log('2. Accept the security warning (self-signed certificate)');
  console.log('3. The PWA install prompt should appear');
  console.log('\nNote: Self-signed certificates may still not work for PWA install on some Firefox versions.');
  console.log('For production, use a real domain with valid HTTPS certificate.');
});
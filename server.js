const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/manifest.json') {
        fs.readFile(path.join(__dirname, 'manifest.json'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading manifest.json');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.url === '/sw.js') {
        fs.readFile(path.join(__dirname, 'sw.js'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading sw.js');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Just game server running at http://localhost:${PORT}`);
    console.log(`Open this URL in your browser to play the game`);
});
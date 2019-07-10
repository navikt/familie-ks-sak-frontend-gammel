const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 8000;
const delayMs = 20;
const app = express();

function lesMockFil(filnavn) {
    try {
        return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
    } catch (err) {
        throw err;
    }
}

app.use('/assets', express.static(path.join(__dirname, '..', 'development')));

app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fs.readFileSync(path.join(__dirname, '/../development/index.html')));
    res.end();
});

const server = app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== ci-server startet på http://localhost:%s/', port);
});

process.on('SIGTERM', function() {
    server.close();
});
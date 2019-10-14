const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 20;
const app = express();

const lesMockFil = filnavn => {
    try {
        return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
    } catch (err) {
        throw err;
    }
};

app.get('/familie-ks-sak/api/fagsak/1', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak.json`)), delayMs);
});

module.exports = app;

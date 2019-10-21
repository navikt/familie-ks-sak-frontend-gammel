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
    setTimeout(() => res.send(lesMockFil(`fagsak-innvilget.json`)), delayMs);
});

app.get('/familie-ks-sak/api/fagsak/2', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-avslått.json`)), delayMs);
});

app.get('/familie-ks-sak/api/fagsak/3', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-ikketilgang.json`)), delayMs);
});

app.get('/familie-ks-sak/api/fagsak/4', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-feilet.json`)), delayMs);
});

app.get('/user/profile', (req, res) => {
    res.send({
        displayName: 'Test Testersen',
    });
});

module.exports = app;

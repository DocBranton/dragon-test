'use strict';
const http = require('node:http');
const port = Number(process.env.DATABRICKS_APP_PORT || process.env.PORT || 8000);
const host = '0.0.0.0';
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  if (req.url !== '/') {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WDP DRAGON Hello World</title></head><body style="font-family:system-ui,sans-serif;max-width:42rem;margin:5rem auto;padding:1rem"><h1>Hello World</h1><p>Node.js application running successfully.</p><p>WDP / DRAGON deployment validation</p></body></html>');
});
if (require.main === module) server.listen(port, host, () => console.log(`Hello World listening on ${host}:${port}`));
module.exports = server;

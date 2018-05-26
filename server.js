const http = require('http');
const path = require('path');
const Express = require('express');

const app = new Express();

const dist = path.resolve(__dirname, 'dist');
app.use(Express.static(dist));
app.use('/*', (req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
});

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT);

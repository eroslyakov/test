const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

// Point static path to dist
app.use('/', express.static(path.resolve(__dirname, '../dist')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

const routes = require('./routes');

app.use('/', routes);

// Get port from environment or set default and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port on all network interfaces
server.listen(port, () => console.log(`Server is running on port ${port}`));

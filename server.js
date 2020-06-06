// const express = require('express');

// const app = express();

// app.use(express.static('./dist/votechainxui'));
// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/votechainxui/'}),
// );
// app.listen(process.env.PORT || 8080);


const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/votechainxui')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/votechainxui/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));

const express = require('express');

const app = express();

app.use(express.static('./dist/votechainxui'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/votechainxui/'}),
);

app.listen(process.env.PORT || 8080);

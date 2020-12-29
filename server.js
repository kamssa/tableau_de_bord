const express = require('express');

const app = express();

app.use(express.static('./dist/infpa'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/infpa/'}),
);

app.listen(process.env.PORT || 8080);

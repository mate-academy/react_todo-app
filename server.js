const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({
    hello: 'world',
    x: 8,
  });
});

app.use(express.static('build'));

app.listen(300);

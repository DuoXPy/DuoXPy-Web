const express = require('express');
const cors = require('cors');
const { getHtml, getLinkHtml } = require('./utils/htmlTemplates');

const app = express();
app.use(cors());

// Production configuration
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use((req, res, next) => {
    if (!req.secure && req.get('X-Forwarded-Proto') !== 'https') {
      return res.redirect('https://' + req.get('Host') + req.url);
    }
    next();
  });
}

app.get('/get-link', (req, res) => {
  const link = req.query.link;
  res.send(getLinkHtml(link));
});

app.get('/get-url', (req, res) => {
  const demoKey = req.query.demo_key;
  res.send(getHtml(demoKey));
});

module.exports = app;

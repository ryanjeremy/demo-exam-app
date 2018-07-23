const api = require('./api');
const config = require('./config/config');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/api/:resource/:action')
  .get(api)
  .post(api);

app.listen(config.PORT, () => console.log(`Listening on ${config.PORT}.`));

const express = require('express');
const path = require('path');
const methodOverride = require('method-override')

function setupApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(methodOverride('_method'));
  app.set("views", path.join(__dirname, "views"))
  app.set("view engine", "ejs"); 
  return app;
}

module.exports = setupApp;
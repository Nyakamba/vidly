const helmet = require("helmet");
const compressiom = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compressiom());
};

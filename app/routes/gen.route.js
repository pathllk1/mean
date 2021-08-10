const controller = require("../controllers/gen.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post("/.netlify/functions/api/gen/client_log", controller.client_log);
}
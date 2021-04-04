const { authJwt } = require("../middlewares");
const controller = require("../controllers/purc.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/.netlify/functions/api/purc/list", [authJwt.verifyToken], controller.list);
    app.post("/.netlify/functions/api/purc/list_reg", [authJwt.verifyToken], controller.list_reg);
    app.post("/.netlify/functions/api/purc/get_item", [authJwt.verifyToken], controller.get_item);
    app.post("/.netlify/functions/api/purc/get_item_by_name", [authJwt.verifyToken], controller.get_item_by_name);
    app.post("/.netlify/functions/api/purc/save", [authJwt.verifyToken], controller.save);
}
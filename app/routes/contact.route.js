const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/contact", [authJwt.verifyToken], controller.add);
    app.post("/api/contact/list", [authJwt.verifyToken], controller.list);
    app.post("/api/contact/getcontact", [authJwt.verifyToken], controller.getcontact);
    app.post("/api/contact/updcontact", [authJwt.verifyToken], controller.update);
    app.post("/api/contact/delcontact", [authJwt.verifyToken], controller.delcontact);
}
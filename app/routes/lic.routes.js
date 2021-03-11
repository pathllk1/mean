const { authJwt } = require("../middlewares");
const controller = require("../controllers/lic.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/lic", [authJwt.verifyToken], controller.add);
    app.post("/api/lic/list", [authJwt.verifyToken], controller.list);
    app.post("/api/lic/getlic", [authJwt.verifyToken], controller.getlic);
    app.post("/api/lic/updlic", [authJwt.verifyToken], controller.update);
    app.post("/api/lic/dellic", [authJwt.verifyToken], controller.dellic);
    app.post("/api/lic/chkmail", [authJwt.verifyToken], controller.chkmail);
    app.post("/api/lic/chkbck", [authJwt.verifyToken], controller.chk_bck);
    app.post("/api/lic/crtbck", [authJwt.verifyToken], controller.crtbck);
}
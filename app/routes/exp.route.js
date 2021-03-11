const { authJwt } = require("../middlewares");
const controller = require("../controllers/exp.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/exp/list", [authJwt.verifyToken], controller.list);

    app.post("/api/exp/cash_book", [authJwt.verifyToken], controller.cash_book);

    app.post("/api/exp/proj_report", [authJwt.verifyToken], controller.proj_report);

    app.get("/api/exp/edit/:id", [authJwt.verifyToken], controller.getid);

    app.post("/api/exp", [authJwt.verifyToken], controller.add);
    app.post("/api/exp/trf", [authJwt.verifyToken], controller.add_trf);

    app.post("/api/exp/edit/:id", [authJwt.verifyToken], controller.update);

    app.get("/api/exp/del/:id", [authJwt.verifyToken], controller.del);

    app.post("/api/exp/fetch_all", [authJwt.verifyToken], controller.fetch_all);
    app.post("/api/exp/fetch_pto_head", [authJwt.verifyToken], controller.fetch_pto_head);
    app.post("/api/exp/fetch_dt_pto", [authJwt.verifyToken], controller.fetch_dt_pto);
    app.post("/api/exp/fetch_dt_head", [authJwt.verifyToken], controller.fetch_dt_head);
    app.post("/api/exp/fetch_pto", [authJwt.verifyToken], controller.fetch_pto);
    app.post("/api/exp/fetch_head", [authJwt.verifyToken], controller.fetch_head);
    app.post("/api/exp/fetch_dt", [authJwt.verifyToken], controller.fetch_dt);
    app.post("/api/exp/get_head_grp", [authJwt.verifyToken], controller.get_head_grp);
}

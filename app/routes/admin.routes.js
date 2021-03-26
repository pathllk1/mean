const { authJwt } = require("../middlewares");
const admin_controller = require("../controllers/admin.controller");

module.exports = function(app) {
    app.get(
        "/api/admin/get_all_exp",
        [authJwt.verifyToken, authJwt.isAdmin],
        admin_controller.list
      );

      app.get("/.netlify/functions/api/admin/get_all_user",  admin_controller.user_list);
      app.get("/api/admin/get_all_lic", [authJwt.verifyToken, authJwt.isAdmin], admin_controller.list_lic);
      app.get("/api/admin/get_all_contact", [authJwt.verifyToken, authJwt.isAdmin], admin_controller.list_contact);
      app.get("/api/admin/del_all", [authJwt.verifyToken, authJwt.isAdmin], admin_controller.del_all);
      app.post("/api/admin/add_exp", [authJwt.verifyToken, authJwt.isAdmin], admin_controller.add_exp);
      app.get("/api/admin/crt_excel", [authJwt.verifyToken, authJwt.isAdmin], admin_controller.crt_excel);
}
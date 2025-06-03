const express = require("express");
const router = express.Router();
const {
  registerTask,
  getAllTask,
  updateTask,
  getATask,
  deleteTask,
} = require("../../controller/TaskController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verfiyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(getAllTask)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    registerTask
  )
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateTask)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteTask);

router.route("/:id").get(getATask);

module.exports = router;

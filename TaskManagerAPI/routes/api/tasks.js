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

router
  .route("/")
  .get(getAllTask)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), registerTask);

router
  .route("/:id")
  .get(getATask)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateTask)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
} = require("../../controller/employeeController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verfiyRoles");

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), registerEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route("/:id").get(getAnEmployee);

module.exports = router;

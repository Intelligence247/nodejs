const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
} = require("../../controller/employeeController");

const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(verifyJWT, getAllEmployees)
  .post(registerEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getAnEmployee);

module.exports = router;

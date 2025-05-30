const Employee = require("../model/Employees");

// GET all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST register employee
const registerEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First name and Last name are required." });
  }

  try {
    const lastEmployee = await Employee.findOne().sort({ id: -1 });
    const newId = lastEmployee ? lastEmployee.id + 1 : 1;

    const newEmployee = await Employee.create({
      id: newId,
      firstname,
      lastname,
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update employee
const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required." });

  try {
    const employee = await Employee.findOne({ id });
    if (!employee)
      return res.status(404).json({ message: `Employee ID ${id} not found.` });

    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE employee
const deleteEmployee = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required." });

  try {
    const employee = await Employee.findOne({ id });
    if (!employee)
      return res.status(404).json({ message: `Employee ID ${id} not found.` });

    await employee.deleteOne();
    res.json({ message: `Employee ID ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one employee
const getAnEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ id: parseInt(id) });
    if (!employee)
      return res.status(404).json({ message: `Employee ID ${id} not found.` });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
};

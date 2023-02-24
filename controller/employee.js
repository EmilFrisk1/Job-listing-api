const {
  getEmployees,
  deleteEmployee,
  createEmployee,
  editEmployee,
} = require("../database");

async function getEmployeesCntrl(req, res) {
  try {
    const employees = await getEmployees();
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(400).json({ message: "no employees found" });
    }
  } catch (error) {
    console.log("error getting employees: " + error);
    res.status(400).json({ message: error });
  }
}

async function deleteEmployeeCntrl(req, res) {
  try {
    await deleteEmployee(req.body.user_id);
    res.status(200).json({ message: "employee deleted" });
  } catch (error) {
    console.log("error deleting employee: " + error);
    res.status(400).json({ message: error });
  }
}

async function createEmployeeCntrl(req, res) {
  try {
    await createEmployee(req.body);
    res.status(200).json({ message: "employee created" });
  } catch (error) {
    console.log("error creating employee: " + error);
    res.status(400).json({ message: error });
  }
}

async function editEmployeeCntrl(req, res) {
  try {
    await editEmployee(req.body, req.body.user_id);
    res.status(200).json({ message: "employee edited" });
  } catch (error) {
    console.log("error editing employee: " + error);
    res.status(400).json({ message: error });
  }
}

module.exports = {
  getEmployeesCntrl,
  deleteEmployeeCntrl,
  createEmployeeCntrl,
  editEmployeeCntrl,
};

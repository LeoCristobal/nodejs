const data = {
    employees: require('../model/employees.json'),
}

class EmployeeController {
    //get all the employee
    getAllEmployees = (req, res) => {
        res.json(data.employees);
    }

    // create employee
    createEmployee = (req, res) => {
        if (!req.body.firstname || !req.body.lastname) {
            res.status(400).json({ message: "First and Last name is required" })
        }

        const newEmployee = {
            id: data.employees.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }

        data.employees.push(newEmployee);
        res.status(201).json(data.employees);
    }

    // update employee
    updateEmployee = (req, res) => {
        const employee = data.employees.find(
            emp => emp.id === parseInt(req.body.id)
        );

        if (!employee) {
            res.status(404).json({ message: "USER NOT FOUND" });
        }

        employee.firstname = req.body.firstname ?? employee.firstname;
        employee.lastname = req.body.lastname ?? employee.lastname;

        res.json(employee)
    }


    // delete employee
    deleteEmployee = (req, res) => {
        const employee = data.employees.find(
            emp => emp.id === parseInt(req.body.id)
        );

        if (!employee) {
            res.status(404).json({ message: "USER NOT FOUND" });
        }

        data.employees = data.employees.filter(
            emp => emp.id !== parseInt(req.body.id)
        );

        res.json(data.employees);
    }


    // get employee by id
    getEmployeeById = (req, res) => {
        const employee = data.employees.find(
            emp => emp.id === parseInt(req.params.id)
        );

        if (!employee) {
            res.status(404).json({ message: "USER NOT FOUND" });
        }

        res.json(employee);
    }
}

module.exports = new EmployeeController();
const Employee = require('../models/Employee');
const User = require('../models/User');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, business_id, job_title } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'employee',
      business_id,
      temp_password: true,
    });

    const employee = await Employee.create({
      user_id: user.id,
      business_id,
      job_title
    });

    res.status(201).json({ message: 'Employee created', employee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: [
        {
          model: User,
          as: 'user', // Must match the alias used in model definition
          attributes: ['id', 'name', 'email', 'phone', 'role']
        }
      ] });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
   const employee = await Employee.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user', // Must match the alias used in model definition
          attributes: ['id', 'name', 'email', 'phone', 'role']
        }
      ]
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { job_title, shift_status, is_manager } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Not found' });

    await employee.update({ job_title, shift_status, is_manager });
    res.status(200).json({ message: 'Updated', employee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Not found' });

    await User.destroy({ where: { id: employee.user_id } }); // cascades to employee
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

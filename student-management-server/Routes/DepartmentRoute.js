const express = require('express');
const Department = require('../Models/DepartmentSchema');
const departmentRouter = express.Router();

//create new department
departmentRouter.post('/department', async (req, res) => {
  try {
    const { title, abbr } = req.body;
    const isDepartment = await Department.findOne({ title });
    if (isDepartment) {
      res.status(400);
      throw new Error('Department already exists');
    }
    const department = new Department({
      title,
      abbr,
    });
    const deps = await department.save();
    res.status(201).send({ message: 'New Department Created', deps });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Creating Department.',
      error: error.message,
    });
  }
});
//get Departments
departmentRouter.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find({});
    res.send(departments);
  } catch (error) {
    res.status(500).send({
      message: ' Error in getting Departments.',
      error: error.message,
    });
  }
});

//get a Department
departmentRouter.get('/:departmentId', async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (department) {
      res.send(department);
    } else {
      res.status(404).send({ message: 'Department not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Department.', error: error.message });
  }
});

// delete a department
departmentRouter.delete('/:departmentId', async (req, res) => {
  try {
    Department.findByIdAndRemove(req.params.departmentId).then((department) => {
      if (department) {
        return res
          .status(200)
          .json({ success: true, message: 'department deleted', department });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'department not found' });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: ' Error in deleting Department.',
        error: error.message,
      });
  }
});

//update student Department
departmentRouter.put('/:departmentId', async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.departmentId,
      {
        $set: req.body,
      },
      //return new updated data
      { new: true }
    );
    const newDepartment = await department.save();
    res
      .status(201)
      .send({ success: true, message: 'Department updated', newDepartment });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating Department.',
      error: error.message,
    });
  }
});

module.exports = departmentRouter;

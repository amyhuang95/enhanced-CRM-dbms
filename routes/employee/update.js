import express from 'express';

const router = express.Router();

// router to update an employee
router.put('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  res.render('employee/update', { title: 'Update Employee', employeeId });
});

export { router as updateEmployeeRouter };

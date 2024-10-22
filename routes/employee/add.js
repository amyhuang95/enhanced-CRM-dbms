import express from 'express';

const router = express.Router();

// router to add a new employee
router.get('/employee/add', (req, res) => {
  res.render('employee/add', { title: 'Employee' });
});

export { router as addEmployeeRouter };

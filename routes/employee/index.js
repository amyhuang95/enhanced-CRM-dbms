import express from 'express';

const router = express.Router();

router.get('/employee', (req, res) => {
  res.render('employee/index', { title: 'Employee' });
});

export { router as employeeRouter };

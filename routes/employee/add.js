import express from 'express';
import * as db from '../../db/index.js';

const router = express.Router();

/**
 * POST request to add an employee
 */
router.post('/addEmployee', async (req, res, next) => {
  const emp = req.body;

  try {
    const addEmp = await db.addEmployee(emp);

    console.log('Added', addEmp);
    res.redirect('/employees/?msg=Employee Added');
  } catch (err) {
    console.log('Error adding employee', err);
    next(err);
  }
});

export { router as addEmployeeRouter };

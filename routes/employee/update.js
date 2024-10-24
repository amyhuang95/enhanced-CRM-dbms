import express from 'express';
import * as db from '../../db/index.js';

const router = express.Router();

/**
 * POST to update an employee by id
 */
router.post('/employees/:employee_id/edit', async (req, res, next) => {
  const employee_id = req.params.employee_id;
  const emp = req.body;
  console.log(emp);

  try {
    const updateResult = await db.updateEmployeeById(employee_id, emp);
    console.log('update', updateResult);

    if (updateResult && updateResult.changes === 1) {
      res.redirect('/employees/?msg=Updated');
    } else {
      res.redirect('/employees/?msg=Error Updating');
    }
  } catch (err) {
    next(err);
  }
});

export { router as updateEmployeeRouter };

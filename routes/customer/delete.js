import express from 'express';
import * as db from '../../db/index.js';

const router = express.Router();

/**
 * GET request to delete an employee by id
 */
router.get('/employees/:employee_id/delete', async (req, res, next) => {
  const employee_id = req.params.employee_id;

  try {
    let deleteResult = await db.deleteEmployeeById(employee_id);
    console.log('delete', deleteResult);

    if (deleteResult && deleteResult.changes === 1) {
      res.redirect('/employees/?msg=Deleted');
    } else {
      res.redirect('/employees/?msg=Error Deleting');
    }
  } catch (err) {
    next(err);
  }
});

export { router as deleteEmployeeRouter };

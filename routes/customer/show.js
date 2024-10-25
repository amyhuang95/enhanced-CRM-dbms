import express from 'express';
import * as db from '../../db/index.js';

const router = express.Router();

/**
 * GET single employee based on employee id
 */
router.get('/employees/:employee_id/edit', async (req, res, next) => {
  const employee_id = req.params.employee_id;
  const msg = req.query.msg || null;
  try {
    let emp = await db.getEmployeeById(employee_id);
    let customers = await db.getCustomerByOwnerId(employee_id);

    console.log('employee ', {
      emp,
      customers,
      msg,
    });

    res.render('./pages/employee/edit', {
      emp,
      customers,
      msg,
    });
  } catch (err) {
    next(err);
  }
});

export { router as showEmployeeRouter };

import express from 'express';
import * as db from '../../db/index.js';

const router = express.Router();

/**
 * GET all employees page based on query
 */
router.get('/employees', async (req, res, next) => {
  const query = req.query.q || '';
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 12;
  const msg = req.query.msg || null;

  try {
    const total = await db.getEmployeeCount(query);
    const employees = await db.getEmployeeByName(query, page, pageSize);
    res.render('./pages/employee/index', {
      employees,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total / pageSize),
    });
  } catch (err) {
    next(err);
  }
});

export { router as employeeRouter };

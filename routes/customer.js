import express from 'express';
import * as db from '../db/index.js';

const router = express.Router();

/**
 * GET all customers based on query
 */
router.get('/customers', async (req, res, next) => {
  const query = req.query.q || '';
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 12;
  const msg = req.query.msg || null;

  try {
    const total = await db.getCustomerCount(query);
    const customers = await db.getCustomerByName(query, page, pageSize);
    res.render('./pages/customer/index', {
      customers,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total / pageSize),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET single customer based on employee id
 */
router.get('/customers/:customer_id/edit', async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const msg = req.query.msg || null;
  try {
    let customer = await db.getCustomerById(customer_id);
    // let customers = await db.getCustomerByOwnerId(employee_id); // get all opptys for this customer

    console.log('customer ', {
      customer,
      // opptys,
      msg,
    });

    res.render('./pages/customer/edit', {
      customer,
      // opptys,
      msg,
    });
  } catch (err) {
    next(err);
  }
});

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

export { router as customerRouter };

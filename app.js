import express from 'express';
import { homeRouter } from './routes/home.js';
import { employeeRouter } from './routes/employee/index.js';
import { addEmployeeRouter } from './routes/employee/add.js';
import { updateEmployeeRouter } from './routes/employee/update.js';

// Set up the express app
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Add static files
app.use(express.static('public'));

// Add routes
app.use(homeRouter);
app.use(employeeRouter);
app.use(addEmployeeRouter);
app.use(updateEmployeeRouter);

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

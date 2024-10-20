import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for logging
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

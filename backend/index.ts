import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import db from './util/dbConnection';
// Start config vars
import dotenv from 'dotenv';
dotenv.config();

// Start app
const app = express();

// Config app
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('*', (req, res, next) => {
  res.send('Ok!');
});

// Start server
const port = process.env.PORT || 8000;

db.then((res) => {
  console.log('DB Connected');
  app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
  });
}).catch((err) => {
  console.log(err);
});

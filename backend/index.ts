import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import helmet from 'helmet';
// import cors from 'cors';
import morgan from 'morgan';
// Import routes
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
// Start config vars
import dotenv from 'dotenv';
dotenv.config();

// DB Connection
import db from './util/dbConnection';

// Start app
const app = express();

// Config app
app.use(json());
app.use(helmet());
app.use(morgan('tiny'));
// app.use(cors());
// Fix cors
app.use((req, res, next) => {
  // Set domains
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Set the methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  //
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('*', (req, res, next) => {
  res.status(404).send('Not found!');
});
// Error Handling
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(500).json(err.toString());
  }
);

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

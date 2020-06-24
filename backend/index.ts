import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
// Start config vars
import dotenv from 'dotenv';
dotenv.config();

// DB Connection
import db from './util/dbConnection';

// Start app
const app = express();

// Config app
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Import routes
import authRoutes from './routes/auth';

// Routes
app.use('/api/v1', authRoutes);
app.use('*', (req, res, next) => {
  res.send('Ok!');
});
// Error Handling
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(err);
    return res.status(500).json(err);
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

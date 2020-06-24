import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const db = mongoose.connect(
  `mongodb+srv://${user}:${password}@node-complete-bftj6.gcp.mongodb.net/line?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

export default db;

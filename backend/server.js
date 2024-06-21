import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import accountRoutes from './routes/account.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToMongoDB();
});

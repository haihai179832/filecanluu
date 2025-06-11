import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { userRouter } from './routes/index.js';
import connectDB from './database/database.js';
import cookieParser from 'cookie-parser';
import checkToken from './authentication/auth.js';

connectDB();

// Đường dẫn hiện tại của file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Serve static file
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/html', express.static(path.join(__dirname, '../public/html'))); // <<< THÊM DÒNG NÀY

// Cấu hình view EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/auth', (req, res) => res.render('auth'));
app.use('/user', userRouter);
app.use('/home', (req, res) => res.render('home'));
app.use('/test', (req, res) => res.render('mbbank'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

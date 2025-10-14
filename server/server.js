import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();

connectCloudinary()

app.use(cors());
app.use(express.json());




// Apply Clerk middleware (all routes below need Clerk auth)
app.use(clerkMiddleware());

app.get('/protected', requireAuth, (req, res) => {
    res.json({
        message: "You are authenticated!",
        userId: req.auth.userId
    });
});
app.get('/', (req, res) => res.send('Server is Live!'));
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
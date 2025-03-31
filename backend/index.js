import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import companyRoute from "./src/routes/company.route.js"
import jobRoute from './src/routes/job.route.js'
import applicationRoute from './src/routes/applications.route.js'
import path from 'path';


dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin:'https://deploy-job-portal-3.onrender.com',
    credentials: true
}


app.use(cors(corsOptions));

app.use('/api/auth/user/', userRoute)
app.use('/api/auth/company/', companyRoute)
app.use('/api/auth/job/', jobRoute)
app.use('/api/auth/application/', applicationRoute)

app.use(express.static(path.join(_dirname, '/frontend/dist')));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})


app.listen(PORT, () => {
    connectDB();
    console.log(`server running at port ${PORT}`);
})
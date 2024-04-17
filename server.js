import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";




// Importing and configuring dotenv
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/users', usersRouter);

const PORT = process.env.PORT || 1119;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
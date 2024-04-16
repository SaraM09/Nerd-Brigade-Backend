import express from "express";
import cors from "cors";
// Importing and configuring dotenv
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1119;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
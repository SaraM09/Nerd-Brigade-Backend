import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import cartRouter from "./routes/cart.js";




// Importing and configuring dotenv
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

const PORT = process.env.PORT || 1119;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
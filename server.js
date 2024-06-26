import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import cartRouter from "./routes/cart.js";
import cartItemsRouter from "./routes/cartItems.js";
import bookingsRouter from "./routes/bookings.js";
import techiniciansRouter from "./routes/technicians.js";
import accessoriesRouter from "./routes/accessories.js";
import paymentsRouter from "./routes/payments.js";
import productsRouter from "./routes/products.js";
import Stripe from 'stripe';
import bodyParser from "body-parser";



// Importing and configuring dotenv
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());







// routes
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/cartItems', cartItemsRouter);
app.use('/bookings', bookingsRouter);
app.use('/technicians', techiniciansRouter);
app.use('/accessories', accessoriesRouter);
app.use('/payment',paymentsRouter);
app.use('/products',productsRouter);


const PORT = process.env.PORT || 1119;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
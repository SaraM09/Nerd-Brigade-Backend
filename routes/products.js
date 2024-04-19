import express from "express";
import axios from "axios";

const productsRouter = express.Router();


productsRouter.get("/", async (req, res) => {
    try {
        const apiUrl = 'https://fakestoreapi.com/products/category/electronics';
        const params = req.query;  

        const response = await axios.get(apiUrl, {
            params
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching electronics data:', error);
        res.status(500).json({ message: 'Failed to fetch electronics data' });
    }
});
    export default  productsRouter
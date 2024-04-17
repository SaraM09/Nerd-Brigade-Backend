import express from 'express';
import { getAllCarts, createCart, getCartByUserId, updateCart, deleteCart } from '../controllers/cart.js';

const router = express.Router();

router.get('/', getAllCarts);

router.post('/', createCart);

router.get('/:userId', getCartByUserId);

router.put('/:id', updateCart);

router.delete('/:id', deleteCart);



export default router
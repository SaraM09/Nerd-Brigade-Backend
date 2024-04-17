import express from "express";
import { getAllCartItems, createCartItem, getCartItemsByCartId, updateCartItem, deleteCartItem } from "../controllers/cartItems.js";

const router = express.Router();


router.get('/', getAllCartItems);

router.post('/', createCartItem);

router.get('/:cartId', getCartItemsByCartId);

router.put('/:id', updateCartItem);

router.delete('/:id', deleteCartItem);



export default router
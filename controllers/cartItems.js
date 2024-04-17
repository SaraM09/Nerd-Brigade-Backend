import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// desc Get all cart items
// route GET /cartItems

export const getAllCartItems = async (req, res) => {
    const cartItems = await prisma.cartItem.findMany();
    res.status(200).json({ status: 'success', data: cartItems });
}

// desc Get cart items by cart ID
// route GET /cartItems/cart/:cartId

export const getCartItemsByCartId = async (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cartId }
    });
    res.status(200).json({ status: 'success', data: cartItems });
}

// desc Create cart item
// route POST /cartItems

export const createCartItem = async (req, res) => {
    const { cartId, accessoryId, quantity } = req.body;

    try {
        // Validate cart existence
        const cart = await prisma.cart.findUnique({
            where: { id: cartId }
        });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Validate accessory existence
        const accessory = await prisma.accessory.findUnique({
            where: { id: accessoryId }
        });
        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
        }

        // Check if the requested quantity is available (assuming accessory has a 'stock' field)
        if (accessory.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock available' });
        }

        // Create the cart item
        const newCartItem = await prisma.cartItem.create({
            data: {
                cartId,
                accessoryId,
                quantity
            }
        });

        return res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Failed to create cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// desc Update cart item
// route PUT /cartItems/:id

export const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Ensure the quantity is a positive number
        if (quantity <= 0) {
            return res.status(400).json({ status: 'error', message: 'Quantity must be greater than zero.' });
        }

        const cartItem = await prisma.cartItem.update({
            where: { id: parseInt(id) },
            data: { quantity }
        });

        if (cartItem) {
            res.status(200).json({ status: 'success', data: cartItem });
        } else {
            // This block may actually never be reached because Prisma throws if the record is not found
            res.status(404).json({ status: 'error', message: 'CartItem not found.' });
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // Handle specific case for not found Prisma error
            return res.status(404).json({ status: 'error', message: 'CartItem not found.' });
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// desc Delete cart item
// route DELETE /cartItems/:id

export const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await prisma.cartItem.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ status: 'success', data: cartItem });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ status: 'error', message: 'CartItem not found.' });
        }
        console.error('Failed to delete cart item:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


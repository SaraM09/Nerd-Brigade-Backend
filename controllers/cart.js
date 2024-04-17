import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();

// desc Get all carts
// route GET /carts
export const getAllCarts = async (req, res) => {
    const carts = await prisma.cart.findMany({
        include: {
            items: {
                include: {
                    accessory: true
                }
            }
        }
    });
    res.status(200).json({ status: 'success', data: carts });
}

// desc Get cart by user ID
// route GET /carts/user/:userId
export const getCartByUserId = async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: parseInt(req.params.userId) },
            include: {
                items: {
                    include: {
                        accessory: true
                    }
                }
            }
        });
        if (cart) {
            res.status(200).json({ status: 'success', data: cart });
        } else {
            res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

// desc Create cart
// route POST /carts
export const createCart = async  (req, res) => {
    const { userId } = req.body;

    try {
        // Check if the user already has a cart
        const existingCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            }
        });

        if (existingCart) {
            return res.status(400).json({ message: 'User already has a cart' });
        }

        // Check if the user exists
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new cart
        const newCart = await prisma.cart.create({
            data: {
                userId: userId
            }
        });

        return res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// desc Update cart
// route PUT /carts/:id

export const updateCart = async (req, res) => {
    try {
        const cart = await prisma.cart.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
}
}



// desc Delete cart
// route DELETE /carts/:id

export const deleteCart = async (req, res) => {
    try {
        const cart = await prisma.cart.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).json(cart);
}
catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
}
}


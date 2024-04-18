import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient


// desc get all payments
// route  GET /payments

export const getAllPayments = async (req, res) => {
    const payments = await prisma.payment.findMany();
    res.status(200).json({ status: 'success', data: payments });
    
}

// desc get payment by id
// route  GET /payments/:id

export const getPaymentById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Validate the id to be a positive integer
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid ID supplied' });
    }

    try {
        const payment = await prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            return res.status(404).json({ status: 'error', message: 'Payment not found' });
        }
        res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
        console.error('Failed to retrieve payment:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// desc create payment
// route POST /payments

export const createPayment = async (req, res) => {
    const { userId, bookingId, cartId, cartItemId, amount, currency, paymentMethod, status } = req.body;

    try {
        // Optional check for cart existence
        if (cartId) {
            const cart = await prisma.cart.findUnique({
                where: { id: cartId }
            });
            if (!cart) {
                return res.status(404).json({ message: `Cart with ID ${cartId} not found` });
            }
        }

        // Proceed to create payment even if no cartId is provided
        const newPayment = await prisma.payment.create({
            data: {
                userId,
                bookingId,   // This can be null as well
                cartId,      // This can be null
                cartItemId,  // This can be null
                amount,
                currency,
                paymentMethod,
                status,
                confirm: true  // Assuming you still want to use this flag
            }
        });

        res.status(201).json({ status: 'success', data: newPayment });
    } catch (error) {
        console.error('Failed to create payment:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// desc update payment
// route PUT /payments/:id

export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { userId, bookingId, cartId, cartItemId, amount, currency, paymentMethod, status } = req.body;

    try {
        const updatedPayment = await prisma.payment.update({
            where: { id: parseInt(id) },
            data: {
                userId,
                bookingId,   // This can be null as well
                cartId,      // This can be null
                cartItemId,  // This can be null
                amount,
                currency,
                paymentMethod,
                status
            }
        });
        res.status(200).json({ status: 'success', data: updatedPayment });      
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}


// desc delete payment
// route DELETE /payments/:id

// desc delete payment
// route DELETE /payments/:id

export const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await prisma.payment.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
        if (error.code === 'P2025') {  
            res.status(404).json({ status: 'error', message: 'Payment not found' });
        } else {
            console.error('Failed to delete payment:', error);
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
};






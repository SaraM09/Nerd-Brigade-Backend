import express from 'express';
import { getAllPayments, createPayment, updatePayment , deletePayment, getPaymentById} from '../controllers/payment.js';

const router = express.Router();

router.get('/', getAllPayments);

router.post('/', createPayment);

router.put('/:id', updatePayment);

router.delete('/:id', deletePayment);

router.get('/:id', getPaymentById);



export default router
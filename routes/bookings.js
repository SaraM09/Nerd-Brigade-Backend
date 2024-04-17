import express from 'express';

import { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking } from '../controllers/bookings.js';

const router = express.Router();

router.get('/', getAllBookings);

router.post('/', createBooking);

router.get('/:id', getBookingById);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);


export default router
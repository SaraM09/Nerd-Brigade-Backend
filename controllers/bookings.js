import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// desc Get all bookings
// route GET /bookings

export const getAllBookings = async (req, res) => {
    const bookings = await prisma.booking.findMany();
    res.status(200).json({ status: 'success', data: bookings });
}

// desc create booking
// route POST /bookings

export const createBooking = async (req, res) => {
    const { userId, technicianId, serviceType, issueDescription, status, scheduledDate, costEstimate } = req.body;

    try {
        // Validate user existence
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optional: Validate technician existence if technicianId is provided
        if (technicianId) {
            const technicianExists = await prisma.technician.findUnique({
                where: { id: technicianId }
            });
            if (!technicianExists) {
                return res.status(404).json({ message: 'Technician not found' });
            }
        }

        // Create the booking
        const newBooking = await prisma.booking.create({
            data: {
                userId,
                technicianId,
                serviceType,
                issueDescription,
                status,
                scheduledDate: new Date(scheduledDate), // Ensure date is correctly formatted
                costEstimate
            }
        });

        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Failed to create booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// desc update booking
// route PUT /bookings/:id

export const updateBooking = async (req, res) => {
    const { id } = req.params; // Booking ID from URL parameter
    const { technicianId, serviceType, issueDescription, status, scheduledDate, costEstimate } = req.body;

    try {
        // Validate the existence of the booking
        const existingBooking = await prisma.booking.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Optional: Validate technician existence if technicianId is provided
        if (technicianId && technicianId !== existingBooking.technicianId) {
            const technicianExists = await prisma.technician.findUnique({
                where: { id: technicianId }
            });
            if (!technicianExists) {
                return res.status(404).json({ message: 'Technician not found' });
            }
        }

        // Update the booking
        const updatedBooking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: {
                technicianId: technicianId ?? existingBooking.technicianId,
                serviceType: serviceType ?? existingBooking.serviceType,
                issueDescription: issueDescription ?? existingBooking.issueDescription,
                status: status ?? existingBooking.status,
                scheduledDate: scheduledDate ? new Date(scheduledDate) : existingBooking.scheduledDate,
                costEstimate: costEstimate ?? existingBooking.costEstimate
            }
        });

        res.status(200).json({ status: 'success', data: updatedBooking });
    } catch (error) {
        console.error('Failed to update booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// desc get booking by id
// route GET /bookings/:id

export const getBookingById = async (req, res) => {
    const id = parseInt(req.params.id);
    const booking = await prisma.booking.findUnique({
        where: { id: id }
    });
    if (!booking) {
        return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }
    res.status(200).json({ status: 'success', data: booking });
};
// desc delete booking
// route DELETE /bookings/:id

export const deleteBooking = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const booking = await prisma.booking.delete({
            where: { id: id }
        });
        res.status(200).json({ status: 'success', data: booking });
    } catch (error) {
        if (error.code === 'P2025') { // Handle specific case for not found Prisma error
            return res.status(404).json({ status: 'error', message: 'Booking not found' });
        }
        console.error('Failed to delete booking:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
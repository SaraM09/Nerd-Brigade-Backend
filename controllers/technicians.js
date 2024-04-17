import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Get all technicians
// route GET /technicians
export const getAllTechnicians = async (req, res) => {
    const technicians = await prisma.technician.findMany();
    res.status(200).json({ status: 'success', data: technicians });
}

// Create a new technician
// route POST /technicians
export const createTechnician = async (req, res) => {
    const { name, contactInfo, specialization } = req.body;
    try {
        const newTechnician = await prisma.technician.create({
            data: { name, contactInfo, specialization }
        });
        res.status(201).json({ status: 'success', data: newTechnician });
    } catch (error) {
        console.error('Failed to create technician:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Update a technician
// route PUT /technicians/:id
export const updateTechnician = async (req, res) => {
    const { id } = req.params;
    const { name, contactInfo, specialization } = req.body;
    try {
        const updatedTechnician = await prisma.technician.update({
            where: { id: parseInt(id) },
            data: { name, contactInfo, specialization }
        });
        res.status(200).json({ status: 'success', data: updatedTechnician });
    } catch (error) {
        console.error('Failed to update technician:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Get technician by id
// route GET /technicians/:id
export const getTechnicianById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const technician = await prisma.technician.findUnique({ where: { id } });
        if (!technician) {
            return res.status(404).json({ message: 'Technician not found' });
        }
        res.status(200).json({ status: 'success', data: technician });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete technician
// route DELETE /technicians/:id
export const deleteTechnician = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedTechnician = await prisma.technician.delete({ where: { id } });
        res.status(200).json({ status: 'success', data: deletedTechnician });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Technician not found' });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

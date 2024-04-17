import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// desc Get all accessories
// route GET /accessories

export const getAllAccessories = async (req, res) => {
    const accessories = await prisma.accessory.findMany();
    res.status(200).json({ status: 'success', data: accessories });
}

// desc Get accessory by id
// route GET /accessories/:id

export const getAccessoryById = async (req, res) => {
    const id = parseInt(req.params.id);
    const accessory = await prisma.accessory.findUnique({ where: { id } });
    if (!accessory) {
        return res.status(404).json({ message: 'Accessory not found' });
    }
    res.status(200).json({ status: 'success', data: accessory });
}

// desc Create accessory
// route POST /accessories

export const createAccessory = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;

    try {
        // Create a new accessory in the database
        const newAccessory = await prisma.accessory.create({
            data: {
                name,
                description,
                price,
                stock,
                imageUrl  // This field is optional
            }
        });

        // Send a response with the newly created accessory
        res.status(201).json({
            status: 'success',
            data: newAccessory
        });
    } catch (error) {
        // Log the error and send an error response
        console.error('Failed to create accessory:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// desc Update accessory
// route PUT /accessories/:id

export const updateAccessory = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;

    try {
        const existingAccessory = await prisma.accessory.findUnique({ where: { id: parseInt(id) } });
        if (!existingAccessory) {
            return res.status(404).json({ status: 'error', message: 'Accessory not found' });
        }

        const updatedAccessory = await prisma.accessory.update({
            where: { id: parseInt(id) },
            data: { name, description, price, stock, imageUrl }
        });

        res.status(200).json({ status: 'success', data: updatedAccessory });
    } catch (error) {
        console.error('Failed to update accessory:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// desc Delete accessory
// route DELETE /accessories/:id

export const deleteAccessory = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const existingAccessory = await prisma.accessory.findUnique({ where: { id } });
        if (!existingAccessory) {
            return res.status(404).json({ status: 'error', message: 'Accessory not found' });
        }

        const deletedAccessory = await prisma.accessory.delete({ where: { id } });
        res.status(200).json({ status: 'success', data: deletedAccessory });
    } catch (error) {
        console.error('Failed to delete accessory:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

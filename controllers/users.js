import { PrismaClient} from "@prisma/client";
import { celebrate, Joi, Segments } from 'celebrate';
const prisma = new PrismaClient();


// desc Get all users
// route GET /users
export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}


// Validation schema
const userSchema = {
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().optional(),
        address: Joi.string().optional()
    })
};

// desc get user by id
// route GET /users/:id

export const getUserById = async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id:parseInt(req.params.id) },
            include: {
                bookings: true,
                cart: true
            }
        })
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

// desc create user
// route POST /users

export const createUser = [
    celebrate(userSchema),
    async (req, res) => {
        try {
            const { username, email, phone, address } = req.body;
            const user = await prisma.user.create({
                data: { username, email, phone, address }
            });
            res.status(201).json({ status: 'success', data: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
]

// desc update user
// route PUT /users/:id

export const updateUser = async (req, res) => {
    try{
        const {username, email, phone, address} = req.body;
        const user = await prisma.user.update({
            where: { id:parseInt(req.params.id) },
            data: {
                username,
                email,
                phone,
                address
            }
        })
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

// desc delete user
// route DELETE /users/:id

export const deleteUser = async (req, res) => {
    try{
        const user = await prisma.user.delete({
            where: { id:parseInt(req.params.id) }
        })
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}




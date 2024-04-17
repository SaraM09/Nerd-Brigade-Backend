import express from 'express';
import { getAllAccessories, getAccessoryById, createAccessory, updateAccessory, deleteAccessory } from '../controllers/accessories.js';

const router = express.Router();

router.get('/', getAllAccessories);

router.get('/:id', getAccessoryById);

router.post('/', createAccessory);

router.put('/:id', updateAccessory);

router.delete('/:id', deleteAccessory);

export default router
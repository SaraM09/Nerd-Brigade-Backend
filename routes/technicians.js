import express from 'express';
import { getAllTechnicians, createTechnician, updateTechnician, deleteTechnician, getTechnicianById } from '../controllers/technicians.js';

const router = express.Router();

router.get('/', getAllTechnicians);

router.post('/', createTechnician);

router.get('/:id', getTechnicianById);

router.put('/:id', updateTechnician);

router.delete('/:id', deleteTechnician);

export default router
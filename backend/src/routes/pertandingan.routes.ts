import express from 'express';

import * as pertandinganController from '../controllers/pertandingan/pertandingan.controllers';
import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const pertandinganRouter = express.Router();

pertandinganRouter.get('/get/story/kelompok/:id', verifyJWTToken, pertandinganController.getStoryFromKelompokByPertandingan);
pertandinganRouter.get('/get/kelompok/:id', verifyJWTToken, pertandinganController.getPertandinganRivalNew);
pertandinganRouter.get('/get/:id/kelompok/:id_kelompok', verifyJWTToken, pertandinganController.getPertandinganRival);
pertandinganRouter.get('/get/all', verifyJWTToken, pertandinganController.getAllPertandingan);
pertandinganRouter.get('/get/:id', verifyJWTToken, pertandinganController.getKelompokPertandingan);
pertandinganRouter.get('/get/kelas/:id_kelas', verifyJWTToken, pertandinganController.showPertandinganByKelas);
pertandinganRouter.post('/post', verifyJWTToken, pertandinganController.createPertandingan);
pertandinganRouter.delete('/delete', verifyJWTToken, pertandinganController.deletePertandingan);
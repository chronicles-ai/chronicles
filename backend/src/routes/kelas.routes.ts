import express from 'express';

import * as kelasController from '../controllers/kelas/kelas.controllers';
import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const kelasRouter = express.Router();

kelasRouter.get('/get', verifyJWTToken, kelasController.getAllKelas);
kelasRouter.get('/get/:nama_kelas', verifyJWTToken, kelasController.getKelasByNamaKelas);
kelasRouter.get('/get/kelompok/:id', verifyJWTToken, kelasController.getKelompokByKelas);
kelasRouter.post('/post', verifyJWTToken, kelasController.createKelas);
kelasRouter.delete('/delete', verifyJWTToken, kelasController.deleteKelas);
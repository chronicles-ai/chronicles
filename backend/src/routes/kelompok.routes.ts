import express from 'express';

import * as kelompokController from '../controllers/kelompok/kelompok.controllers';
import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const kelompokRouter = express.Router();

kelompokRouter.get('/get', verifyJWTToken, kelompokController.getAllKelompok);
kelompokRouter.get('/get/:id', verifyJWTToken, kelompokController.getKelompok);
kelompokRouter.get('/story/:id', verifyJWTToken, kelompokController.getStoryByKelompok);
kelompokRouter.get('/get/class/:id_kelas', verifyJWTToken, kelompokController.getKelompokByClass);
kelompokRouter.post('/post', verifyJWTToken, kelompokController.createKelompok);
kelompokRouter.delete('/delete', verifyJWTToken, kelompokController.deleteKelompok);
kelompokRouter.patch('/update/info/:id', verifyJWTToken, kelompokController.updateInfoKelompok);
kelompokRouter.patch('/update/status/:id', verifyJWTToken, kelompokController.updateStatusKelompok);
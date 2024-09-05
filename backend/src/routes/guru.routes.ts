import express from 'express';

import * as guruController from '../controllers/guru/guru.controllers';
import * as randomAccCreation from '../controllers/kelompok/random.account.controllers';

import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const guruRouter = express.Router();

guruRouter.get('/get', guruController.getAllGuru);
guruRouter.get('/get/:id', verifyJWTToken, guruController.getGuru);
guruRouter.get('/kelas/:id', verifyJWTToken, guruController.getKelasByGuru);
guruRouter.delete('/delete/:id', verifyJWTToken, guruController.deleteGuru);
guruRouter.post('/signup', guruController.signUp);
guruRouter.post('/kelas/:id_kelas/team-numbers/:team_numbers', randomAccCreation.createRandomAccountByTeamNumbers);

export default guruRouter;
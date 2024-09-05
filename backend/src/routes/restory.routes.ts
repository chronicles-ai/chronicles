import express from 'express';

import * as restoryController from '../controllers/restory/restory.controllers';
import { verifyJWTToken } from '../common/middlewares/auth.middlewares';

export const restoryRouter = express.Router();

// restoryRouter.get('/get/kelompok/:id', verifyJWTToken, restoryController.getKelompokByRestory);
restoryRouter.get('/get/real-story/:id', verifyJWTToken, restoryController.getStoryOfRestoryById);
restoryRouter.get('/get/images/:id_story/kelompok/:id_kelompok', verifyJWTToken, restoryController.getRealStoryImages);
restoryRouter.get('/get/kelompok/:id_kelompok', verifyJWTToken, restoryController.getRestoryByKelompokId)
restoryRouter.post('/post', verifyJWTToken, restoryController.createRestory);
restoryRouter.delete('/delete', verifyJWTToken, restoryController.deleteRestory);
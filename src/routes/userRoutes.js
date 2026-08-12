import express from 'express';
import { cadastrarUsuario, listarUsuariosController } from '../controllers/userController.js';
const router = express.Router();

router.post('/usuarios', cadastrarUsuario);
router.get('/usuarios', listarUsuariosController);

export default router;
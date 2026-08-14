import express from 'express';
import { cadastrarUsuario, deletarUsuarioController, editarUsuariosController, listarUsuariosController } from '../controllers/userController.js';

const router = express.Router();

router.post('/usuarios', cadastrarUsuario);
router.get('/usuarios', listarUsuariosController);
router.put('/usuarios/:id', editarUsuariosController);
router.delete('/usuarios/:id', deletarUsuarioController);

export default router;
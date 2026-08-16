import { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario} from "../models/userModel.js";
import bcrypt from "bcrypt";

async function cadastrarUsuario(req,res) {
    const {nome,email,senha} = req.body;

    if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    try{
        const senhaHash = await bcrypt.hash(senha, 10);
        const resultado = await criarUsuario(nome, email, senhaHash);
        res.status(201).json({ mensagem: "Usuário criado com sucesso" })
    }catch(erro){
        res.status(400).json({ mensagem: "Falha ao tentar criar novo usuário", erro: erro.message });
    }
    return 
}

async function listarUsuariosController(req,res) {
    try{
        const resultado = await listarUsuarios();
        res.status(200).json ({ usuarios: resultado});
    }catch(erro){
        res.status(500).json({mensagem: "Falha ao carregar a lista de usuários.", erro: erro.message});
    }
    return
}

async function editarUsuariosController(req,res) {
    const {nome,email,senha} = req.body;
    const id = req.params.id;

    if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }
    
    try{
        const senhaHash = await bcrypt.hash(senha, 10);
        const resultado = await editarUsuario(nome,email,senhaHash,id);
        res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });

    }catch(erro){
        res.status(400).json({mensagem: "Falha ao editar as configurações deste usuário.", erro: erro.message});
    }
    return
}

async function deletarUsuarioController(req,res) {
    const id = req.params.id;
    try{
        const resultado = await deletarUsuario(id);
        res.status(200).json({mensagem: "Usuário removido com sucesso!"});
    }catch(erro){
        res.status(500).json({mensagem: "Falha ao remover usuário.", erro: erro.message});
    }
    return
}


export { cadastrarUsuario, listarUsuariosController, editarUsuariosController, deletarUsuarioController };
import { criarUsuario, listarUsuarios} from "../models/userModel.js";

async function cadastrarUsuario(req,res) {
    const {nome,email,senha} = req.body;
    try{
        const resultado = await criarUsuario(nome, email, senha);
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

export { cadastrarUsuario, listarUsuariosController };
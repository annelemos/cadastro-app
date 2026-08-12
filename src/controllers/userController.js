import { criarUsuario } from "../models/userModel.js";

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

export { cadastrarUsuario };
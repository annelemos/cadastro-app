import conexao from "../config/database.js";

async function criarUsuario(nome, email, senha) {
    const query = ` 
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1,$2,$3)
    `;
    const resultado = await conexao.query(query,[nome, email, senha]);
    
    return resultado;
};

export { criarUsuario };
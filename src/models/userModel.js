import conexao from "../config/database.js";

async function criarUsuario(nome, email, senha) {
    const query = ` 
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1,$2,$3)
    `;
    const resultado = await conexao.query(query,[nome, email, senha]);
    
    return resultado;
}

async function listarUsuarios () {
    const  resultado = await conexao.query('SELECT * FROM usuarios');
    return resultado.rows;
}
async function editarUsuario(nome,email,senha,id) {
    const query = `
    UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4
    `;
    const resultado = await conexao.query(query,[nome,email,senha,id]);
    return resultado;
}

async function deletarUsuario(id) {
    const query = `
    DELETE FROM usuarios WHERE id = $1
    `;
    const resultado = await conexao.query(query,[id]);
    return resultado;
}

export { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario };

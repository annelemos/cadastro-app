document.getElementById('formCadastro').addEventListener('submit', async function (evento) {
    evento.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();
    console.log(dados);
});



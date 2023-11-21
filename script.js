document.addEventListener("DOMContentLoaded", function(){
    const formulario = document.getElementById('meuFormulario');
    const listaUsuariosUL = document.getElementById('listaDeUsuarios');
    const downloadBotao = document.getElementById('downloadJSON');
    const listaDados = [];

    if(formulario){
        formulario.addEventListener('submit', function(event){
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const idade = document.getElementById('idade').value;

            const dados = {
                nome: nome,
                email: email,
                idade: idade
            }

            listaDados.push(dados);
            formulario.reset();

            exibirUsuarios();
        });

        downloadBotao.addEventListener('click', function(){
            const dadosJSON = JSON.stringify(listaDados);
            const blob = new Blob([dadosJSON], { type: "application/json"});

            const url = URL.createObjectURL(blob);

            const linkDownload = document.createElement('a');
            linkDownload.href = url;
            linkDownload.download = 'dados_usuarios.json';

            document.body.appendChild(linkDownload);
            linkDownload.click();

            URL.revokeObjectURL(url);
        });
    }
    else{
        console.error("Elemento com ID 'meuFormulario' não foi encontrado");
    }

    function exibirUsuarios(){
        listaUsuariosUL.innerHTML = '';
        listaDados.forEach(function(usuario, indice){
            const listItem = document.createElement('li');
            listItem.innerHTML = `Nome: ${usuario.nome}, Email: ${usuario.email}, Idade: ${usuario.idade}`;
            listaUsuariosUL.appendChild(listItem)
        });
    }
});
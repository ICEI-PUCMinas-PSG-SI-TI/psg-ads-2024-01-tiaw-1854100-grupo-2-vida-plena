//-INICIO--API COMPARTILHAMENTO NATIVO - WEB SHARE API----
function compartilharfeed(i) {
    let link = `detalhes.html?id=${i}`;
    let noticia = LerNoticia(i);

    if (navigator.share) {
        navigator.share({
            title: noticia.titulo_caixa,
            text: noticia.descricao_caixa,
            url: link
        })
            .then(() => console.log("Obrigado por compartilhar!"))
            .catch((err) => console.error(err))
    } else {
        alert("O navegador não suporta a função de compartilhamento nativo!")
    }
}//-FIM--API COMPARTILHAMENTO NATIVO - WEB SHARE API----

function LerNoticia(i) {
    let objDados = JSON.parse(localStorage.getItem('db'));
    let noticia = objDados.noticias[i];
    return noticia;
}

//Função para caregar na pagina de FEED
function Carregar() {
    //Puxo o atual localStorage, tem que ter isso aqui, e dentro do for
    var objDados = JSON.parse(localStorage.getItem("db"))

    //Recupero a informação que tem na tela
    let tela = document.getElementById('tela')

    //Variavel que receberá todo o conteudo do objeto
    strImprimir = '';

    //For para colocar todas as informações, como titulo e descrição em strImprimir
    for (var i = 0; i < objDados.noticias.length; i++) {
        //Variavel que recebe o vetor contido no localStorage
        let noticia = objDados.noticias[i];

        let comentarios = LerComentarios(i);


        //Acumulando todas as informações desse vetor em strImprimir
        //Troquei essa informação por um card pronto do bootstrap

        strImprimir += `<div class="p-1 border my-5" id="${i}" style="width: 100%;">
        <img src="https://picsum.photos/800/600?random=1" class="card-img-top" alt="...">

        <div class="border-top">
        <i type="button" style="color:${noticia.like};" onclick="btncurtir(${i})" class="bi bi-heart-fill mx-3" id="botaocurtir${i}"></i>
        <i type="button" onclick="abrircomentario(${i})" class="bi bi-chat mx-3" id="botoes"></i>
        <i type="button" onclick="compartilharfeed(${i})" class="bi bi-send text-end mx-3"></i>
        <div id="comentar${i}" style="display:none;" >
            <strong id="comentar" class="text-center">Comentar</strong>
            <div id="comentarios">
            <textarea class="textarea" style="width:100%;" id="comentario${i}"></textarea>
            <input onclick="comentar(${i})" type="submit"></input>
            </div>
        </div>
        </div>

        <div class="card-body">
        <p class="card-text text-center"><strong>${noticia.titulo_caixa}</strong></p>
        <p id="descricao" class="card-text p-3">${noticia.descricao_caixa}</p>
        <p><a href="detalhes.html?id=${i}">Ver Publicação</a></p>
        </div><hr style="height:1px;border-width:0;color:gray;background-color:gray">
        <h5 class="text-center"><strong>Comentários</strong></h5>
        <div class="container" id="TelaComent${i}">${comentarios}</div>
    </div>`
    }

    //Mandando de volta pra div de nome "tela"
    tela.innerHTML = strImprimir;
}


//função para mudar a cor do botão curtir --INICIO--
function btncurtir(i) {
    //puxei o Local storege e atribui a variavel objDados
    objDados = JSON.parse(localStorage.getItem("db"))

    //crie uma variavel para a cor do botao, inicialmente preta
    var curtido = 'black';

    //puxei o id do botao Like
    var botao = document.getElementById("botaocurtir" + i);

    //fiz uma verificação da cor do botao. Se estiver preto vai ficar vermelho, e visse versa. Por final grava no Local storage a cor do botão para quando reiniciar a page as infos do botao estarem estarem salvas.
    if (botao.style.color === "black") {
        botao.style.color = "red";
        curtido = 'red';
        objDados.noticias[i].like = curtido;
        localStorage.setItem('db', JSON.stringify(objDados));
    } else {
        botao.style.color = "black";
        objDados.noticias[i].like = curtido;
        localStorage.setItem('db', JSON.stringify(objDados));
    }

}//--FIM--

// - INICIO - Function para abrir com o botão de Comentar 
function abrircomentario(i) {
    var elemento = document.getElementById("comentar" + i);
    if (elemento.style.display === "none") {
        elemento.style.display = "block"; // Mostra o elemento
    } else {
        elemento.style.display = "none"; // Oculta o elemento
    }

}// - FIM - Function para abrir com o botão de Comentar


//função que recebe o comentario e leva para o LocalStorage
function comentar(i) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let usuario = usuarios.logado[0];

    var comentario = document.getElementById('comentario' + i).value;
    if (localStorage.hasOwnProperty('db')) {
        objDados = JSON.parse(localStorage.getItem('db'))
    }
    if (!objDados.noticias[i].comentarios) {
        objDados.noticias[i].comentarios = new Array();
        objDados.noticias[i].comentarios.unshift(`<strong>${usuario.nome + "</strong>: " + comentario}`);

        localStorage.setItem('db', JSON.stringify(objDados));
        alert('Comentário salvo, pela primeira vez!')
    }
    else {
        objDados.noticias[i].comentarios.unshift(`<strong>${usuario.nome + "</strong>: " + comentario}`);

        localStorage.setItem('db', JSON.stringify(objDados));
        alert('Comentário salvo! Já existo')
    }
    ImprimirComentarios(i, objDados);

}

//----IMPRIMIR OS COMENTÁRIOS ----INICIO
function ImprimirComentarios(pos, objDados) {
    var strComentarios = '';
    var TelaComent = document.getElementById('TelaComent' + pos)

    for (var i = 0; i < objDados.noticias[pos].comentarios.length; i++) {
        let comentario = objDados.noticias[pos].comentarios[i];

        strComentarios += `<p>${comentario}</p>`;

    }

    return TelaComent.innerHTML = strComentarios;
}
function LerComentarios(i) {
    objDados = JSON.parse(localStorage.getItem('db'))
    objComentarios = objDados.noticias[i].comentarios;

    return objComentarios;

}//--FIM
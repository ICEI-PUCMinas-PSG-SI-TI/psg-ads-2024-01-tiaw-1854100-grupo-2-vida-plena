//Variavel puxando o conteudo do form
var Form = document.getElementById("Conteudo");

//Escutador de evento para saber se o butão foi clicado
Form.addEventListener("submit", (e) => {
    
    //Faz para de dar reload na pagina
    e.preventDefault();

    //Puxando os texto do imput
    var titulo = document.getElementById('titulo_caixa').value;
    var descricao = document.getElementById('descricao_caixa').value;

    objDados = {noticias: []};

    //Verificando se existe esse banco
    if(localStorage.hasOwnProperty("db")){

        //Se sim, ele faz o objeto "objDados" receber o banco de dados de nome "db" 
        objDados = JSON.parse(localStorage.getItem("db"))
    }
    //Se não ele faz ser add essa proxima linha de no banco de dados

    //Em vez de usar o push (adicionar na após a ultima posição) usei o unshift que add antes da primeira
    //O padrão é: id do input : variavel que recebeu seu valor
    objDados.noticias.unshift({titulo_caixa: titulo, descricao_caixa: descricao});

    //Tranformando as info adicionadas na variavel objDados em formato de string e enviando no lugar do banco atual
    localStorage.setItem('db', JSON.stringify(objDados))
    alert('Salvo')

    //não precisa de um return, eu testei
})

//Função para caregar na pagina de FEED
function Carregar(){
    //Puxo o atual localStorage, tem que ter isso aqui, e dentro do for
    var objDados = JSON.parse(localStorage.getItem("db"))

    //Recupero a informação que tem na tela
    let tela = document.getElementById('tela')

    //Variavel que receberá todo o conteudo do objeto
    strImprimir = '';

    //For para colocar todas as informações, como titulo e descrição em strImprimir
    for(var i=0; i<objDados.noticias.length; i++){
        //Variavel que recebe o vetor contido no localStorage
        let noticia = objDados.noticias[i]; 

        let comentarios = LerComentarios(i);

        console.log(comentarios)

        //Acumulando todas as informações desse vetor em strImprimir
        //Troquei essa informação por um card pronto do bootstrap

        strImprimir += `<div class="p-1 shadow m-2" id="${i}" style="width: 100%;">
        <img src="https://source.unsplash.com/random/800x600/?family" class="card-img-top" alt="...">

        <div class="border-top">
          <i type="button" style="color:${noticia.like};" onclick="btncurtir(${i})" class="bi bi-heart-fill mx-3" id="botaocurtir${i}"></i>
          <i type="button" onclick="abrircomentario(${i})" class="bi bi-chat mx-3" id="botoes"></i>
          <i type="button" class="bi bi-send text-end mx-3" id="botoes"></i>
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
          <p class="card-text p-3">${noticia.descricao_caixa}</p>
        </div>
        <h5 class="text-center"><strong>Comentarios</strong></h5>
        <div id="TelaComent${i}">${comentarios}</div>
      </div>`
    }

    //Mandando de volta pra div de nome "tela"
    tela.innerHTML = strImprimir;
}
 
//função para mudar a cor do botão curtir --INICIO--
function btncurtir(i){
  //puxei o Local storege e atribui a variavel objDados
  objDados=JSON.parse(localStorage.getItem("db"))

  //crie uma variavel para a cor do botao, inicialmente preta
  var curtido='black';

  //puxei o id do botao Like
  var botao=document.getElementById("botaocurtir"+i);

  //fiz uma verificação da cor do botao. Se estiver preto vai ficar vermelho, e visse versa. Por final grava no Local storage a cor do botão para quando reiniciar a page as infos do botao estarem estarem salvas.
  if(botao.style.color==="black"){
    botao.style.color="red";
    curtido='red';
    objDados.noticias[i].like=curtido;
    localStorage.setItem('db',JSON.stringify(objDados));
  } else {
    botao.style.color="black";
    objDados.noticias[i].like=curtido;
    localStorage.setItem('db',JSON.stringify(objDados));
  }
  
}//--FIM--

// - INICIO - Function para abrir com o botão de Comentar 
function abrircomentario(i){
  var elemento = document.getElementById("comentar"+i);
  if (elemento.style.display === "none") {
      elemento.style.display = "block"; // Mostra o elemento
  } else {
      elemento.style.display = "none"; // Oculta o elemento
  }

}// - FIM - Function para abrir com o botão de Comentar
 

//função que recebe o comentario e leva para o LocalStorage
function comentar(i){
/*
  var comentario=document.getElementById('comentario'+i).value;

    var comentarioPorPost={};

  if(localStorage.hasOwnProperty('ComentarioPorPost')){
    comentarioPorPost=JSON.parse(localStorage.getItem('ComentarioPorPost'))
  }

  if(!comentarioPorPost[i]){
    comentarioPorPost[i]= [];
  }

  comentarioPorPost[i].unshift({comentario})

  var strImprimir = '';
  var TelaComent=document.getElementById('TelaComent'+i)
  

  localStorage.setItem('ComentarioPorPost',JSON.stringify(comentarioPorPost));
  alert('salvo');
  for(var j=0; j<comentarioPorPost[i].length; j++){
      //Variavel que recebe o vetor contido no localStorage
      let comment = comentarioPorPost[i][j];

      //Acumulando todas as informações desse vetor em strImprimir
      //Troquei essa informação por um card pronto do bootstrap
      //strImprimir += `<p>noticia: ${noticia.titulo_caixa} || assunto: ${noticia.descricao_caixa}</p>`

      strImprimir += `<p class="px-4"><strong>Comentario:</strong> ${comment.comentario}</p>`
    }
  
return TelaComent.innerHTML=strImprimir;*/


var comentario=document.getElementById('comentario'+i).value;
if(localStorage.hasOwnProperty('db')){
  objDados =JSON.parse(localStorage.getItem('db'))
}
if(!objDados.noticias[i].comentarios){
  objDados.noticias[i].comentarios = new Array();
  objDados.noticias[i].comentarios.unshift(comentario);

  localStorage.setItem('db',JSON.stringify(objDados));
  alert('Comentário salvo, pela primeira vez!')
}
else{
  objDados.noticias[i].comentarios.unshift(comentario);

  localStorage.setItem('db',JSON.stringify(objDados));
  alert('Comentário salvo! Já existo')
}
ImprimirComentarios(i, objDados);

}

//----IMPRIMIR OS COMENTÁRIOS ----INICIO
function ImprimirComentarios(pos, objDados){
  var strComentarios = '';
  var TelaComent=document.getElementById('TelaComent'+pos)

  for(var i = 0;i < objDados.noticias[pos].comentarios.length; i++){
    let comentario = objDados.noticias[pos].comentarios[i];

    strComentarios += `<p>${comentario}</p>`;

  }

  return TelaComent.innerHTML=strComentarios;
}
function LerComentarios(i){
  objDados = JSON.parse(localStorage.getItem('db'))
  objComentarios = objDados.noticias[i].comentarios;

  return objComentarios;
  
}//--FIM

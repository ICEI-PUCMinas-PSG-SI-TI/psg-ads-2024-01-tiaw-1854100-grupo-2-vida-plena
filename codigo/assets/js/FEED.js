//Variavel puxando o conteudo do form
var Form = document.getElementById("Conteudo");

//Escutador de evento para saber se o butão foi clicado
Form.addEventListener("submit", (e) => {
    
    //Faz para de dar reload na pagina
    e.preventDefault();

    //Puxando os texto do imput
    var titulo = document.getElementById('titulo_caixa').value;
    var descricao = document.getElementById('descricao_caixa').value;
    //console.log(titulo_caixa);
    //console.log(descricao_caixa);

    objDados = {noticias: []};

    //Verificando se existe esse banco
    if(localStorage.hasOwnProperty("db")){

        //Se sim, ele faz o objeto "objDados" receber o banco de dados de nome "db" 
        objDados = JSON.parse(localStorage.getItem("db"))
    }
    console.log(objDados);
    //Se não ele faz ser add essa proxima linha de no banco de dados

    //Em vez de usar o push (adicionar na após a ultima posição) usei o unshift que add antes da primeira
    //O padrão é: id do input : variavel que recebeu seu valor
    objDados.noticias.unshift({titulo_caixa: titulo, descricao_caixa: descricao});
    console.log(objDados);
    //Tranformando as info adicionadas na variavel objDados em formato de string e enviando no lugar do banco atual
    localStorage.setItem('db', JSON.stringify(objDados))
    alert('Salvo')

    //não precisa de um return, eu testei
})

//Função para caregar na pagina de FEED
function Carregar(){
    //Puxo o atual localStorage, tem que ter isso aqui, e dentro do for
    var objDados = JSON.parse(localStorage.getItem("db"))
    //console.log(objDados)

    //Recupero a informação que tem na tela
    let tela = document.getElementById('tela')

    //Variavel que receberá todo o conteudo do objeto
    strImprimir = '';

    //For para colocar todas as informações, como titulo e descrição em strImprimir
    for(var i=0; i<objDados.noticias.length; i++){
        //Variavel que recebe o vetor contido no localStorage
        let noticia = objDados.noticias[i];

        //Acumulando todas as informações desse vetor em strImprimir
        //Troquei essa informação por um card pronto do bootstrap
        //strImprimir += `<p>noticia: ${noticia.titulo_caixa} || assunto: ${noticia.descricao_caixa}</p>`

        strImprimir += `<div class="card" style="width: 100%;">
        <img src="assets/img/Logo-Sem Fundo.png" class="card-img-top" alt="...">

        <div class="comment container-fluid border-top">
          <input type="checkbox" id="toggle">
          <i class="bi bi-heart px-3" id="botaocurtir"></i>
          <label for="toggle"><i class="bi bi-chat" type="button" id="botaocomentar" name="abrir"></i></label>
          <i class="bi bi-send text-end px-3" id="botaoenviar" ></i>
          <div class="container-fluid" id="comentar">
            <strong id="comentar" class="text-center">Comentar</strong>
            <div id="comentarios">
              <textarea class="comentarr" id="comentario"></textarea>
              <input onclick="comentar()" type="submit"></input>
            </div>
          </div>
        </div>

        <div class="card-body">
          <p class="card-text"><strong>${noticia.titulo_caixa}</strong></p>
          <p class="card-text">${noticia.descricao_caixa}</p>
        </div>
        <h5><strong class="text-center">Comentarios</strong></h5>
        <div id="TelaComent"></div>
      </div>`
    }

    //Mandando de volta pra div de nome "tela"
    tela.innerHTML = strImprimir;
}

function comentar(){

  var comentario=document.getElementById('comentario').value;
  /*console.log(comment);*/
  var objcoment=[];

  if(localStorage.hasOwnProperty('Comentarios')){
    objcoment=JSON.parse(localStorage.getItem('Comentarios'))
  }
  
  objcoment.unshift({comentario})

  strImprimir = '';
  TelaComent=document.getElementById('TelaComent')
  

  localStorage.setItem('Comentarios',JSON.stringify(objcoment));
  alert('salvo');
  for(var i=0; i<objcoment.length; i++){
      //Variavel que recebe o vetor contido no localStorage
      let comment = objcoment[i].comentario;

      //Acumulando todas as informações desse vetor em strImprimir
      //Troquei essa informação por um card pronto do bootstrap
      //strImprimir += `<p>noticia: ${noticia.titulo_caixa} || assunto: ${noticia.descricao_caixa}</p>`

      strImprimir += `<p class="px-4"><strong>Comentario:</strong> ${comment}</p>`
      console.log(comment)
    }
  
TelaComent.innerHTML=strImprimir;
}

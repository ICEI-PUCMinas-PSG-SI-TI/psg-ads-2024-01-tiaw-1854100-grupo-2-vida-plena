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

    //Verificando se existe esse banco
    if(localStorage.hasOwnProperty("db")){

        //Se sim, ele faz o objeto "objDados" receber o banco de dados de nome "db" 
        objDados = JSON.parse(localStorage.getItem("db"))
    }
    //Se não ele faz ser add essa proxima linha de no banco de dados

    //Em vez de usar o push (adicionar na após a ultima posição) usei o unshift que add antes da primeira
    //O padrão é: id do input : variavel que recebeu seu valor
    objDados.noticias.unshift({titulo_caixa : titulo, descricao_caixa: descricao});

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
        <div class="card-body">
          <p class="card-text"><strong>${noticia.titulo_caixa}</strong></p>
          <p class="card-text">${noticia.descricao_caixa}</p>
        </div>
      </div>`
    }

    //Mandando de volta pra div de nome "tela"
    tela.innerHTML = strImprimir;
}
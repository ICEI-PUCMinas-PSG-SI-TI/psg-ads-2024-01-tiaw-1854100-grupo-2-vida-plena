var Form = document.getElementById("Conteudo");

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    var titulo_caixa = document.getElementById('titulo_caixa').value;
    var descricao_caixa = document.getElementById('descricao_caixa').value;
    console.log(titulo_caixa);
    console.log(descricao_caixa);
    
    let novoConteudo = new Array();

    if(localStorage.hasOwnProperty("db")){
        novoConteudo = JSON.parse(localStorage.getItem("db"))
    }

    novoConteudo.push({titulo_caixa, descricao_caixa});

    localStorage.setItem('db', JSON.stringify(novoConteudo))
    alert('Salvo')
})

/*function Carregar(){
    var bancoFEED = JSON.parse(localStorage.getItem("db"))
    let tela = document.getElementById('tela')
    for(var i=0; i<bancoFEED..length; i++){
        let linha = document.createElement('tr');
        linha.innerHTML = "" + 
            "<td>" + usuarios.users[i].username + "</td>" + 
            "<td>" + usuarios.users[i].nome + "</td>" + 
            "<td>" + usuarios.users[i].sobrenome + "</td>" + 
            "<td>" + usuarios.users[i].email + "</td>"
        ;
        tabela.append(linha);
    }
}
function Load(){
    var usuarios =  JSON.parse(localStorage.getItem('user'));
    var tabela = document.getElementById("tabela");
    for(var i=0; i<usuarios.users.length; i++){
        let linha = document.createElement('tr');
        linha.innerHTML = "" + 
            "<td>" + usuarios.users[i].username + "</td>" + 
            "<td>" + usuarios.users[i].nome + "</td>" + 
            "<td>" + usuarios.users[i].sobrenome + "</td>" + 
            "<td>" + usuarios.users[i].email + "</td>"
        ;
        tabela.append(linha);
    }
}*/
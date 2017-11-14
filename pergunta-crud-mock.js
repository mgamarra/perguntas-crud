var
	perguntas = 
[
  {
    "opcoes": [
      {
        "correta": false,
        "text": "nostrud magna deserunt velit ea",
        "id": 0
      },
      {
        "correta": false,
        "text": "laborum nulla veniam qui aliquip",
        "id": 1
      },
      {
        "correta": false,
        "text": "nulla labore ullamco laboris esse",
        "id": 2
      }
    ],
    "text": "est voluptate laborum Lorem voluptate",
    "id": 0
  },
  {
    "opcoes": [
      {
        "correta": false,
        "text": "velit cillum enim voluptate exercitation",
        "id": 0
      },
      {
        "correta": false,
        "text": "nulla quis duis aliqua eu",
        "id": 1
      },
      {
        "correta": false,
        "text": "sit mollit pariatur consectetur in",
        "id": 2
      }
    ],
    "text": "ex duis elit ullamco ad",
    "id": 1
  },
  {
    "opcoes": [
      {
        "correta": false,
        "text": "eiusmod do id labore aliquip",
        "id": 0
      },
      {
        "correta": false,
        "text": "pariatur aute aute ipsum consequat",
        "id": 1
      },
      {
        "correta": false,
        "text": "ullamco enim incididunt aute irure",
        "id": 2
      }
    ],
    "text": "aute et veniam ad occaecat",
    "id": 2
  },
  {
    "opcoes": [
      {
        "correta": false,
        "text": "nisi quis ex exercitation do",
        "id": 0
      },
      {
        "correta": false,
        "text": "proident proident laboris cupidatat dolore",
        "id": 1
      },
      {
        "correta": false,
        "text": "Lorem officia et nostrud tempor",
        "id": 2
      }
    ],
    "text": "labore amet anim exercitation laborum",
    "id": 3
  },
  {
    "opcoes": [
      {
        "correta": false,
        "text": "non cupidatat anim qui mollit",
        "id": 0
      },
      {
        "correta": false,
        "text": "aliquip culpa consectetur officia mollit",
        "id": 1
      },
      {
        "correta": false,
        "text": "officia sit nisi occaecat anim",
        "id": 2
      }
    ],
    "text": "do tempor ex eiusmod ad",
    "id": 4
  }
];

var httpMock = function(){
	
	var usuarios = [];
	
	function addUser(login,senha){
		var o = {login:login, senha:senha};
		o.id = usuarios.length + 1;
		usuarios.push(o);
		return o;
	}
	function getUser(login){
		return usuarios.filter(function(o){
			return o.login == login;
		})[0];
	}
	
	addUser('adm','123');
	
	var data;
	
	var result = {
		then: function(ok, fail) {
			if (ok) ok(data);
		}
	}

	var post = function(url, params) {
		
		data = {};
						
		if (url == url_add_user) {
			var o = addUser(params.login, params.senha);
			data.usuario = o;
			return result;
		}				
		
		if (url == url_checar_user) {
			if (!getUser(params.login)) {
				data.erro = 'Usuario não encontrado';
			}
			return result;
		}
		
		if (url == url_checar_senha) {
			var o = getUser(params.login);
			if (o.senha == params.senha) {
				data.usuario = o;
			}
			return result;
		}	
		
		if (url == url_pesquisa) {
			data = {list : []};
			/*
			function addPergunta(pergunta,opcao1,opcao2,opcao3,opcao4,opcaoCorreta){
				var o = {};
				o.pergunta = pergunta;
				o.opcao1 = opcao1;
				o.opcao2 = opcao2;
				o.opcao3 = opcao3;
				o.opcao4 = opcao4;
				o.opcaoCorreta = opcaoCorreta;
				data.list.push(o);
			}

			addPergunta('Quanto é 3*3','4','93','12','9',3);
			addPergunta('Azul+Amarelo é','Verde','Vermelho','Rosa','Laranja',0);
			addPergunta('Quem descobriu o Brasil','Maria','João','Pedro','José',2);
			addPergunta('Quantos livros tem a Bíblia?','100','93','45','66',3);
			addPergunta('Onde fica Brasilia?','Canadá','Brasil','Bolívia','Chile',1);
			*/
			if ((params.text == undefined) || (params.text == '')) {
				data.list = perguntas;
			} else {
				for (var i = 0; i < perguntas.length; i++) {
					var o = perguntas[i];
					if (o.text.indexOf(params.text) > -1 ) {
						data.list.push(o);
					}

				}
			}
			return result;
			
		}
				
		$s.erro = 'url nao implementada: ' + url;
		return result;
		
	};
		
	return {post:post, get:post};
	
}();

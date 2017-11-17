
app.controller("list", function ($scope, $http, $timeout) {
		
	$s.btnPesquisarClick = function(){
		$s.pesquisaExecutar();
	}

	$s.btnPesquisaLimparClick = function(){
		//limpa o form de pesquisa
		$s.pes = {};

		//limpa a lista de consulta, nesse momento a table fica vazia e é oculta pela diretiva ng-show 
		$s.pesquisa.items = [];	
	}

	$s.btnNovoRegistro = function(){
		//limpa o form de edicao
		$s.formEdicao.o = {opcoes : [{}]};

		//set a aba do cadastro
		$s.aba = 'cadastro';
	}
	
	$s.btnRowEditClick = function(id) {
		//recupera o registro pelo id passado da grid
		get(url_getById, {id:id}, function(data){
			
			//coloco o objeto model
			$s.formEdicao.o = data.o;	
			//set a aba do cadastro
			$s.aba = 'cadastro';
		});		
	}
	$s.btnRowRemoveClick = function(id){
		get(url_remover, {id:id}, function(data){
			
			if (data.erro) {
				$s.erro = data.erro;
			} else {
				// se a remoção ocorrer sem problemas, limpa o item da lista que mostra na tela
				var index = -1;	
				for (var i = 0; i < $s.pesquisa.items.length; i++) {
					if ( $s.pesquisa.items[i].id === id ) {
						index = i;
						break;				
					}
				}
				if( index !== -1 ) {
					$s.pesquisa.items.splice( index, 1 );	
				}
			}

		});

	}

	$s.getById = function(id){
		get(url_getById, {id:id}, function(data){
			$s.formEdicao.o = data.o;	
		});
	}

	$s.pesquisaExecutar = function(){
		//limpa a lista de consulta, nesse momento a table fica vazia e é oculta pela diretiva ng-show 
		$s.pesquisa.items = [];	
		// caso o campo de pesquisa esteja preenchido, usar texto para pesquisa, caso contrário usar branco
		let text = $s.pes  ? $s.pes.text : '';
		
		get(url_pesquisar, {text:text}, function(data){
			// a lista de consulta recebe o retorno.
			$s.pesquisa.items = data.list;	
		});
	}

});


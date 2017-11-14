var $s, $s1;
const url_add_user = '<url_add_user>';
const url_checar_user = '<url_checar_user>';
const url_checar_senha = '<url_checar_senha>';
const url_pesquisa = '<url_pesquisa>';



var app = angular.module("app",[]);

app.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});

app.controller("ctrl", function ($scope, $http, $timeout) {
	
	$s = $scope;
	//$s.http = $http;
	$s.http = httpMock;

	$s.pesquisa = {showResultado: false};

		
	$s.aba = 'pesquisa';
	$s1 = $scope;

	function request(func, url, params, onSuccessFunction, onFailFunction) {
		
		if (params instanceof Function) {
			$s.erro = 'params instanceof Function';
			return;
		}
		if (onSuccessFunction && !(onSuccessFunction instanceof Function)){
			$s.erro = '!(onSuccessFunction instanceof Function)';
			return;
		}
		if (onFailFunction && !(onFailFunction instanceof Function)){
			$s.erro = '!(onFailFunction instanceof Function)';
			return;
		}		
		
    	var rp = { headers: {'Content-Type': 'application/json'}};
		if(!params) params = [];
    	if (params.responseType) {
    		rp.responseType = 'arraybuffer';
    	}		
		func(url, params, rp).then(
			function(data){
				if (data.erro) {
					if (onFailFunction) onFailFunction(data);	
				} else {
				if (onSuccessFunction) onSuccessFunction(data);	
				}
			},
			function(data){
				if (onFailFunction) onFailFunction(data);
			},
		);
    }
	var post = function(url, params, onSuccessFunction, onFailFunction) {
		request($s.http.post, url, params, onSuccessFunction, onFailFunction);
	}
	var get = function(url, params, onSuccessFunction, onFailFunction) {
		request($s.http.get, url, params, onSuccessFunction, onFailFunction);
	}

	$s.btnPesquisaClick = function(){
		console.log($s.pes);
		$s.pesquisa.showResultado = true;
		$s.pesquisaExecutar();
	}

	$s.pesquisaLimpar = function(){
		//limpa o form de pesquisa
		$s.pes = {};

		//Esconde a grid de resutado
		$s.pesquisa.showResultado = false;
	}

	$s.abaPesquisa = function(){
		$s.aba = 'pesquisa';
	}


	$s.pesquisaExecutar = function(){
		//limpa a lista de consulta, nesse momento a table fica vazia
		$s.pesquisa.items = [];	
		// caso o campo de pesquisa esteja preenchido, usar texto para pesquisa, caso contrário usar branco
		let text = $s.pes  ? $s.pes.text : '';
		
		get(url_pesquisa, {text:text}, function(data){
			// a lista de consulta recebe o retorno.
			$s.pesquisa.items = data.list;	
			
			console.log($s.pesquisa.items);

		});
	}
	


	$('body').show();


});


//https://hello-angularjs.appspot.com/removetablerow
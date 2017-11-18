var $s;
var vm;

const url_pesquisar = '<url_pesquisar>';
const url_getById = '<url_getById>';
const url_remover = '<url_remover>';
const url_salvar = '<url_salvar>';


var app = angular.module("app",[]);
	

//diretiva para resolver o post dos botoes
app.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});


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



app.controller("ctrl", function ($scope, $http, $timeout) {
		
	$s = $scope;
	
	vm = this;
	//$s.http = $http;
	$s.http = httpMock;
	//inicia o form de pesquisa
	$s.pes = {text:""};
	//contera a lista de perguntas consultadas
	$s.pesquisa = {items:[]};
	$s.formEdicao = {};
	
	$s.aba = 'pesquisa';


	$('body').show();


});


//https://hello-angularjs.appspot.com/removetablerow
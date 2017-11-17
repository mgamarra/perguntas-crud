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



//diretiva para exibir a tela de confirmação. Usada na consulta de questões
//devese colocar o atributo ng-confirm-click no botao 
app.directive("ngConfirmClick", [
  function() {
   return {
     priority: -1,
      restrict: "A",
      link: function(scope, element, attrs) {
        element.bind("click", function(e) {
          var message;
          message = attrs.ngConfirmClick;
          if (message && !confirm(message)) {
           e.stopImmediatePropagation();
           e.preventDefault();
          }
        });
      }
    };
  }
])

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

	$s.pesquisa = {};
	$s.formEdicao = {};
	//contera a lista de perguntas consultadas
	$s.pesquisa.items = [];		
	
	$s.aba = 'pesquisa';

	$s.btnPesquisarClick = function(){
		$s.pesquisaExecutar();
	}

	$s.btnPesquisaLimparClick = function(){
		//limpa o form de pesquisa
		$s.pes = {};

		//limpa a lista de consulta, nesse momento a table fica vazia e é oculta pela diretiva ng-show 
		$s.pesquisa.items = [];	
	}



	$('body').show();


});


//https://hello-angularjs.appspot.com/removetablerow
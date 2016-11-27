var app = angular.module('app', []);
app.controller('purchasing_requisition_list-controller', function($scope, $http) {
	$http({
			url: '../../virtual_data/purchasing_requisition_list/purchasing_requisition_list.json',
			method: 'GET'
		})
		.success(function(data, header, config, status) {
			$scope.purchasingRequisitionList = data.data;
			console.log("purchasingRequisitionList：",$scope.purchasingRequisitionList);
		})
		.error(function(data, header, config, status) {
			//处理响应失败
		});
	$scope.changeLocation=function(){
		window.location.href="../purchasing_requisition_list_detail/index.html"; 
	}
});
angular.bootstrap(document, ['app']);
var app = angular.module('app', []);
app.controller('purchasing_requisition_draft-controller', function($scope, $http) {
	$http({
			url: '../../virtual_data/purchasing_requisition_draft/purchasingRequisitionList.json',
			method: 'GET'
		})
		.success(function(data, header, config, status) {
			$scope.purchasingRequisitionList = data.data;
		})
		.error(function(data, header, config, status) {
			//处理响应失败
		});
	$scope.deletePurchasingRequisition = function(purchasingRequisition) {
		$("#deletePurchasingRequisition").modal({
			onConfirm: function(options) {
				$scope.purchasingRequisitionList.splice($scope.purchasingRequisitionList.indexOf(purchasingRequisition), 1);
				$scope.$apply($scope);
				//console.info("商品列表:", $scope.goodList);
			}
		});
	}
});
angular.bootstrap(document, ['app']);
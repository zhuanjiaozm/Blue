var app = angular.module('app', []);
app.controller('purchasing_requisition_list-controller', function($scope, $http) {
    $scope.isopen = true;
    $http({
            url: basePath + '/implCHKPurchasePlanList',
            method: 'POST',
            data: {
                is_chked: 0
            }
        })
        .success(function(data, header, config, status) {
            console.log(data);
            $scope.purchasingRequisitionList = data.data;
            console.log("purchasingRequisitionList：", $scope.purchasingRequisitionList);
        })
        .error(function(data, header, config, status) {
            //处理响应失败
        });
    $scope.changeLocation = function() {
        window.location.href = "../purchasing_requisition_list_detail/index.html";
    };
});
angular.bootstrap(document, ['app']);

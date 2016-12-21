$(function() {
    $('#doc-my-tabs').tabs();
});
var app = angular.module("app", []);
app.controller("post-order-controller", function($scope, $http) {

    $http({
        method: 'POST',
        url: basePath + '/implWarehouselist'
    }).success(function(data, status, headers, config) {
        if (data.statusCode === 200) {
            $scope.warehouselist = data.list;
            $http({
                method: 'POST',
                url: basePath + '/implissend'
            }).success(function(data, status, headers, config) {
                if (data.statusCode === 200) {
                    $scope.warehouselist = data.list;

                } else {
                    $scope.errMsg = data.errMsg;
                    $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                    $('#my-confirm').modal();
                }
            }).error(function(data, status, headers, config) {
                console.error('发生网络错误');
            });
        } else {
            $scope.errMsg = data.errMsg;
            $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
            $('#my-confirm').modal();
        }
    }).error(function(data, status, headers, config) {
        console.error('获取仓库时发生错误');
    });

});

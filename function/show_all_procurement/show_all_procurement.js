var app = angular.module("app", []);
app.controller("show-all-procurement-controller", function($scope, $http) {

    $http({
        method: 'POST',
        url: basePath + '/implPurchasingsummary'
    }).success(function(data, status, headers, config) {
        if (data.statusCode === 200) {
            $scope.list = data.list;
        } else {
            $scope.errMsg = data.errMsg;
            $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
            $('#my-confirm').modal();
        }
    }).error(function(data, status, headers, config) {
        console.error('发生网络错误');
    });

});

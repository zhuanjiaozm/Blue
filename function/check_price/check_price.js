var app = angular.module("app", []);
app.controller("check-price-controller", function($scope, $http) {
    $http({
        method: 'POST',
        url: basePath + '/implproductpriceList'
    }).success(function(data, status, headers, config) {
        if (data.statusCode === 200) {
            $scope.rep = data.list;
        } else {
            $scope.errMsg = data.errMsg;
            $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
            $('#my-confirm').modal();
        }
    }).error(function(data, status, headers, config) {
        console.error('发生网络错误');
    });
});

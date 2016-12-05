var app = angular.module('app', [])
    .controller('profile-controller', function($scope, $http) {
        $http({
            method: 'POST',
            url: basePath + '/implUserInfo',
            data: {}
        }).success(function(data, status, headers, config) {
            $scope.userinfo = data.userinfo;
        }).error(function(data, status, headers, config) {
            console.error('获取商品分类发生网络错误');
        });
    });
angular.bootstrap(document, ['app']);

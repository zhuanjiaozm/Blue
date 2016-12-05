var app = angular.module('app', []);
app.controller('login', function($scope, $http) {
	$scope.login = function(user) {
		$scope.data={
			errMsg:''
		};
		$http({
			method: 'POST',
			url: '/YunERP/implLogin',
			data: user
		}).success(function(data, status, headers, config) {
			if(data.userinfo){
				window.location.href="../home/index.html";
			}
			else{
				$scope.data.errMsg = '系统错误，请联系管理员！';
			}
		}).error(function(data, status, headers, config) {
			$scope.data.errMsg = '用户登录发生网络错误';
		});
	}
})
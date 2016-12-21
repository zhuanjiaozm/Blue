var app = angular.module('app', [])
    .controller('purchasing-requisition-list-detail-controller', function($scope, $http) {
        //jquery从URL中获取参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r !== null) return unescape(r[2]);
            return null; //返回参数值
        }
        $http({
            method: 'POST',
            url: basePath + '/implorderdetail',
            data: {
                pch_plan_id: getUrlParam('pch_plan_id')
            }
        }).success(function(data, status, headers, config) {
            $scope.goodList = data.list;
        }).error(function(data, status, headers, config) {
            console.error('获取商品分类发生网络错误');
        });
    });
angular.bootstrap(document, ['app']);

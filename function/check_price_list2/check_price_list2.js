var app = angular.module("app", []);
app.controller("check_price_list2_controller", function($scope, $http) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; //返回参数值
    }
    //console.log(getUrlParam("ask_id"));
    if (getUrlParam("ask_id")) {
        $http({
            method: 'POST',
            url: basePath + '/implSeeinquiry'
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
    } else {
        $scope.errMsg = "获取ask_id异常，请重试！";
    }

});

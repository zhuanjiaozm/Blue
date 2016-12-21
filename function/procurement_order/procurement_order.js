var app = angular.module("app", []);
app.controller("procurement-order-controller", function($scope, $http) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; //返回参数值
    }
    //console.log(getUrlParam("ask_id"));
    if (getUrlParam("product_id")) {
        $http({
            method: 'POST',
            url: basePath + '/implPurchasedispatch1',
            data: {
                product_id: getUrlParam("product_id"),
                req_qty: getUrlParam("req_qty")
            }
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
        $('#my-confirm').find('.am-modal-bd').html("获取ask_id异常，请重试！");
        $('#my-confirm').modal();
        $scope.errMsg = "获取ask_id异常，请重试！";
    }
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: basePath + '/implPurchasesub',
            data: {
                user_id: $scope.req.user_id,
                product_id: getUrlParam("product_id"),
                req_qty: $scope.rep.req_qty,
                price_ref: $scope.req.price_ref,
                supplier_id: $scope.req.supplier_id,
                notice: $scope.req.notice,
                need_time: getUrlParam("need_time")
            }
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal();
            } else {
                $scope.errMsg = data.errMsg;
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal();
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
        });
    };
});

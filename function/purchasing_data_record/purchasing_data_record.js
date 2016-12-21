var app = angular.module("app", []);
app.controller("purchasing-data-record-controller", function($scope, $http) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; //返回参数值
    }
    //需求总量
    $scope.toReq = 0;
    //实际付款
    $scope.toInf = 0;
    //实际总量
    $scope.toAll = 0;

    $scope.updatePrice = function() {
        console.log($scope.req.price_buy);
        if ($scope.req.price_buy) {
            $scope.toInf = 0;
            $scope.toAll = 0;
            angular.forEach($scope.rep.prolist, function(item, index) {
                console.log(item.buy_qty);
                $scope.toAll = $scope.toAll + parseFloat(item.buy_qty || item.req_qty1);
                $scope.toInf = parseFloat($scope.toAll * $scope.req.price_buy).toFixed(2);
                console.log($scope.toAll);
            });
        }
    };
    if (getUrlParam("pch_task_id")) {
        $http({
            method: 'POST',
            url: basePath + '/implDataentry',
            data: {
                pch_task_id: getUrlParam("pch_task_id")
            }
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $scope.rep = data.list;
                $scope.req = {
                    price_buy: data.list.price_ref,
                    pay_way: "0"
                };
                angular.forEach(data.list.prolist, function(item, index) {
                    $scope.toReq = parseFloat(item.req_qty1).toFixed(2);
                    //实际应付
                    $scope.toReqying = parseFloat($scope.toReq * data.list.price_ref).toFixed(2);
                });
                $scope.updatePrice();
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
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: basePath + '/implPurchasingdatasub',
            data: {
                pch_task_id: getUrlParam("pch_task_id"),
                price_buy: $scope.req.price_buy,
                pay_total: $scope.toInf,
                pay_way: $scope.req.pay_way,
                prolist: $scope.rep.prolist
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
    };








$scope.selected=[];
    //退回
    var updateSelected = function(action, id, name) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) {
            $scope.selected.push(id);
            // scope.selectedTags.push(name);
        }
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            // scope.selectedTags.splice(idx, 1);
        }

    };

    $scope.updateSelection = function($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, checkbox.name);
    };

    $scope.isSelected = function(id) {
        return $scope.selected.indexOf(id) >= 0;
    };




    $scope.setback = function() {
        $http({
            method: 'POST',
            url: basePath + '/implbackreason'
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $scope.reasonList = data.list;
                $("#my-prompt").modal();
            } else {
                $('#my-confirm').find('.am-modal-bd').html("获取退服原因异常！");
                $('#my-confirm').modal();
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
        });
    };
    $scope.submitBack = function() {
        $http({
            method: 'POST',
            url: basePath + '/implorderback',
            data: {
                pch_task_id: getUrlParam("pch_task_id"),
                state: $scope.state,
                list: $scope.selected
            }
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
              $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
              $('#my-confirm').modal();
            } else {
                $('#my-confirm').find('.am-modal-bd').html("获取退服原因异常！");
                $('#my-confirm').modal();
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
        });
    };
});

var app = angular.module("app", []);
app.controller("procurement-detail-controller", function($scope, $http) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; //返回参数值
    }
    //console.log(getUrlParam("ask_id"));
    if (getUrlParam("pch_task_id")) {
        $http({
            method: 'POST',
            url: basePath + '/implorderdetail',
            data: {
                pch_task_id: getUrlParam("pch_task_id")
            }
        }).success(function(data, status, headers, config) {
            $scope.goodAllNumber = 0;
            if (data.statusCode === 200) {
                $scope.rep = data.list;
                angular.forEach(data.list.prolist, function(item) {
                    $scope.goodAllNumber = $scope.goodAllNumber + parseFloat(item.req_qty1);
                });
            } else {
                $scope.errMsg = data.errMsg;
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal();
            }
        }).error(function(data, status, headers, config) {
            $('#my-confirm').find('.am-modal-bd').html("发生网络错误");
            $('#my-confirm').modal();
        });
    } else {
        $('#my-confirm').find('.am-modal-bd').html("获取pch_task_id异常，请重试！");
        $('#my-confirm').modal();
        $scope.errMsg = "获取ask_id异常，请重试！";
    }
    $scope.updatePrice = function(price) {
        if (!isNaN(price)) {
            $scope.money = $scope.goodAllNumber * price;
        }
    };
    $scope.send = function(supplier_id) {
        if ($("#price").val()&&!isNaN($("#price").val())) {
            if (supplier_id) {
                $http({
                    method: 'POST',
                    url: basePath + '/implsendsup',
                    data: {
                        pch_task_id: getUrlParam("pch_task_id"),
                        price_buy: $("#price").val()
                    }
                }).success(function(data, status, headers, config) {
                    $scope.goodAllNumber = 0;
                    if (data.statusCode === 200) {
                      $('#my-confirm').find('.am-modal-bd').html('发送成功！');
                      $('#my-confirm').modal();
                    } else {
                        $scope.errMsg = data.errMsg;
                        $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                        $('#my-confirm').modal();
                    }
                }).error(function(data, status, headers, config) {
                    $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                    $('#my-confirm').modal();
                });
            } else {
                $('#my-confirm').find('.am-modal-bd').html("supplier_id获取错误");
                $('#my-confirm').modal();
            }
        }else{
          $('#my-confirm').find('.am-modal-bd').html("价格应该是数字");
          $('#my-confirm').modal();
        }
    };
    //退回
    $scope.selected = [];
    $scope.pch_task_id = 0;

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
        if (!getUrlParam("pch_task_id")) {
            $('#my-confirm').find('.am-modal-bd').html("pch_task_id获取异常！");
            $('#my-confirm').modal();
            return;
        }

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
                state: $scope.state || "",
                list: $scope.selected
            }
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $('#my-confirm').find('.am-modal-bd').html("退回成功");
                $("#my-prompt").modal();
            } else {
                $('#my-confirm').find('.am-modal-bd').html("获取退服原因异常！");
                $('#my-confirm').modal();
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
        });
    };
});

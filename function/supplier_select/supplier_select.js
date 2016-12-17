var app = angular.module("app", []);
app.factory('supplierSelectService', ['$http', '$q', function($http, $q) {
    return {
        getSupplier: function() {
            var defer = $q.defer(); //声明延后执行
            $http({
                    url: basePath + '/implsupplier',
                    method: 'POST'
                })
                .success(function(data, status, headers, config) {
                    if (data.statusCode === 200) {
                        defer.resolve(data.list);
                    } else {
                        $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                        $('#my-confirm').modal({});
                        defer.resolve([]);
                    }
                })
                .error(function(data, status, headers, config) {
                    defer.reject([]); //声明执行失败
                });
            return defer.promise;
        },
        submit: function(saveObj) {
            var defer = $q.defer(); //声明延后执行
            $http({
                    url: basePath + '/implimmediatelyinquiry',
                    method: 'POST',
                    data: saveObj

                })
                .success(function(data, status, headers, config) {
                    if (data.statusCode === 200) {
                        defer.resolve(data.list);
                    } else {
                        $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                        $('#my-confirm').modal({});
                        defer.resolve([]);
                    }
                })
                .error(function(data, status, headers, config) {
                    defer.reject([]); //声明执行失败
                });
            return defer.promise;
        },

    };
}]);
app.controller("supplier-select", function($scope, supplierSelectService) {
    $scope.supplierList = [];
    supplierSelectService.getSupplier().then(function(data) {
        if (data.length > 0) {
            $scope.supplierList = data;
        }
    }, function(data) {
        $scope.supplierList = [];
    });

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; //返回参数值
    }


    $scope.submit = function() {
        if (getUrlParam("ask_id")) {
            $scope.req.ask_id = getUrlParam("ask_id");
        } else {
            $('#my-confirm').find('.am-modal-bd').html("ask_id为空！");
            $('#my-confirm').modal({});
            return false;
        }

        function getSupplierID() { //jquery获取复选框值
            var chk_value = [];
            $('input[name="supplier"]:checked').each(function() {
                chk_value.push($(this).val());
            });
            return chk_value;
        }
        if (getSupplierID().length > 0) {
            $scope.req.supplier_id = getSupplierID();
        } else {
            $('#my-confirm').find('.am-modal-bd').html("请选择至少一个供货商");
            $('#my-confirm').modal({});
            return false;
        }
        checkPriceListTitleService.submit($scope.req).then(function(data) {
            if (data !== 0) {
                window.location.href = "../supplier_select/index.html?ask_id=" + data;
            }
        }, function(data) {

        });
    };
});

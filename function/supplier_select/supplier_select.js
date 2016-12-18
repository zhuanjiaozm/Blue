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
                    defer.resolve(data);
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
    $scope.selected = [];
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
        console.log($scope.selected);
    };

    $scope.updateSelection = function($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, checkbox.name);
    };

    $scope.isSelected = function(id) {
        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.submit = function() {
        if (!getUrlParam("ask_id")) {
            $('#my-confirm').find('.am-modal-bd').html("ask_id为空！");
            $('#my-confirm').modal({});
            return false;
        }

        if (!$scope.selected.length) {
            $('#my-confirm').find('.am-modal-bd').html("请选择至少一个供货商");
            $('#my-confirm').modal({});
            return false;
        }

        var reqData = {
            ask_id: getUrlParam("ask_id"),
            list: $scope.selected
        };
        supplierSelectService.submit(reqData).then(function(data) {

        }, function(data) {
            if (data.statusCode === 200) {
                $('#my-confirm').find('.am-modal-bd').html("成功");
                $('#my-confirm').modal({});
            } else {
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal({});
            }
        });
    };
});

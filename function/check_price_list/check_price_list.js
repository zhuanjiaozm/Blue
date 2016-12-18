var app = angular.module("app", []);
app.factory('checkPriceListTitleService', ['$http', '$q', function($http, $q) {
    return {
        getGoodList: function() {
            var defer = $q.defer(); //声明延后执行
            $http({
                    url: basePath + '/implgood',
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
                    url: basePath + '/implinquiry',
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
app.controller("check-price-list-title", function($scope, checkPriceListTitleService) {

    $scope.goodList = [];
    $scope.addGoods = function() {
        $scope.goodList.push({
            "product_id": 1,
            "product_name": null,
            "require_qty": null
        });
    };
    $scope.addGoods();

    checkPriceListTitleService.getGoodList().then(function(data) {
        if (data.length > 0) {
            $scope.goodSelectOptions = data;
        }
    }, function(data) {
        $scope.purchasingRequisitionList = [];
    });
    $scope.delete = function(good) {
        $('#deleteConfirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                $scope.goodList.splice($scope.goodList.indexOf(good), 1);
                $scope.$apply();
            }
        });
    };
    $scope.submit = function() {
        $scope.req.list = $scope.goodList;
        checkPriceListTitleService.submit($scope.req).then(function(data) {
            if (data.statusCode === 200) {
                window.location.href = "../home/index.html";
            }
        }, function(data) {

        });
    };
});

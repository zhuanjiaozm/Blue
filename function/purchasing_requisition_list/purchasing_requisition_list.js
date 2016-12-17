var app = angular.module('app', []);

app.factory('purchasingRequisitionListService', ['$http', '$q', function($http, $q) {
    return {
        get: function(pageno) {
            var defer = $q.defer(); //声明延后执行
            if (!pageno) {
                pageno = 1;
            }
            $http({
                    url: basePath + '/implCHKPurchasePlanList',
                    method: 'POST',
                    data: {
                        is_chked: 0,
                        pageno: pageno
                    }
                })
                .success(function(data, status, headers, config) {
                  console.log(data);
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
        delete: function(itemid) {
            var defer = $q.defer(); //声明延后执行
            if (!pageno) {
                pageno = 1;
            }
            $http({
                    url: basePath + '/implDraftList',
                    method: 'POST',
                    data: {
                        pageno: pageno
                    }
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
        }
    };
}]);
app.controller('purchasing_requisition_list-controller', function($scope, purchasingRequisitionListService) {
    $scope.isopen = true;
    // $http({
    //         url: basePath + '/implCHKPurchasePlanList',
    //         method: 'POST',
    //         data: {
    //             is_chked: 0
    //         }
    //     })
    //     .success(function(data, header, config, status) {
    //         console.log(data);
    //         $scope.purchasingRequisitionList = data.data;
    //         console.log("purchasingRequisitionList：", $scope.purchasingRequisitionList);
    //     })
    //     .error(function(data, header, config, status) {
    //         //处理响应失败
    //     });
    purchasingRequisitionListService.get(1)
        .then(function(data) {
            $scope.purchasingRequisitionList = data;
            console.log("purchasingRequisitionList：", $scope.purchasingRequisitionList);
        }, function(data) {
            $scope.purchasingRequisitionList = [];
        });
    $scope.delete = function(itemid) {
        purchasingRequisitionDraftService.delete(1)
            .then(function(data) {
                $scope.purchasingRequisitionList = data; //调用承诺接口resolove()
                console.log('purchasingRequisitionList:', data);
            }, function(data) {
                $scope.purchasingRequisitionList = [];
            });
    };





});
angular.bootstrap(document, ['app']);

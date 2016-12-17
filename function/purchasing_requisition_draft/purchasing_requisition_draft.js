var app = angular.module('app', []);
app.factory('purchasingRequisitionDraftService', ['$http', '$q', function($http, $q) {
    return {
        get: function(pageno) {
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
        },
        deleteDraft: function(purchasingRequisitionDraftID) {
            var defer = $q.defer(); //声明延后执行
            if (!purchasingRequisitionDraftID) {
                $('#my-confirm').find('.am-modal-bd').html("删除对象的ID为空无法删除！");
                $('#my-confirm').modal({});
                return false;
            }
            console.log("删除的ID是：", purchasingRequisitionDraftID);
            $http({
                    url: basePath + '/implPurchasePlanReturnBack',
                    method: 'POST',
                    data: {
                        pch_plan_id: purchasingRequisitionDraftID
                    }
                })
                .success(function(data, status, headers, config) {
                    console.log("删除结果：", data);
                    if (data.statusCode === 200) {
                        defer.resolve(data);
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

app.directive('infiniteScroll', [
    '$rootScope', '$window', '$timeout',
    function($rootScope, $window, $timeout) {
        return {
            link: function(scope, elem, attrs) {
                var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                $window = angular.element(elem);
                scrollDistance = 0;
                if (attrs.infiniteScrollDistance !== null) { //接收并返回触发加载更多的距离
                    scope.$watch(attrs.infiniteScrollDistance, function(value) {
                        return scrollDistance = parseInt(value, 10);
                    });
                }
                scrollEnabled = true;
                checkWhenEnabled = false;
                if (attrs.infiniteScrollDisabled !== null) {
                    scope.$watch(attrs.infiniteScrollDisabled, function(value) {
                        scrollEnabled = !value;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    });
                }
                handler = function() {
                    var elementBottom, remaining, shouldScroll, windowBottom;
                    windowBottom = $window.height() + $window.scrollTop();
                    elementBottom = elem.children().height();
                    remaining = elementBottom - windowBottom;
                    shouldScroll = remaining <= scrollDistance;
                    if (shouldScroll && scrollEnabled) { //达到可加载距离
                        console.log("$rootScope.$$phase", $rootScope.$$phase);
                        if ($rootScope.$$phase) {
                            return scope.$eval(attrs.infiniteScroll); //执行getmore操作
                        } else {
                            return scope.$apply(attrs.infiniteScroll); //执行getmore操作
                        }
                    } else if (shouldScroll) {
                        return checkWhenEnabled === true;
                    }
                };
                $window.on('scroll', handler); //监控scroll滑动则运行handler函数
                scope.$on('$destroy', function() { //离开页面则关闭scroll与handler的绑定
                    return $window.off('scroll', handler);
                });
            }
        };
    }
]);
app.controller('purchasing-requisition-draft-controller', function($scope, purchasingRequisitionDraftService) {
    //初始化页码
    $scope.pageno = 1;


    //能够继续查询
    $scope.canAdd = true;

    function initList(pageno) {
        purchasingRequisitionDraftService.get(pageno)
            .then(function(data) {
                $scope.purchasingRequisitionList = data;
                if ($scope.purchasingRequisitionList.length === 0) {
                    return $scope.canAdd === false;
                }
                if (!$scope.canAdd) {
                    console.console.error("不能继续查询");
                }
            }, function(data) {
                $scope.purchasingRequisitionList = [];
            });
    }

    if ($scope.canAdd) {
        initList($scope.pageno);
    }

    //加载更多
    $scope.getMore = function() {
        initList(++$scope.pageno);
    };

    $scope.deleteDraft = function(purchasingRequisitionDraftID) {
        var delObjID = purchasingRequisitionDraftID;
        $('#my-confirm').find('.am-modal-bd').html("确定要删除?");
        $('#my-confirm').modal({
            onConfirm: function(options) {
                console.log("delObjID:", delObjID);
                purchasingRequisitionDraftService.deleteDraft(delObjID)
                    .then(function(data) {
                        console.log("data.statusCode:", data.statusCode);
                        if (data.statusCode === 200) {
                            location.reload();
                        }
                    }, function(data) {
                        $scope.purchasingRequisitionList = [];
                    });
            },
        });
    };
});






angular.bootstrap(document, ['app']);

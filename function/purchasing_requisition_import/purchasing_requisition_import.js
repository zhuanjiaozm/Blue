var app = angular.module("app", []);
app.controller("purchasing-requisition-import-controller", function($scope, $http) {
    $(function() {
        $('#doc-my-tabs').tabs();
    });


    function tab1() {
        $http({
            method: 'POST',
            url: basePath + '/impltemplate'
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $scope.rep1 = data.list;
            } else {
                $scope.errMsg = data.errMsg;
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal();
                return false;
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
            $('#my-confirm').find('.am-modal-bd').html("发生网络错误");
            $('#my-confirm').modal();
            return false;
        });
    }

    function tab2() {
        $http({
            method: 'POST',
            url: basePath + '/implCopyPurchaseorder'
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {
                $scope.rep2 = data.list;
            } else {
                $scope.errMsg = data.errMsg;
                $('#my-confirm').find('.am-modal-bd').html(data.errMsg);
                $('#my-confirm').modal();
                return false;
            }
        }).error(function(data, status, headers, config) {
            console.error('发生网络错误');
            $('#my-confirm').find('.am-modal-bd').html("发生网络错误");
            $('#my-confirm').modal();
            return false;
        });
    }
    $scope.tab1 = tab1();
    $scope.tab2 = tab2();
    $scope.import = function(tempId) {
        alert(tempId);
    };
    $scope.delete = function(tempId) {
        alert(tempId);
    };
		console.log($scope.delete);
});

var app = angular.module("app", []);
app.controller("procurement-list-controller", function($scope, $http) {
    $http({
        method: 'POST',
        url: basePath + '/implcaigoulist'
    }).success(function(data, status, headers, config) {
        if (data.statusCode === 200) {
            $scope.rep = data.list;
        } else {
            $scope.errMsg = data.errMsg;
            $('#result').find('.am-modal-bd').html(data.errMsg);
            $('#result').modal();
        }
    }).error(function(data, status, headers, config) {
        console.error('发生网络错误');
    });
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




    $scope.setback = function(pch_task_id) {
        if (!pch_task_id) {
            $('#my-confirm').find('.am-modal-bd').html("pch_task_id获取异常！");
            $('#my-confirm').modal();
            return;
        } else {
            $scope.pch_task_id = pch_task_id;
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
                pch_task_id: $scope.pch_task_id,
                state: $scope.state||"",
                list: $scope.selected
            }
        }).success(function(data, status, headers, config) {
            if (data.statusCode === 200) {

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

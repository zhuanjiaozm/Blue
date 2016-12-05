var app = angular.module('app', []);
app.controller('purchasing-requisition-controller', function($scope, $http) {
    //默认可以点击添加商品按钮
    $scope.goodList = [];
    $scope.goodList.push({
        id: null,
        good: {
            product_code: null,
            product_name: ''
        },
        accout: null,
        remark: ''
    });
    $scope.addGoods = function() {
        $scope.goodList.unshift({
            id: null,
            good: {
                id: null,
                name: ''
            },
            accout: null,
            remark: ''

        });
    };
    $scope.deleteGoods = function(goods) {

        $('#my-confirm').modal({
            onConfirm: function(options) {
                $scope.goodList.splice($scope.goodList.indexOf(goods), 1);
                $scope.$apply($scope);
                //console.info("商品列表:", $scope.goodList);
            }
        });
    };


    var itemSelectedForSearchGoodsIndex = 0;
    //选择商品  开始
    $scope.selectGoods = function(index) {
        itemSelectedForSearchGoods = index;
        //商品列表  页面加载完成后从服务端获取
        $http({
            method: 'POST',
            url: basePath + '/implProductTypeList',
            data: {}
        }).success(function(data, status, headers, config) {
            $scope.categoryList = data.list;
            //  console.log(data);
            $scope.recentSearch = data.hotlist;
            $scope.allCategory = [];
            angular.forEach(data.list, function(data, index, array) {
                if (data.productlist.length > 0) {
                    angular.forEach(data.productlist, function(obj, index, array) {
                        $scope.allCategory.push(obj);
                    });
                }
            });
            //  console.log("所有商品列表：", $scope.allCategory);
        }).error(function(data, status, headers, config) {
            console.error('获取商品分类发生网络错误');
        });
        $("#select-goods").modal();
    };

    $scope.searchGoodsByKeyWord = function(keyword) {
        //console.log("搜索商品关键字：", keyword);
        $scope.searchResult = [];
        if (keyword.trim().length < 1) return;
        angular.forEach($scope.allCategory, function(data, index, array) {
            if ((data.product_name.indexOf(keyword.trim()) > -1) || (data.product_code.indexOf(keyword.trim()) > -1)) {
                $scope.searchResult.push(data);
            }
        });
    };
    $scope.closeModal = function() {
        $("#select-goods").modal('close');
    };

    //点击搜索结果关闭弹出框
    $scope.selectedGoods = function(selectGodos) {
        $scope.goodList[itemSelectedForSearchGoods].good = selectGodos;
        console.log("选择的商品是：", selectGodos);
        //保存商品名称完成后不可编辑当前商品

        $("#select-goods").modal('close');
    };
    //清空最近搜索过的商品
    $scope.clearSearchRecently = function() {
        $scope.recentSearch = [];
    };
    //设置商品分类
    $scope.setCategory = function(liIndex) {
        $scope.currentIndex = liIndex;
    };

    //选择商品  结束

    //获取可选项目列表
    $http({
        method: 'POST',
        url: basePath + '/implProjectListByUser',
        data: {}
    }).success(function(data, status, headers, config) {
        $scope.projectList = data.list;
        //$('#project-select').selected();
        console.log('获取可选项目列表', data.list);
    }).error(function(data, status, headers, config) {
        console.error('获取可选项目列表发生网络错误');
    });




    //保存采购申请
    $scope.save = function() {
        angular.forEach($scope.goodList, function(data, index, array) {
            $scope.goodList[index].product_id = data.good.product_id;
            $scope.goodList[index].good = null;
        });
        $http({
                method: 'POST',
                url: basePath + '/implSubmitPuarchsePlan',
                data: {
                    "list": $scope.goodList,
                    "form": $scope.theForm
                }
            })
            .success(function(data, status, headers, config) {

            })
            .error(function(data, status, headers, config) {
                console.error('获取商品分类发生网络错误');
            });
    };
});
angular.bootstrap(document, ['app']);

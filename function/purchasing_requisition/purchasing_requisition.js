var app = angular.module('app', []);
app.controller('purchasing-requisition-controller', function($scope, $http) {
	//默认可以点击添加商品按钮
	$scope.added = true;

	//商品列表  页面加载完成后从服务端获取
	$http({
			url: '../../virtual_data/purchasing_requisition/goodList.json',
			method: 'GET'
		})
		.success(function(data, header, config, status) {
			$scope.goodList = data.context;
		})
		.error(function(data, header, config, status) {
			//处理响应失败
		});

	$scope.addGoods = function() {
		//设置添加商品按钮为不可点击
		$scope.added = false;

		//如果商品列表为空则新建
		if(!$scope.goodList) {
			$scope.goodList = [];
		}
		$scope.goodList.unshift({
			id: null,
			good: {
				id: null,
				name: ''
			},
			accout: null,
			remark: '',
			editEnable: true
		});
	}
	$scope.deleteGoods = function(goods) {
		if(!goods.id) {
			//当删除新增商品后即可以点击添加商品按钮
			$scope.added = true;
		}
		$('#my-confirm').modal({
			onConfirm: function(options) {
				$scope.goodList.splice($scope.goodList.indexOf(goods), 1);
				$scope.$apply($scope);
				//console.info("商品列表:", $scope.goodList);
			}
		});
	}
	$scope.editGoods = function(goods) {
		goods.editEnable = !goods.editEnable;
		if(!$scope.added) {
			$scope.added = true;
		}
	}

	var itemSelectedForSearchGoodsIndex = 0;
	//选择商品  开始
	$scope.selectGoods = function(index) {
		itemSelectedForSearchGoods = index;
		console.log("序号:", index);
		//查询选择商品时的基本信息
		$http({
				url: '../../virtual_data/purchasing_requisition/select_goods.json',
				method: 'GET'
			})
			.success(function(data, header, config, status) {
				$scope.categoryList = data.category.categoryList;
				console.log("$scope.categoryList:",$scope.categoryList);
				$scope.recentSearch = data.quickSerch.recentSerch;
			})
			.error(function(data, header, config, status) {
				//处理响应失败
			});
		$("#select-goods").modal();
	}

	//点击搜索结果关闭弹出框
	$scope.selectedGoods = function(selectGodos) {
		//		console.log("序号:", itemSelectedForSearchGoods);
		//		console.log("商品：",selectGodos);
		$scope.goodList[itemSelectedForSearchGoods].good = selectGodos;
		//保存商品名称完成后不可编辑当前商品
		$scope.goodList[itemSelectedForSearchGoods].editEnable = false;
		$("#select-goods").modal('close');
	}
	//清空最近搜索过的商品
	$scope.clearSearchRecently=function(){
		$scope.recentSearch=[];
	}
	//设置商品分类
	$scope.setCategory=function(liIndex){
		$scope.currentIndex=liIndex;
	}
	
	
	//选择商品  结束

});
angular.bootstrap(document, ['app']);
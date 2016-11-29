#1.文件结构说明  

   *  ./bower_components/    基于bower的公共库存放位置  

   *  ./common/    公共静态资源文件夹  

       ./common/css/    可重复利用的样式文件
       ./common/js/     可重复利用的JavaScript脚本文件  

   *  ./function/    用于存放业务功能的板块，其子目录以功能名称命名，该功能对应的业务代码均存放在该子文件夹下  

   *  ./img    用于存放项目的静态图片，其子目录为不同功能对应的文件夹  

   *  ./bower.json   前端依赖说明  

   *  ./README    项目前端说明  

   *  ./virtual_data/    用于前端测试时的json文件存放位置，其子目录以对应功能的名称命名

#2.项目发布
    将./*文件上传至web服务器的发布目录下，对应到本文件路径即可 例如登陆即是：www.fengziqiao.xyz/function/login/index.html

#3.页面和文件
> ##3.1登录  
 *  [登录](http://www.fengziqiao.xyz/function/login/index.html)(http://www.fengziqiao.xyz/function/login/index.html)  
 *  [个人信息](http://www.fengziqiao.xyz/function/profile/index.html)(http://www.fengziqiao.xyz/function/profile/index.html)  

>##3.2首页UI
*  [云ERP管理系统](http://www.fengziqiao.xyz/function/home/index.html)(http://www.fengziqiao.xyz/function/home/index.html)  

>##3.3申购与审核
*  [申购单(待审核)](http://www.fengziqiao.xyz/function/purchasing_requisition_list/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition_list/index.html)  
*  [采购清单](http://www.fengziqiao.xyz/function/purchasing_requisition_list_detail/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition_list_detail/index.html)  
*  [采购申请](http://www.fengziqiao.xyz/function/purchasing_requisition/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition/index.html)
*  [批量导入](http://www.fengziqiao.xyz/function/purchasing_requisition_import/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition_import/index.html)  
*  [选择商品](http://www.fengziqiao.xyz/function/purchasing_requisition/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition/index.html在编辑状态下点击商品名称即可弹出)
*  [申购单(草稿)](http://www.fengziqiao.xyz/function/purchasing_requisition/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition/index.html)  

>##3.4询价+报价
*  [询价单](http://www.fengziqiao.xyz/function/check_price_list/index.html)(http://www.fengziqiao.xyz/function/check_price_list/index.html)  
*  [选择供货商](http://www.fengziqiao.xyz/function/supplier_select/index.html)(http://www.fengziqiao.xyz/function/supplier_select/index.html)  
*  [询价单2](http://www.fengziqiao.xyz/function/check_price_list2/index.html)(http://www.fengziqiao.xyz/function/check_price_list2/index.html)
*  [报价](http://www.fengziqiao.xyz/function/quotation_of_prices/index.html)(http://www.fengziqiao.xyz/function/quotation_of_prices/index.html)

>##3.5采购分派
*  [采购汇总](http://www.fengziqiao.xyz/function/show_all_procurement/index.html)(http://www.fengziqiao.xyz/function/show_all_procurement/index.html)
*  [采购队列](http://www.fengziqiao.xyz/function/procurement_queue/index.html)(http://www.fengziqiao.xyz/function/procurement_queue/index.html)
*  [采购派单](http://www.fengziqiao.xyz/function/procurement_order/index.html)(http://www.fengziqiao.xyz/function/procurement_order/index.html)
*  [采购任务列表](http://www.fengziqiao.xyz/function/procurement_task_list/index.html)(http://www.fengziqiao.xyz/function/procurement_task_list/index.html)

>##3.6采购  
*  [采购清单](http://www.fengziqiao.xyz/function/purchasing_requisition_list/index.html)(http://www.fengziqiao.xyz/function/purchasing_requisition_list/index.html)  
*  [采购数据录入]()()  
*  [采购明细]()()  

>##3.7派送入库
*  [派送单](http://www.fengziqiao.xyz/function/post_order/index.html)(http://www.fengziqiao.xyz/function/post_order/index.html)  
*  [收货入库](http://www.fengziqiao.xyz/function/put_in_storage/index.html)(http://www.fengziqiao.xyz/function/put_in_storage/index.html)  

>##3.8出库领用
*  [领用登记](http://www.fengziqiao.xyz/function/registration_requisitioned_items/index.html)(http://www.fengziqiao.xyz/function/registration_requisitioned_items/index.html)

>##3.9有功能按钮无版面
*  编辑个人信息(由个人信息页面右上角进入)
*  追加（由采购清单右上角进入）
*  供货商位置定位（采购清单）

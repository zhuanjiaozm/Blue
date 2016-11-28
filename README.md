README
#1.文件结构说明
   ./bower_components/    基于bower的公共库存放位置
   ./common/    公共静态资源文件夹
       ./common/css/    可重复利用的样式文件
       ./common/js/     可重复利用的JavaScript脚本文件
   ./function/    用于存放业务功能的板块，其子目录以功能名称命名，该功能对应的业务代码均存放在该子文件夹下
   ./img    用于存放项目的静态图片，其子目录为不同功能对应的文件夹
   ./bower.json   前端依赖说明
   ./README    项目前端说明
   ./virtual_data/    用于前端测试时的json文件存放位置，其子目录以对应功能的名称命名

#2.项目发布
    将./*文件上传至web服务器的发布目录下，对应到本文件路径即可 例如登陆即是：www.xxxx.com/function/login/index.html

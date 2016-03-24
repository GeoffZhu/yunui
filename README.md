模仿网易云音乐UI的前端UI框架
===========
#组件
##button
button分为三种类型  default(白色) primary(红色) download(蓝色)
``` e.g. 
<button type="button" class="btn btn-default">default</button>
```
##button-group
按钮组会呈现出圆角，类似云音乐的关注未关注
``` e.g.
<button type="button" class="btn btn-primary current">左边</button>
<button type="button" class="btn btn-primary">中间</button>
<button type="button" class="btn btn-primary">右边</button>
```
## Tips插件
依赖jquery 1.10以上。<br>
调用方法,引入js目录下的tips.js. <br>
@param  type(0：警告类，1：成功类）  text（提示用的文本）
``` 
$.tips({
    type: 1,
    text: '表单信息对啦'
});
```
## Validate插件
依赖jquery 1.10以上。<br>
调用方法,引入js目录下的validate.js,为input增加data-validate字段<br>
@param  require(是否必填）  label（提示用的文本）  reg（用哪种正则来检验）<br>
@return {flag: false || ture, msg:'错误信息'}
``` 
<input type="text" class="form-control" placeholder="" data-validate='{"required":true,"label":"姓名","type":"text","reg":"name"}'>
//传入根form节点，插件会检测其带有data-validate的input
var result = $.validate('.form-group');
```
任务记录：
-----
title－bar nav部分<br>
footer部分<br>
输入框，要加css3动画，点击时候表单label隐藏，表单大中小三个尺寸<br>
内容列表，横向＋竖向<br>
本周优化<br>

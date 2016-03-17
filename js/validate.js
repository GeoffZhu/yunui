/**
 * @author geoff
 * @description Validate
 * @date 2016年3月17日 19:04:40
 */

define(function(require, exports, module) {

    var Validate = function (formNode,options) {
        this.formNode = formNode;
        this.options = $.extend({}, Validate.DEFAULTS, options);
    }

    Validate.DEFAULTS = {
        'label': '表单信息',    //提示名称
        'reg': 'text',          // 正则类型 text email url phone-number ... 对应common中的regExp
        'required': false,      //
        'type': 'input'         // text radio org(组织架构选择) 
    }

    Validate.prototype.init = function () {
        var _this = this;
        var els = $(_this.formNode).find("[data-validate]");

        var result = _this.check(els)

        return result;
        
    }


    Validate.prototype.check = function (els){
        var result;
        //Why用for不用each，each里面，return有坑，无法跳出init方法
        for(var i=0; i<els.length; i++){
            var itemOption = JSON.parse(els.eq(i).attr('data-validate'));
                itemOption = $.extend({},Validate.options,itemOption);

            switch(itemOption.type){
                case "text":
                  result = this.checkTextItem(els.eq(i) , itemOption);
                  break;
                case "org":
                  result = this.checkOrgItem(els.eq(i) , itemOption);
                  break;
                case "radio":
                  result = this.checkRadioItem(els.eq(i) , itemOption);
                  break;
                default:
                    console.error('未定义的校验type');
            }

            if(result.flag == false){
                return result;
            }
        }

        return {
            flag: true
        }; 
    }
    Validate.prototype.checkTextItem = function(item, itemOption){
        var regExp = Validate.prototype.regExp;
        var value = item.val();

        if(regExp[itemOption.reg] == undefined){
            console.error('请在regExp中添加'+itemOption.label+'的正则规则')
        }

        //必填项校验
        if(itemOption.required){
            if(value == "" || value.length == 0 || value == undefined){
                return {
                    msg: itemOption.label + "不能为空",
                    flag: false
                }
            }else if(!regExp[itemOption.reg].test(value)){
                return {
                    msg: "请输入正确的" + itemOption.label,
                    flag: false
                }
            }

        //选填项校验
        }else{
            if(value.length != "0" && value != "" && value != undefined){
                if(!regExp[itemOption.reg].test(value)){
                    return {
                        msg: "请输入正确的" + itemOption.label,
                        flag: false
                    }
                }
            }
        }

        return {
            flag: true
        }
    }
    Validate.prototype.checkOrgItem = function(item, itemOption){
        //如果org中有内容，就通过
        var value = item.html();

        if(itemOption.required){
            if(value == "" || value.length == 0 || value == undefined){
                return {
                    msg: itemOption.label + "不能为空",
                    flag: false
                }
            }
        }

        return {
            flag: true
        }
    }
    Validate.prototype.checkRadioItem = function(item, itemOption){
        //如果org中有内容，就通过
        var radios = item.find('input[type=radio]:checked');

        if(itemOption.required){
            if(radios.length == 0){
                return {
                    msg: itemOption.label + "不能为空",
                    flag: false
                }
            }
        }

        return {
            flag: true
        }
    }

    //校验规则
    Validate.prototype.regExp = require('./regExp-config').config;

    //========================
    // 插件入口
    function Plugin(formNode,options) {
        var result = new Validate(formNode,options).init();
        return result;
    }    

    function validate( formNode, options) {
        if(!window.jQuery){
            console.log("需要引入jquery");
        }else{
            return Plugin(formNode,options);
        }
    }


    window.validate = function(formNode,options){
        return validate(formNode,options);
    }
    
});

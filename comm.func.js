/**
 * 功能描述：  方法集xxx
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiuYuTao on 2015/3/5.
 */

comm.setCenter = function(obj){
    var positionFromTop = ($(window).height()-obj.height())/2;
    var positionFromLeft = ($(window).width()-obj.width())/2;
    var top  = $(window).scrollTop() + positionFromTop;
    var left = $(window).scrollLeft() + positionFromLeft;
    obj.css({
        top: top + 'px',
        left: left + 'px'
    });
};

comm.browser = {
    mozilla : /firefox/.test(navigator.userAgent.toLowerCase()),
    webkit : /webkit/.test(navigator.userAgent.toLowerCase()),
    opera : /opera/.test(navigator.userAgent.toLowerCase()),
    msie : /msie/.test(navigator.userAgent.toLowerCase()),
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

comm.setImgSize = function (maxHeight,maxWidth,objImg) {
        var img = new Image();
        img.src = objImg.src;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth ===0 && maxHeight===0){
            Ratio = 1;
        }else if (maxWidth===0){//
            if (hRatio<1) Ratio = hRatio;
        }else if (maxHeight===0){
            if (wRatio<1) Ratio = wRatio;
        }else if (wRatio<1 || hRatio<1){
            Ratio = (wRatio<=hRatio?wRatio:hRatio);
        }
        if (Ratio<1){
            w = w * Ratio;
            h = h * Ratio;
        }
        objImg.height = h;
        objImg.width = w;
};
/**
 * 将超出长度的字符串加。。。
 * @param str
 * @param len
 * @returns {string}
 */
comm.getStrLen = function(str,len){
    var strlen= 0,s = "";
    for(var i = 0;i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if(strlen >= len){
                return s.substring(0,s.length-1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if(strlen >= len){
                return s.substring(0,s.length-2) + "...";
            }
        }
    }
    return s;
};
/*
* 截取字符长度
* */
comm.getStrByteLen=function(str,len){
    var newStr='',newLength=0;
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i)>128){
            newLength+=2;
        }else{
            newLength++;
        }
        if(newLength<=len){
            newStr=newStr.concat(str[i]);
        }else{
            break;
        }
    }
    if(newLength>len){
        newStr = newStr+"..."
    }
    return newStr;
};
comm.revCutstr=function (str, len) {
    function newCut(str, len){
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length-1;
        for (var i =  str_len; i >=0; i--) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                //str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    }
    var str=newCut(str, len);
    str_cut1 = new String();
    for(var i=str.length;i>=0;i--){
        a = str.charAt(i);
        str_cut1 = str_cut1.concat(a);
    }
    return str_cut1;

};
/*
*获取字符串长度
*/
comm.getByteLen = function(val){
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) !== null) // 全角
            len += 2;
        else
            len += 1;
    }
    return len;
};

// 取消冒泡
comm.stopBubble = function (event) {
    event && event.stopPropagation ? event.stopPropagation() : window.event.cancelBubble = !0
};

/**
 * 用户类型
 * @param account
 * @returns {string}
 */
comm.checkAccountType = function(account) {
    var type = "";
    if(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(account)){
        type = "mobile";
    }
    if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(account)){
        type = "email";
    }
    return type;
};


/**
 *
 * @returns {{}}
 */
comm.getpara = function ()//获取参数的函数
{
    var url=document.URL;
    var param={};
    var str,item;
    if(url.lastIndexOf("?")>0)
    {
        str=url.substring(url.lastIndexOf("?")+1,url.length);
        var arr=str.split("&");
        for(var i=0;i<arr.length;i++)
        {
            item =  arr[i].split("=");
            param[item[0]] = decodeURI(item[1]);
        }
    }
    return param;
};

//判断空对象
comm.isEmptyObject = function(obj){
    for(var n in obj){return false}
    return true;
};

comm.forceHttp= function(){
	if(location.protocol === "https:")
		location.href= "http://"+location.hostname+location.pathname+location.search;
};

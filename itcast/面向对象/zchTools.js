/**
 * Created by Administrator on 2017/2/23.
 */
var T = function() {};
T.prototype = {
    $id: function(id){
        return document.getElementById(id);
    },
    ltrim: function(str) {
        //删除左边的空格
        return str.replace(/(^\s*)/g,'');
    },
    rtrim: function(str) {
        //删除右边的空格
        return str.replace(/(\s*$)/g,'');
    },
    trim: function(str) {
        //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    RE: {
        number: /^\d+$/,
        mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
        tel: /^(\d{3,4}-)\d{7,8}$/,
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        mobile_email: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        mobile_email_uname: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,
        code: /^[0-9]{6}$/,
        qq: /^[0-9]{5,12}$/,
        pwd: /^\S{6,16}$/,
        uri: /^[a-zA-z]+:\/\/[^\s]*$/,
        url: /^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,
        date: /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,
        time: /sdf/,
        datetime: /asd/,
        uname: /^[a-zA-Z]\w{5,15}$/,
        nonempty: /\S/,
        size: /\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i
    },
    // artTemplate语法
    bindTemplate: function(templateId, data){
      var html = template(templateId, data);
      return html;
    }
}
// 对象的实例化
var TT = new T();

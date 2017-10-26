/**
 * 服务器地址
 * */
var NTERFACE_URL = 'http://192.168.1.97:8080/';
//var NTERFACE_URL = 'http://localhost:8080';
// Ajax 头部;
function ajax(url, param, type) {
  var url = NTERFACE_URL+url;
  return $.ajax({
    url: url,
    data: param || {},
    type: type || 'GET'
  });
}
// 公用方法；
function ajax_Interface_Service(url, param, type) {
  return ajax(url, param, type).then(function(resp) {
    // 成功回调
   return resp;
  }, function(err) {
    // 失败回调
    console.log(err.status); // 打印状态码
  });
}

// 调用
//
//ajax_Interface_Service(url,param,type).done(function(resp) {
//// 当result为true的回调
//}).fail(function(err) {
//  // 当result为false的回调
//});

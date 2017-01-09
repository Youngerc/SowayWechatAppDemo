var config = require('../config/wechat');
var url = require('url');
var https = require('https');
var http = require('../utils/http');
var getOpenIdUrl =function (accessCode){

   var returnUrl = {
        protocol:config.protocol,
        hostname:config.server,
        pathname: config.path
    };  
    returnUrl.query ={};
    returnUrl.query.appid=config.appId;
    returnUrl.query.secret=config.appKey;
    returnUrl.query.js_code = accessCode;
    returnUrl.query.grant_type=config.grant_tyes.openId;
     return url.format(returnUrl);
}
module.exports.getOpenId=function(accessCode,callback){
    var url = getOpenIdUrl(accessCode);
    http.sget(url,callback);
}

var config = require('../config/sms');
var url = require('url');
var http = require('../utils/http');
var request = require('request');
module.exports.send = function(mobile,sms,callback){
     var URL = {
        protocol:config.protocol,
        hostname:config.url,
        pathname: config.path,
        headers:{
            "Content-Type":"application/json"
        },
        method:'POST'
    };
    URL.query={
            account:config.user,
            pswd:config.pwd,
            needstatus:false,
            mobile:mobile,
            msg:sms            
        };
    http.sget(
        url.format(URL), 
        function(data){
            callback(data);
        }

    )

}

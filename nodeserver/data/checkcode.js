var sms = require('../utils/sms');
var session = require('../utils/redis');

exports.sendCheckCode = function(mobile,callback){
    var checkCode = Math.random().toString().substring(2,6);
    var msg = '您好，您的验证码是['+checkCode+'](五分钟内有效).';
    sms.send ([mobile],msg,function(){
        session.save_timeout(mobile,checkCode,5*60,function(){
           callback();
        });
    });
}
    
exports.checkCheckCode = function(mobile,checkcode,callback){
    session.get(mobile,function(data){
        if(data ==checkcode){
            callback(true);
        }else{
            callback(false);
        }
    })
} 

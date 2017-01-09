var redis = require('../utils/redis');
var uuid = require('../utils/uuid');
exports.save=function(timeout,obj,callback){
    var sessionId = uuid.create();

    redis.save_timeout_obj(sessionId,obj,timeout,function(){
        callback(sessionId);
    })

}
var returncallback = function(data,callback){
     if(data == undefined){
            callback({
                errorcode:'80001',
                errormsg:'cannot find session key'
            });
        }else{
            callback({
                errorcode:'0',
                errormsg:'success',
                data:data
            });
        }
}
exports.get=function(key,callback){
    redis.get_obj(key,function(data){
       returncallback(data,callback);
    });
}
exports.get_with_fresh = function(key,timeout,callback){
    redis.get_and_update(key,timeout,function(data){
        returncallback(data,callback);

    });
}
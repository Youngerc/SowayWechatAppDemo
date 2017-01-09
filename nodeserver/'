/**
 * user data 
 * 
 * 1. check the session 
 * 2. if session timeout or no session 
 *      -> login ,use accessCode to get user info and store
 * 3. save session
 */

var wechat = require('../utils/wechat');
var user = require('../model/user');
var redis = require('../utils/redis');
var session = require('../model/session');


exports.getUserInfo = function(accessCode,userInfo,callback,err){
    //得到openid
    wechat.getOpenId(accessCode,function(data){
       // console.log('get wechat open id ');
        //console.log(data);
    if(data.errorcode){
            res.send(data);
        }else{
            session.save(data.expires_in,data,function(sessionid){
            
            user.getWechatUserByOpenId(data.openid,function(userinfo){
                if(userinfo == undefined){
                    user.creatWechatUser(userInfo,data.openid,function(result){
                        callback(sessionid);
                    });
                }else{
                    callback(sessionid);
                }
            });
            });

        }

    });
}
exports.getSysUser =function(sessionid,callback,err){
    session.get(sessionid,function(sessionData){
        if(sessionData==undefined){
                callback(undefined);
        }else{
                user.getSysUserByWechatId(data.openid,function(sysUser){
                    
                if(sysUser == undefined){
                    callback(undefined);
                }else{
                    callback(sysUser);
                }
            });
        }
    });
};
    

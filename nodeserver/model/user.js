var db = require('../utils/db');
/**
 * get user by wechatId
 * id - wechatId
 * callback - the callback function
 * 
 * by GeYunfei
 * Dec 9 th,2016
 */
exports.getWechatUserByOpenId =function(id,callback){
    db.get('select * from `sys_wechatuser` where `openId`=?',[id],function(row){
        if(row.length>0){
            callback(row[0]);
        }else{
            callback(undefined);
        }
    })
}

/**
 * Create User 
 * user the use info
 * openid openid;
 * 
 * by GeYunfei
 * Dec 9th,2016
 */
exports.creatWechatUser= function(user,openid,callback){
    var newUser = user;
    newUser.openid = openid;
    db.insert('sys_wechatuser',newUser,callback);

}
/**
 * get sysuser by wechatId
 * id-wechatid
 * callback - the calback function
 *
 * by Ge Yunfei
 * Dec 12st,2016
 */
exports.getSysUserByOpenId = function(id,callback){
    db.get('select * from `sys_user` where `wechat_id`=?',[id],function(row){
        if(row.length>0){
            callback(row[0]);
        }else{
            callback(undefined);
        }
    });
}
/*
 * get sysuser by mobile 
 * mobile mobile
 * callback - the callback function
 *
 * bby GeYunfei
 * Dec 12st,2016
 */
exports.getSysUserByMobile = function(mobile,callback){
    db.get('select * from `sys_user` where `user_mobile`=?',[mobile],function(row){
        if(row.length>0){
            callback(row[0]);
        }else{
            callback(undefined);
        }
    });
};

/*
 * bind user to wechat 
 * userid---userid,
 * wechatid -- wechatid 
 *
 * by GeYunfei
 * Dec 12st,2016
 */
 exports.bindWechatUser = function(user,wechatid,callback){
    


 };

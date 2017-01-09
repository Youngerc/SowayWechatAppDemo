var express = require('express');
var router = express.Router();
var userdata=require('../data/userdata');

/**
 * 校验用户
 */
exports.checkuser = function(req,res,next){
    //console.log(req.body);
    if(req.body.accessCode ==undefined)
    {
        res.send({code:'80001',msg:'no accessCode input'});
        return;
    }
    if(req.body.userInfo ==undefined)
    {
        res.send({code:'80002',msg:'no userInfo input'});
        return;
    }
    var accessCode = req.body.accessCode;
    var userInfo = req.body.userInfo;
    userdata.getUserInfo(accessCode,userInfo,function(sessionId){
        res.send({code:'0',msg:'success',token:sessionId});
    }); 
};
/**
 * checkIsReg
 */
exports.checkreg = function(req,res,next){
    if(req.body.tokenid ==undefined)
    {
        res.send({code:'80003',msg:'no accesstoken input'});
        return;
    }
    var token = req.body.token;
    userdata.getSysUserByWechatId(token,function(sysuser){
        if(sysuser ==undefined){
         
            res.send({code:'0',msg:'success',reg:false});
        }else{
            res.send({code:'0',msg:'success',reg:true,user:sysuser});
        }
       }

    );
}

/**
 * checkUserMobile
 */
exports.checkmobile = function(req,res,next){
    if(req.body.mobile ==undefined)
    {
        res.send({code:'80004',msg:'mo mobile param input'});
    }
    var mobile = req.body.mobile;
    userdata.getSysUserByMobile(mobile,function(sysuser){
        res.send({code:'0',msg:'success',user:sysuser});
    }
    );

}
/** 
 * sendcheckcode 
 */
exports.sendcheckcode = function(req,res,next){
    if(req.body.mobile ==undefined){
        res.send({code:'80004',msg:'no mobile param input'});
        return;
    }
    var mobile = req.body.mobile;
    userdata.sendCheckCode(mobile,function(sendresult){
        res.send(sendresult);
    });
}

/**
 * bindmobile
 */
exports.bindmobile = function(req,res,next){
    if(req.body.mobile == undefined){
        res.send({code:'80004',msg:'no mobile param input'});
        return;
    }
    if(req.body.checkcode ==undefined){
        res.send({code:'80005',msg:'no check code param input'});
        return;
    }
    var moble = req.body.mobile;
    userdata.getSysUserByMoile(mobile,function(bindresult){
        res.send(bindresult);
    });
}

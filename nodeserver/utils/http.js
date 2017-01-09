var http=require('http');
var https=require('https');
module.exports.get = function(url,callback){
        http.get(url,function(res){
                var resdata = '';
                res.on('data',function(chunk){
                        resdata+= chunk;
                        });
                res.on('end',function(){
                        if(callback!=undefined)
                        {
                             var obj = JSON.parse(resdata);
                                callback(obj);
                        }
                });
        });
};

module.exports.sget = function(url,callback){
        https.get(url,function(res){
                var resdata = '';
                res.on('data',function(chunk){
                        resdata+= chunk;
                        });
                res.on('end',function(){
                        if(callback!=undefined)
                        {
                             try{
                             var obj = JSON.parse(resdata);
                                callback(obj);
                             }catch(e){
                                     callback(resdata);
                             }
                        }
                });
        });
};

module.exports.spost = function(url,data,callback){
        var req1 = https.request(url,
         function (res) {
        res.setEncoding('utf8');
        var alldata = '';
        res.on('data', function (chunk) {
            alldata = alldata + chunk;
        });
        res.on('end', function () {
            try {
                 
                
                var senddata = JSON.parse(alldata);
                callback(senddata);
            } catch (a) {
              //  console.log(method + ' ' + a);
              console.log('error');
                console.log(alldata);
            }
     
        });
    });
    req1.on('error', function (e) {
    });
    req1.write(JSON.stringify(data));
    req1.end();

}

module.exports.post = function(url,data,callback){
        console.log('post');
        var req1 = http.request(url,
         function (res) {
        res.setEncoding('utf8');
        var alldata = '';
        console.log('ok');
        res.on('data', function (chunk) {
            alldata = alldata + chunk;
        });
        res.on('end', function () {
                console.log('end');
            try {
                 
                
                var senddata = JSON.parse(alldata);
                callback(senddata);
            } catch (a) {
                //console.log(method + ' ' + a);
                console.log(alldata);
            }
     
        });
    });
    req1.on('error', function (e) {
    });
    req1.write(JSON.stringify(data));
    req1.end();

}

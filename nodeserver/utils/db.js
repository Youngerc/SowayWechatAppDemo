var mysql = require('mysql');
var config = require('../config/mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit
});
/**
 * selec
 */
exports.get = function (sql,filtervalue, callback) {
    pool.getConnection(function (error, con) {
        if (error)
            throw error;
        con.query(sql, filtervalue,function (error, rows) {
             con.release();
            callback(rows);
           

        });
    });
};
/**
 * insert json obj
 * tablename--the table to insert values
 * item -- the row to insert 
 * 
 * By GeYunfei
 * Dec 12st,2016
 */
exports.insert = function(tablename,item,callback){
    var query = 'INSERT `'+tablename+'` SET ';
    var values =[];
    for(var p in item){
         if(typeof(item[p])=='function'
            || p == 'id'){
            continue;
        }else{
            query = query + p +' = ?,'
            values.push(item[p].toString());
        }
    }
    query = query.substring(0,query.length-1); 
    console.log(query);
    console.log(values);
    pool.getConnection(function(error,con){
        if(error)
            throw error;
        con.query(query,values,function(error,result){
            if(error)
                throw error;
            else
                callback({
                    status:0,
                    rowid:result.insertid
                });
        })
    })
}


/**
 * update jsonobj
 * tablename -- the table to be updated 
 * item -- the row to update ,require id property
 *
 * By GeYunfei
 * Dec 12st,2016
 */   
exports.update =function(tablename,item,callback){
    var query = 'UPDATE `'+tablename+'` SET ';
    var values =[];
    for(var p in item){
         if(typeof(item[p])=='function'
            || p == 'id'){
            continue;
        }else{
            query = query + p +' = ?,'
            values.push(item[p].toString());
        }
    }
    query = query.substring(0,query.length-1); 
    query = query + 'where `id`=?';
    values.push(item.id);
    //console.log(query);
    //console.log(values);
    pool.getConnection(function(error,con){
        if(error)
            throw error;
        con.query(query,values,function(error,result){
            if(error)
                throw error;
            else
                callback({
                    status:0,
                    rowid:result.insertid
                });
        })
    })
}

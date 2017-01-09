var db = require("../utils/db");
var uuid = require("../utils/uuid");
console.log(uuid.create());
db.get('select * from `sys_user`',function(data){
    console.log(data);
});

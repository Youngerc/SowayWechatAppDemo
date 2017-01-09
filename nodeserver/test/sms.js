var sms =require('../utils/sms');
sms.send(
    '13521510781',
    'hello world',
    function(data){
        console.log(data);
    }
)

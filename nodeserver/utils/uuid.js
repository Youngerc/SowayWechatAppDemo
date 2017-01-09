/**

guid模块提供生成唯一值ID，用于token生成等。如果加上objID或者用户唯一标识更好
@module guid */
module.exports = {
    create: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g,
            function (c) {
                var r = Math.random() * 16 | 0,
			  v = c == 'x' ? r : (r & 0x3 | 0x8);
		  return v.toString(16);
            }).toUpperCase();
    }
};
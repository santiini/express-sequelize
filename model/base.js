/**
 * model;
 */
// 日期处理类库;
const moment = require('moment');

const BaseModel = {
    inc: moment().valueOf(),
    // id生成;
    uid: function() {
        var new_id = 0;
        // 毫秒时间戳：
        new_id += moment().valueOf();

        // 自增;
        this.inc += 1;
        new_id += this.inc;

        return new_id;
    },

    timestamp: function() {

    }
};

module.exports = BaseModel;
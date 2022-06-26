var moment = require('moment');
var m_danhsach = require('../model/m_todolist');

class Index {
    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = new Index;
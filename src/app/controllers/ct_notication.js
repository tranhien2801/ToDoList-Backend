var m_notication = require('../model/m_notication');
const Index = require('./ct_index');

class Notication {

    get_notications(req, res) {
        m_notication.getNotications(req.user)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    make_notications(req, res) {
        var list_id = req.query.list_id
        var content = req.query.content
        m_notication.makeNotication(req.user, list_id, content)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

}

module.exports = new Notication;
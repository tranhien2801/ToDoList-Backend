const m_local = require('../model/m_local');
const m_local_user = require('../model/m_local_user');
const Index = require('./ct_index');

class Data {

    getAll(req, res) {
        m_local.getAll()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    getById(req, res) {
        var list_id = req.query.list_id
        m_local.getById(list_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    useList(req, res) {
        var list_id = req.query.list_id
        m_local.UseList(list_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "su dungj khong thanh cong"}))
    }

    cancelList(req, res) {
        var list_id = req.query.list_id
        m_local.CancelList(list_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Huy khong thanh cong"}))
    }

    delete(req,res) {
        var list_id = req.query.list_id
        m_local.Delete(list_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Xoa khong thanh cong"}))
    }

    download(req, res) {
        var image = req.body.image.replaceAll('\\', '\\\\')
        var name = req.body.name
        var description = req.body.description
        if (Index.isJson(req.body.steps)) {
            var steps = req.body.steps
            m_local.Download(steps, image, name, description)
            .then(s => res.json({status: s}))
        } else {
            res.status(403).json({status: 'dữ liệu steps không phải json'})
        } 
    }

    getProgress(req, res) {
        m_local.getProfress()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    setProgress(req,res) {
        var list_id = req.body.list_id
        var progress = req.body.progress
        m_local.setProfress(progress, list_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "thiết lập tiến độ không thành công"}))
    }

    setUser(req, res) {
        console.log("pip")
        console.log(req.body)
        var name = req.body.name;
        var password = req.body.password;
        var image = req.body.image == null?"": req.body.image.replaceAll('\\', '\\\\')
        var email = req.body.email;

        m_local_user.setUser(email, password, image, name)
        .then(s => res.json({status: s}))
    }

    getUser(req, res) {
        m_local_user.getUser()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    deleteUser(req, res) {
        m_local_user.deleteUser()
        .then(s =>  res.json({status: s}))
        .catch(err => res.status(403).json({loi: "Không xóa được tài khoản"})) 
    }
}

module.exports = new Data;
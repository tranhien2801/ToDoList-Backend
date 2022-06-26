var m_search = require('../model/m_search');
const Index = require('./ct_index');

class Data {

    /**
     * tìm kiếm
     * get | 127.0.0.1:3000/search/
     * req:
     * key: từ khóa cần tìm
     * 
     * res: danh sách bản ghi
     * [
     * {"list_id": id của bản ghi,
     * "name":tên,
     * "description": mô tả,
     * "date": ngày tạo,
     * "image": hình ảnh (có thể null),
     * "view": lượt xem,
     * "download": lượt tải,
     * "author": tên tác giả}
     * ]
     */
    search(req, res) {
        var key = req.query.key
        m_search.search(key)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    /**
     * Tìm kiếm theo thể loại
     * get| 127.0.0.1:3000/search/bytype
     * 
     * req: type_id: thể loại muốn tra cứu
     */
    searchByType(req, res) {
        var type = req.query.type_id
        m_search.searchByType(type)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    searchByAuthor(req, res) {
        console.log("Ahihi")
        var user_id = req.query.account_id
        if (user_id == "-1")
            user_id = req.user
        m_search.searchByAuthor(req.user)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    getInfo(req, res) {
        m_search.getInfo(req.user)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    /**
     * lấy danh sách thể loại từ server
     * get | 127.0.0.1:3000/search/type
     * 
     * res: danh sách
     * [
     * {"type_id": id thể loại,
     * "name": tên thể loại,
     * "description":mô tả}
     * ]
     */
    getTypes(req, res) {
        m_search.getTypes()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    /**
     * Lấy tất cả các bài viết
     * get | 127.0.0.1:3000/search/getall
     */
    getAll(req, res) {
        m_search.getAll()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    /**
     * Lấy thông tin về một thể loại
     * get | 127.0.0.1:3000/search/gettype
     * req:
     * type_id: số thứ tự của thể loại cần tìm
     */
    getType(req, res) {
        m_search.getType(req.query.type_id)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }
}

module.exports = new Data;
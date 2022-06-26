var m_todolist = require('../model/m_todolist'); //sử dụng csdl model chung tất cả các bảng (mỗi bảng 1 file js trong model)
var m_notication = require('../model/m_notication');
const Index = require('./ct_index');

class Data {

    /**
     * tạo ra bản ghi công việc
     * post | 127.0.0.1:3000/list/
     * req:data dữ liệu dạng json
     * res:status: thành công/ thất bại
     */
    set_list(req, res) {
        var name = req.body.name;
        var description = req.body.description
        var image = req.file.path.replaceAll('\\', '\\\\')
        var type_id = req.body.type_id
        if (Index.isJson(req.body.steps)) {
            var steps = req.body.steps
            m_todolist.set_list(name, description, image, req.user, type_id, steps)
            .then(s => res.json({status: s}))
        } else {
            res.status(403).json({status: 'dữ liệu steps không phải json'})
        } 
    }

    /**
     * Lấy bải ghi công việc
     * get | 127.0.0.1:3000/list/get_list/
     * req
        "id": id của bản ghi cần lấy
     * 
     * res:
     *  "list_id": id của bản ghi,
        "name": tên của bản ghi,
        "description": "mô tả,
        "date": ngày tạo,
        "image": đường link dẫn đến hình ảnh (nếu có),
        "view": số lượt xem,
        "download": số lượt tải về,
        "author_id": id của tác giả,
        "type_id": id thể loại của bản ghi
     */
    get_list(req, res) {
        m_todolist.increaseView(req.query.id)
        .then(s => m_todolist.getList(req.query.id))
        .then(s => res.json(s))
    }

    /**
     * Lấy thông tin về tác giả của một bản ghi
     * get | 127.0.0.1:3000/list/get_author/
     * req:
     * author_id: id của tác giả
     * 
     * res:
     *  "account_id": id của tác giả,
        "name": tên,
        "register": ngày đăng ký,
        "role": quyền,
        "image": hình ảnh đại diện (nếu có),
        "password": mật khẩu (đã được mã hóa) (thật ra ẩn cái này đi cho bảo mật nhưng khi sửa sẽ rườm rà lên thôi),
        "email": email của tác giả (thật ra ẩn cái này đi cho bảo mật nhưng khi sửa sẽ rườm rà lên thôi)
     * 
     */
    get_author(req, res) {
        m_todolist.getAuthor(req.query.author_id)
        .then(s => res.json(s))
    }

    /**
     * Lấy bình luận của một bản ghi
     * get | 127.0.0.1:3000/get_comment/
     * req:
     * list_id: id của bản ghi
     * 
     * res: danh sách các comment
     * [tất cả thông tin trong bảng comment -..-]
     * 
     */
    get_comments(req, res) {
        m_todolist.getComments(req.query.list_id)
        .then(s => res.json(s))
    }

    /**
     * Lấy đánh giá trung bình của một bản ghi
     * get | 127.0.0.1:3000/list/get_vote/
     * req:
     * list_id: id của bản ghi
     * 
     * res: 
     * avg: số điểm trung bình (null nếu chưa có đánh giá nào)
     */
    get_vote(req, res) {
        m_todolist.getVote(req.query.list_id)
        .then(s => res.json(s))
    }

    /**
     * Tạo bình luận cho một bản ghi
     * post | 127.0.0.1:3000/list/make_comment/
     * 
     * req:
     * comment: bình luận của người dùng
     * list_ld: bản ghi đang bình luận
     * 
     * res:
     * result: thành công/ thất bại
     */
    make_comment(req, res) {
        var comment = req.body.comment
        var list_id = req.body.list_id
        var user = req.user

        m_todolist.makeComment(comment, list_id, user)
        .then(s => res.json(s))
    }

    /**
     * Tạo đánh giá cho một bản ghi
     * post | 127.0.0.1:3000/list/make_vote/
     * 
     * req:
     * score: điểm của người dùng đánh giá
     * list_id: bản ghi đang đánh giá
     * 
     * res:
     * result: thành công/ thất bại
     */
    make_vote(req, res) {
        var list_id = req.query.list_id
        var user = req.user
        
        m_todolist.makeVote("1", list_id, user)
        .then(s => res.json(s))
    }

    check_vote(req, res) {
        var list_id = req.query.list_id
        var user = req.user

        m_todolist.checkVote(list_id, user)
        .then(s => res.json(s))
    }

    delete_vote(req, res) {
        var list_id = req.query.list_id
        var user = req.user

        m_todolist.deleteVote(list_id, user)
        .then(s => res.json(s))
    }

    /**
     * Tăng lượt tải
     * post | 127.0.0.1:3000/list/download/
     * req
     * list_id: bản ghi muốn tăng lượt tải
     * 
     * res
     * result thất bại/ thành công
     */
    increase_download(req, res) {
        m_todolist.increaseDownload(req.body.list_id)
        .then(s => res.json(s))
    }

    getSelfInfo(req, res) {
        m_todolist.getInfo(req.user)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    changeAva(req, res) {
        var user_id = req.user;
        var image = req.file.path.replaceAll('\\', '\\\\')
        m_todolist.changeAva(user_id, image)
        .then(s => res.json({status: s}))
    }

    changeUserName(req, res) {
        var user_id = req.user;
        var name = req.body.name;
        m_todolist.changeUserName(user_id, name)
        .then(s => res.json({status: s}))
    }

    deleteList(req, res) {
        console.log(req.query)
        var list_id = req.query.list_id;
        m_todolist.deleteList(list_id)
        .then(s => res.json({status: s}))
    }
}

module.exports = new Data;
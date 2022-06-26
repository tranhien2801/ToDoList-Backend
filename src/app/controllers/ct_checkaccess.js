const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const m_dangnhap = require('../model/m_login');

class Token {
    /**
     * kiểm tra truy cập của khách, nếu hợp lệ thì cho dữ liệu đi tiếp
     */
    accessCheck(req, res, next) {
        if (!req.session.token) {
            console.log('pip')
            return res.redirect('/');
        }
        var token = req.session.token
        if(token){ //nếu token tồn tại
            jwt.verify(token, SECRET_KEY, function(err, user){ // kiểm tra token và giải mã token với khóa 'bí mật quân sự'
                if(err) return res.status(400).json({loi: 'Token không hợp lệ'})

                m_dangnhap.findPassRoleID(user.email).then(data => { //tìm xem tài khoản (được giải mã từ token) có tồn tại trong csdl ko
                    if (data == '') {
                        res.status(403).json({status: 'ID của bạn không tồn tại'});
                    } else { // gán thêm quyền và id của client cho req để sử dụng ở các controller phía sau
                        req.role = user.role
                        req.user = user.id
                        next()
                    }
                })
            })
        } else {
            return res.status(401).json("Bạn không đủ thẩm quyền")
        }
    }
}

module.exports = new Token;
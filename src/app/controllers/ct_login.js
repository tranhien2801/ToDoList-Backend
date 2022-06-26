const m_login = require('../model/m_login');
const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Index = require('./ct_index');

class Login{

    /**
     * Trả về form đăng nhập
     * get | 127.0.0.1:3000/
     */
    index(req, res) {
        delete req.session.token
        res.render('w_login');
    }

    /**
     * Trả về form đăng ký
     * get | 127.0.0.1:3000/register
     */
    register(req, res) {
        res.render('w_register');
    }

    /**
     * Đăng ký
     * post | 127.0.0.1:3000/register
     * req.email: tên đăng nhập
     * req.name: tên gọi
     * req.password: mật khẩu
     * 
     * res.status: phản hồi thành công/ thất bại
     */
    p_register(req, res) {
        console.log(req.body)
        var email = req.body.email;
        var name = req.body.name;
        // var image = req.file.path.replaceAll('\\', '\\\\')
        var password = req.body.password; //lấy id và pass từ body của req (POST)

        if (name == '' || password == ''|| email == '') {
            return res.status(400).json({status: "Yêu cầu không hợp lệ"});
        } else {
            bcrypt.hash(password, 10, function(err, hashedPass) { //tạo một dãy mã hóa mật khẩu nhận dược
                if (err) {
                    res.status(400).json({status: 'Mật khẩu không hợp lệ'});
                }
                m_login.setPassword(name, email, hashedPass)
                .then(result => res.status(200).json({status: 'Thành công'}))
            })
        }
    }

    /**
     * Đăng nhập
     * post | 127.0.0.1:3000/
     * req.email: tên đăng nhập
     * req.password: mật khẩu
     * 
     * cookie
     * res.status: thông báo thành công/ thất bại
     * res.email: email vừa đăng nhập
     * res.id: số id của user
     */
    p_login(req, res) {
        console.log(req.body)
        var email = req.body.email;
        var password = req.body.password; //nhận id và pass từ client

        if (email == "") return res.status(400).json({status: "Email không hợp lệ"});
        m_login.findPassRoleID(email).then(data => { // tìm mật khẩu của id
            bcrypt.compare(password, (data[0].password).toString()) // so sánh mật khẩu nhận được với mk của id trong csdl (đã được mã hóa)
            .then(rs =>{
                if(!rs) return res.status(400).json({status: 'Mật khẩu sai'})

                var role = data[0].role;
                var id = data[0].account_id;
                var image = data[0].image;
                var name = data[0].name;
                var token = jwt.sign({email: email, id: id, role:role}, SECRET_KEY, {expiresIn: 60*60*4}) //mã hóa id và quyền thành token hop le trong 4 giờ với chìa là 'bimatquansu'
                req.session.token = token
                res.json({
                    status: 'thanhcong', //trả về trạng thái, id của tài khoản và token cho client
                    email: email,
                    id: id,
                    image: image,
                    name: name
                })
            })
        }).catch(err =>{
            res.status(404).json({status: err})
        })
    }
}

module.exports = new Login;
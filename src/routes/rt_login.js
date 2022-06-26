const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const loginController = require('../app/controllers/ct_login');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({ storage: storage })

router.get('/register', loginController.register);
router.post('/register', upload.single('image'), loginController.p_register);
router.get('/', loginController.index); 
router.post('/', loginController.p_login);



module.exports = router;
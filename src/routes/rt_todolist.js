const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const DataController = require('../app/controllers/ct_todolist');
const K = require('../app/controllers/ct_checkaccess'); // kiểm tra truy cập
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
   
var upload = multer({ storage: storage })

router.get('/get_list', DataController.get_list);
router.get('/get_author', DataController.get_author);
router.get('/get_comment', DataController.get_comments);
router.get('/get_vote', DataController.get_vote);
router.get('/check_vote', DataController.check_vote);
router.get('/delete_vote', DataController.delete_vote);
router.get('/delete_list', DataController.deleteList);
router.get('/make_vote', DataController.make_vote);
router.post('/make_comment', DataController.make_comment);
router.post('/set_list', upload.single('image'), DataController.set_list);
router.post('/download', DataController.increase_download);
router.get('/selfinfo', DataController.getSelfInfo)
router.post('/changeava', upload.single('image'), DataController.changeAva)
router.post('/changename', DataController.changeUserName)

module.exports = router;
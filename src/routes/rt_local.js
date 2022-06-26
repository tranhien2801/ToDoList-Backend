const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/ct_local');

router.get('/cancel', Controller.cancelList);
router.post('/download', Controller.download);
router.get('/getall', Controller.getAll);
router.get('/getbyid', Controller.getById);
router.get('/uselist', Controller.useList);
router.get('/delete', Controller.delete);
router.get('/getprogress', Controller.getProgress);
router.get('/getuser', Controller.getUser);
router.get('/deleteuser', Controller.deleteUser); 
router.post('/setprogress', Controller.setProgress);
router.post('/setuser', Controller.setUser);

module.exports = router;
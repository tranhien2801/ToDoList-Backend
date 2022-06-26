const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/ct_search');
const K = require('../app/controllers/ct_checkaccess'); // kiểm tra truy cập
const { route } = require('express/lib/application');

router.get('/type', Controller.getTypes);
router.get('/bytype', Controller.searchByType);
router.get('/byauthor', Controller.searchByAuthor);
router.get('/getall', Controller.getAll);
router.get('/gettype', Controller.getType);
router.get('/getinfo', Controller.getInfo);
router.get('/', Controller.search);

module.exports = router;
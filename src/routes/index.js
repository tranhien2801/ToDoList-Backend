const login = require('./rt_login');
const todo_list = require('./rt_todolist');
const search = require('./r_search');
const K = require('../app/controllers/ct_checkaccess'); // kiểm tra truy cập

// Định tuyến
function route(app) {
    app.use('/list',K.accessCheck, todo_list);
    app.use('/search', search);  
    app.use('/', login);
}

module.exports = route;

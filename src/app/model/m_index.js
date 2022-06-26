const mysql = require('mysql');

class Chung {
    //hàm khởi tạo kết nối
    constructor() {
		this.connection = mysql.createPool({
			connectionLimit: 100,
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'todolist2', //tên csdl
            multipleStatements: true,
			debug: false,
            port: 3306 
		});
	}
}

module.exports = Chung;
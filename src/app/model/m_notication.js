const Chung = require('./m_index');

class Notication extends Chung {

    getNotications(user_id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM notications WHERE receiver_id = ${user_id}`, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    makeNotication(user_id, list_id, content) {
        var query = `INSERT INTO 'notications'('content', 'receiver_id', 'list_id') \
                        VALUES ('${content}','${user_id}','${list_id}')`
       
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("Thong bao thanh cong");
            });
        });
    }
}

module.exports = new Notication();
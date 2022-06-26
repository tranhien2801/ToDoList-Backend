const Chung = require('./m_index');

class Local extends Chung {

    getUser() {
        console.log("getall")
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM local_account", (err, rows) => {
                if (err) return reject(err);
                if (rows.length == 0) resolve(JSON.stringify("chua dang nhap")); 
                else resolve(JSON.stringify(rows[0])); 
            });
        });
    }

    setUser(email, password, image, name) {
        console.log("cap nhat tai khoan")
        var query = "DELETE FROM local_account WHERE 1; " +
                    `INSERT INTO local_account (email, password, image, name) VALUES ('${email}','${password}','${image}','${name}');`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve("Thay doi tai khoan thanh cong");
            });
        });
    }

    deleteUser() {
        console.log("xoa tai khoan")
        return new Promise((resolve, reject) => {
            this.connection.query( "DELETE FROM local_account WHERE 1", (err, rows) => {
                if (err) return reject(err);
                resolve("Xoa tai khoan thanh cong");
            });
        });
    }
}

module.exports = new Local();
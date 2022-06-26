const Chung = require('./m_index');

class Local extends Chung {

    getAll() {
        console.log("getall")
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM local_list", (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    getById(list_id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM local_list WHERE list_id = '${list_id}'`, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    UseList(list_id) {
        var query = `UPDATE local_list l SET l.on = 1 WHERE list_id = ${list_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    CancelList(list_id) {
        var query = `UPDATE local_list l SET l.on = 0 WHERE list_id = ${list_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    Delete(list_id) {
        var query = `DELETE FROM local_list WHERE list_id = ${list_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve({status:"tai ve thanh cong"});
            });
        });
    }

    Download(steps, image, name, description) {
        var query = `INSERT INTO local_list (steps, image, name, description) \
                                VALUES ('${steps}','${image}','${name}','${description}')`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("tai ve thanh cong");
            });
        });
    }

    getProfress() {
        console.log("lay tien do") 
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM local_list l WHERE l.on = '1'", (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    setProfress(progress, list_id) {
        var query = `UPDATE local_list SET progress = '${progress}' WHERE list_id = ${list_id}`
        console.log(query) 
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve({status:"thay tien do thanh cong"});
            });
        });
    }
}

module.exports = new Local();
const Chung = require('./m_index');

class Search extends Chung {

    getTypes() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM types", (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    getType(type_id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM types WHERE type_id = '${type_id}'`, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    search(key) {
        var query = "SELECT list_id, name, description, date, image, view, download, steps, type_id, "+
                "(SELECT COUNT(*) FROM votes v WHERE v.list_id = t.list_id) l" +
                ` FROM todolists t WHERE name LIKE '%${key}%';`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    searchByType(type_id) {
        var query = "SELECT list_id, name, description, date, image, view, download, steps, "+
                "(SELECT name FROM accounts a WHERE a.account_id = t.author_id) author " +
                `FROM todolists t WHERE type_id = '${type_id}';`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    getAll() {
        var query = `SELECT * FROM todolists`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    searchByAuthor(author_id) {
        var query = "SELECT list_id, name, description, date, image, view, download, steps "+
        `FROM todolists t WHERE author_id = '${author_id}';`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    getInfo(user_id) {
        var query = `SELECT SUM(view) views, COUNT(*) count, SUM(download) download FROM todolists WHERE author_id = ${user_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows[0])); 
            });
        });
    }
}

module.exports = new Search();
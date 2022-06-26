const { query } = require('express');
const Chung = require('./m_index');

class DanhSach extends Chung {

    set_list(name, description, image, author_id, type_id, steps) {
        var query = "INSERT INTO todolists (name, description, image, author_id, type_id, steps) " +
        `VALUES ('${name}', '${description}', '${image}', '${author_id}', '${type_id}', '${steps}');`
       
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("Them danh sach thanh cong");
            });
        });
    }

    getList(id) {
        var query = `SELECT * FROM todolists WHERE list_id = '${id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getAuthor(author_id) {
        var query = `SELECT * FROM accounts WHERE account_id = '${author_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getComments(list_id) {
        var query = `SELECT * FROM comments WHERE list_id = '${list_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getVote(list_id) {
        var query = `SELECT SUM(score) avg FROM votes WHERE list_id = '${list_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    makeComment(comment, list_id, user) {
        var query = `INSERT INTO comments(comment, account_id, list_id) VALUES ('${comment}','${user}','${list_id}')`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("binh luan thanh cong");
            });
        });
    }

    makeVote(score, list_id, user) {
        var query = `INSERT INTO votes(score, account_id, list_id) VALUES ('${score}','${user}','${list_id}')`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("danh gia thanh cong");
            });
        });
    }

    checkVote(list_id, user) {
        var query = `SELECT * FROM votes WHERE list_id = ${list_id} and account_id = ${user};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    deleteVote(list_id, user) {
        var query = `DELETE FROM votes WHERE list_id = ${list_id} and account_id = ${user};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("xoa danh gia thanh cong");
            });
        });
    }

    deleteList(list_id) {
        var query = `DELETE FROM todolists WHERE list_id = ${list_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("xoa ban ghi thanh cong");
            });
        });
    }

    increaseView(list_id) {
        var query = `UPDATE todolists SET view = view + 1 WHERE list_id = ${list_id};`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("thanh cong");
            });
        });
    }

    increaseDownload(list_id) {
        var query = `UPDATE todolists SET download = download + 1 WHERE list_id = ${list_id};`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("tang luot tai thanh cong");
            });
        });
    }

    
    getInfo(user_id) {
        var query = `SELECT a.name, a.image, COUNT(t.list_id) as list, SUM(t.view) as view, SUM(t.download) as download, COUNT(v.vote_id) as votes FROM accounts a
                    LEFT JOIN todolists t ON t.author_id = a.account_id
                    LEFT JOIN votes v ON v.list_id = t.list_id
                    WHERE a.account_id = ${user_id};`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) {
                    console.log(err);
                    return reject("lỗi truy xuất email");
                }
                if (!rows.length) return reject('Tài khoản chưa được cấp');
                return resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    changeAva(user_id, image) {
        var query = `UPDATE accounts SET image='${image}' WHERE account_id = '${user_id}'`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("Doi ava thanh cong");
            });
        });
    }

    changeUserName(user_id, name) {
        var query = `UPDATE accounts SET name='${name}' WHERE account_id = '${user_id}'`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("Doi ten thanh cong");
            });
        });
    }
}

module.exports = new DanhSach();
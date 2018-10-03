var mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        password: 'root',
        database: 'news_portal'
    });
}
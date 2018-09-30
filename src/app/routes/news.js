var dbConnection = require('../../config/dbConnection');

module.exports = app => {
    connection = dbConnection();
    app.get('/', (req, res) => {
        connection.query('SELECT * FROM news', (err, result) => {
            //console.log(result);
            res.render('news/news', {
                news: result
            })
        });
    });
}
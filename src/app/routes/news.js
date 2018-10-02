const dbConnection = require('../../config/dbConnection');

module.exports = app => {

  const connection = dbConnection();

  app.delete('/', (req, res) => {
    connection.query('DELETE FROM news WHERE id=1', (err, result) => {
        res.redirect('/');
      });
    });
  

  app.get('/', (req, res) => {
    connection.query('SELECT * FROM news', (err, result) => {
      res.render('news/news', {
        news: result
      });
    });
  });

  app.post('/', (req, res) => {
    const { title, news } = req.body;
    connection.query('INSERT INTO news SET ?',
      {
        title,
        news
      }
    , (err, result) => {
      res.redirect('/');
    });
  });

};
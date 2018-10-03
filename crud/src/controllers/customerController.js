const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from customer', (err, customers) => {
            if (err){
                next(err);
            }
            res.render('customers', {
                data: customers
            })
        });
    });
};

controller.save = (req, res) => {
    var data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into customer set ?', [data], (err, customer) => {
            res.redirect('/');
        });
    })
}

module.exports = controller;
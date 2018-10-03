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

module.exports = controller;
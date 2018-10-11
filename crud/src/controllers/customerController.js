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

controller.edit = (req, res) => {
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer where id = ?', [id], (err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
}

controller.update = (req, res) => {
    var id = req.params.id;
    var newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controller.delete = (req, res) => {
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('delete from customer where id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    })
}

module.exports = controller;
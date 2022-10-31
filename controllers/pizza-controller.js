const { Pizza } = require('../models');

const pizzaController = {
    //methods go here
    //-GET-----
    //get all pizzas
    getAllPizza(req,res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get pizza by id
    getPizzaById({params},res) {
        Pizza.findOne({_id: params._id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No Pizza Found'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
};
//              l
//LEFT OFF HERE V
//This style of writing object methods is another new feature of JavaScript. We can now write them in one of two ways, as shown in the following example:
module.exports = pizzaController;
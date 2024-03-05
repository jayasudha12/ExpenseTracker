// we use mangoose for defining schema
const mongoose = require('mongoose')
const expensetrackerschema = new mongoose.Schema({
    Amount : {
        type : Number
    },
    Category : {
        type : String
    },
    Date : {
        type : String
    }
})
// we have to create the model to access the data like fetch .It should be in capital letter
/**
 * 1 st argument , 2 nd argument -> collection name, schema name
 */
const Expense = mongoose.model('expensedetails',expensetrackerschema)
// exporting..
module.exports = {Expense}
// we use mangoose for defining schema
/**
 * to create the new schema we have to create the model and export it using the syntax
 *                    syntax : module.exports =  {expense,user}
 * we 
 */
// const mongoose = require('mongoose')
// const expensetrackerschema = new mongoose.Schema({
//     Amount : {
//         type : Number
//         // required : true
//     },
//     Category : {
//         type : String
//     },
//     Date : {
//         type : String
//     }
// })
// // we have to create the model to access the data like fetch .It should be in capital letter
// /**
//  * 1 st argument , 2 nd argument -> collection name, schema name
//  */
// const Expense = mongoose.model('expensedetails',expensetrackerschema)
// // exporting..
// module.exports = {Expense}
const mongoose = require('mongoose')
const expenseTrackerSchema =  mongoose.Schema({
      amount : {
        type : Number
        //required : true
      },
      category : {
        type : String
      },
      date : {
        type : String
      }
})

const Expense = mongoose.model('expensedetails',expenseTrackerSchema) //1st parameter - collection name 2nd parameter - schema name

//Exporting
module.exports = {Expense}
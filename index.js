const cors = require('cors')
const express1 = require('express')
const mongoose =  require('mongoose')
const bodyparser = require('body-parser')
const {Expense}= require('./Schema.js')
const app = express1()
app.use(bodyparser.json())
app.use(cors())
/**
 * cors ->
 * it is a open source network -> we can access it from anywhere
 * it will give all the response to the origin from different area
 * request sent -> check origin -> but cors will be accessing
 * Middleware ->
 * predefined middleware -> body-parser,cors-parser
 * post -> it will be used to handle just before the middleware
 * request handle ->[ middleware ]-> response
 */
/**
 * Intermediate between the client side and database
 */

/**Expense tracker functionality
 * adding a new expense/income :/add_expense ->post
 * editing existing entries :/edit_expense -> put/patch
 * displaying existing expenses :/get expense->get
 * deleting expenses :/delete the expense->delete
 * 
 * Budget reporting
 * validating new  user
 * creating new user
 */

/**
 * expense(-)/income(+)
 * category
 * amount
 * date
 * 
 */
/**
 * we have to develop the schema as readability is  very important
 * npm i express body-parser
 */
//const x = process.env.PORTto make available in all platform
// if we deploy we will get cors error so to avoid we use cors

const port = process.env.PORT || 8000
async function connectToDB(){
    try{
    await mongoose.connect(`mongodb+srv://jayasudhat2022cse:2J47zICqpicv4CXg@cluster05.olvpemp.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster05`)
    console.log("Database Connecting......")
    app.listen(port,function(){
        console.log(`listening on ${port}.....`)
    })
}//easy debugging and the reason for the error
catch(error){
    console.log(error)
    console.log("Couldn't Establish connection")
}
}
connectToDB()
// app.post('/add-expense',async function(request,response){
//     // console.log(request.body)
//     // response.status(200).json({
//     //     "Status" : "Inserting the data...."
//     // })
//     try{
//     await Expense.create({
//         "Amount" : request.body.Amount,
//         "Category" :request.body.Category ,
//         "Date" : request.body.Date
//     })//it is asynchronous
//     response.status(201).json({
//         "status" : "successfully inserted into db",
//         "Message" : "New Entry created"
//     })
// }
// catch(error){
//     response.status(500).json({
//      'message' :'Error occurred could not  be inserted',
//      'status'  : 'failure',
//      'error'   : error
// })
// }
// })
// app.get('/get-expense',async function(request,response){
//     try{
//     const expenses = await Expense.find()
//     response.status(200).json({expenses})
//     }
//     catch(error){
//         response.status(500).json({
//         'message' :'Error occurred could not  be displayed',
//         'status'  : 'failure',
//         'error'   : error
//          })
//     }
// })
// // params -> url ,  "_id": "65e69a6247e26a67dd7e4d4c"
// app.delete('/delete-expense/:id',async function(request,response){
    
    
//    // console.log(data)
//    try{
//     const data = await Expense.findById(request.params.id)
//    if(data){
//         await Expense.findByIdAndDelete(request.params.id)
//         response.status(200).json({
//             "Status" : "successfully deleted :)",
//             "Message" : "entry deleted"
//         })
//        }
//        else{
//         response.status(404).json({
//             "Status" : "failure",
//             "Message" : "file not found!!!"
//         })
//        }
    
// }
// catch(error){
//     response.status(500).json({
//     'message' :'Internal Server Error',
//     'status'  : 'failure',
//     'error'   : error
//      })
// }
// })
// app.patch('/edit-expense/:id',async function(request,response){
//     try{
//         const data1 = await Expense.findById(request.params.id)
//    if(data1){
//         await data1.updateOne({
//             "Amount" : request.body.Amount,
//             "Category" :request.body.Category ,
//             "Date" : request.body.Date
//         })
//         response.status(200).json({
//             "Status" : "successfully updated :)",
//             "Message" : "updated!!!"
//         })

//        }
//        else{
//         response.status(404).json({
//             "Status" : "failure",
//             "Message" : "file not found!!!"
//         })
//        }
//     }
//    catch(error){
//     response.status(500).json({
//         'message' :'Internal Server Error could not be updated',
//         'status'  : 'failure',
//         'error'   : error
//          })
//    }
// })



// //console.log("Hello")
// //_ _v = 0 it is like a version we acn also avoid that


app.post('/addexpense',async function(request,response){
    // console.log(request.body)
    // response.json({
    //     "Status" : "Inserting Data"
    // })
    //Queries are async functions
    try{
        await Expense.create({
            'amount' : request.body.amount,
            'category' : request.body.category,
            'date' : request.body.date
        })
        response.status(201).json({'status' : 'inserted successfully','message' : 'one entry created'})
    }
    catch(error){
        response.status(500).json({'status' : 'Failure','message' : 'entry not created','error' : error})
    }
    
})

app.get('/getexpense',async function(request,response){
   try{
      const data = await Expense.find()
       response.status(200).json(data)
   }
   catch(error){
       response.status(500).json({'status' : 'failure','message' : 'entry not found','error' : error})
   }
})

app.delete('/deleteexpense/:id',async function(request,response){
    try{
       const data = await Expense.findById(request.params.id)
       if(data){
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({'status' : 'success','message' : 'entry deleted'})
       }
       else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
       }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not delete entry','error' : error})
    }
})

app.patch('/editexpense/:id',async function(request,response){
    try{
      const data = await Expense.findById(request.params.id)
      if(data){
        await data.updateOne({
         'amount' : request.body.amount,
         'category' : request.body.category,
         'date' : request.body.date
        })
        response.status(404).json({'status' : 'success','message' : 'entry updated'})
      }
      else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
      }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not update entry','error' : error})
    }
})
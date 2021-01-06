const mongoURI = "mongodb+srv://Todo_Db:TodoDb@123@mongocluster.afpgg.mongodb.net/todoDatabase?retryWrites=true&w=majority"
let mongoose = require('mongoose');
const { todo} = require('./schema')

const todoDb=mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    todoDb.then(() => { console.log("connection established with mongodb server online"); })
    todoDb.catch(err => {
        console.log("error while connection", err)
    });




const todoModel = todoDb.model('todo', todo);

exports.todoModel = todoModel;

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const PORT=process.env.PORT;
const app=express();
app.use(express.json()); //added body key to req

//app.use(cors());
app.use(cors({
    credentials: true,
    origin: "https://todo-web--app.herokuapp.com"
    
}));

const {todoModel}=require('./connector');
const isNullOrUndefined=(value)=>value===null || value===undefined;

app.post("/todo", async (req, res) => {
    const todo = req.body;
    todo.creationDate = new Date();
    todo.done = false;
    const newTodo = new todoModel(todo);
    await newTodo.save();
    res.status(201).send(newTodo);
  });

  app.get("/todo", async (req, res) => {
    const allTodos = await todoModel.find();
    res.send(allTodos);
  });

  app.put("/todo/:todoid", async (req, res) => {
    const { task } = req.body;
    const todoid = req.params.todoid;  
    try {
      const todo = await todoModel.findOne({ _id: todoid});
      if (isNullOrUndefined(todo)) {
        res.sendStatus(404);
      } else {
        todo.task = task;
        await todo.save();
        res.send(todo);
      }
    } catch (e) {
      res.sendStatus(404);
    }
  });

  app.delete("/todo", async (req, res) => {  
    try {
      await todoModel.deleteMany();
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  });

  app.delete("/todo/:todoid", async (req, res) => {
    const todoid = req.params.todoid;  
    try {
      await todoModel.deleteOne({ _id: todoid });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  });

  app.get("/",(req,res)=>{
    res.send("server works")
  })

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
module.exports = app;
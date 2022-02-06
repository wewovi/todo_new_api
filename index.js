const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const todoModel = require('./models/todo_model.js');
app.use(bodyParser.json());

app.get('/',(request, response)=>{
    response.send('this is our second api we are building');
});
app.post('/todos', async(req, res)=>{
    const todo = todoModel.create({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        endDate: req.body.endDate
    });
try{
    const saveTodo = await todo.save();
    res.json({
        data:saveTodo,
        message:"todo sucessfully created"
    });
}catch(err){
    res.json({
        message:err
    });
}
});
app.get('/todos', async(req, res)=>{
    try {
       const getAllTodos = await todoModel.find();
       res.json({
           data:getAllTodos,
           message:"operation sucessful"
       })
    } catch (err) {
        res.json({
            message:err
        });
        
    }
});

app.get('/todos/:todoId', async(req, res)=>{
    try {
       const getAllTodos = await todoModel.findById({_id:req.params.todoId});
       res.json({
           data:getAllTodos,
           message:"operation sucessful"
       })
    } catch (err) {
        res.json({
            message:err
        });
        
    }
});
app.delete('/todos/:todoId', async(req, res)=>{
    try{
   const deleteTodo = await todoModel.findOneAndDelete({_id:req.params.todoId});
   res.json({
       data: deleteTodo,
       message:"Todo successfully deleted"
   })
    }
    catch(err){
res.json({
    message:err
});
    }
});

app.patch('/todo/:todoId',async (req, res)=>{
    try{
    const updateTodo = await todoModel.findOneAndUpdate({_id: req.params.todoId},{$set:{
        
        status: req.params.status,
       
    }});
    res.json({
        data: updateTodo,
        message: "Todo successfully updated"
    })
}catch (err) {
    res.json({
        message:err
    });
}
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true},
()=>console.log('successfully connected'));

app.listen(1002 || process.env.port);
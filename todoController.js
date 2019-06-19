var bodyParser=require('body-parser');
//var data=[{item:'getmilk'},{item:'walk dog'},{item:'code'}];
var express = require('express');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0-bs3yj.mongodb.net/test?retryWrites=true&w=majority');

var todoSchema=new mongoose.Schema({item:String});

var Todo=mongoose.model('Todo',todoSchema);



module.exports=function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;

    res.render('todo',{todos:data});
    });
  });
  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo=Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json({todos:data});
    });


  });
  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
      if(err) throw err;
      res.json({todos:data});
    });
  });



}

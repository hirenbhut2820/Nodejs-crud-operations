const path = require('path')
const ejs=require('ejs')
const mysql = require('mysql')
const express = require('express')
const bodyparser = require('body-parser')

app = express()

app.set('views',path.join(__dirname,'views'))//this is used for set path for ejs

app.set('view engine','ejs')//set view engine
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
})

mysqlconnection.connect((err)=>{
    if(!err){
        console.log("Database has been connected")
    }
    else{
        console.log("Database has not connected")
    }
})

app.get('/stud',(req,res)=>{
    mysqlconnection.query('select * from stud',(err,rows,fields)=>{
       if(!err){
           res.render('data',{
               user:rows
           })
        }
        else{
            throw err;
        }
    })
})

app.post('/add',(req,res)=>{
    mysqlconnection.query('insert into stud (name,city) values(?,?)',[req.body.name,req.body.city],(err,rows,fields)=>{
        if(!err){
            res.redirect("/stud")
        }
        else{
            throw err;
        }
    })
})

app.get('/edit/:id',(req,res)=>{   
    mysqlconnection.query('select * from stud where id= ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.render('edit',{
                user:rows[0]
            })
        }
        else{
            throw err;
        }
    })
})

app.post('/update',(req,res)=>{
    mysqlconnection.query("update stud set name=?,city=? where id=?",[req.body.name,req.body.city,req.body.id],(err,rows,fields)=>{
        if(!err){
            res.redirect('/stud') 
        }
        else{
            throw err;
        }
    })
})

app.get('/delete/:id',(req,res)=>{
    mysqlconnection.query('delete from stud where id=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.redirect("/stud")
        }
        else{
            throw err;
        }
    })
})

app.listen(3000,()=>{
    console.log("Express running at port:3000")
})
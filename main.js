const express = require('express')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process');
const bodyParser = require('body-parser');
const http = require('http');
const XLSX = require('xlsx')
const mysql = require('mysql');
const server = express()
const port  = 5050;
// server.set('view engine','ejs');
async function openBrowser(port) {
    const url = `http://localhost:${port}`;
    const open = await import('open');
    open.default(url);
}
// Middleware to parse JSON data in the request body
server.use(bodyParser.json());
// Set the extended option to true if you expect nested objects in the data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname,'views')));
server.use(express.static(path.join(__dirname,'views','style.css')));
const db = mysql.createConnection({
  host: 'localhost' ,
  user: 'root' ,
  password: 'keerthi@2002' ,
  database: 'mill' 
})
//API
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
    // res.sendFile('HTML_page.ejs');
})

server.post('/contact',(req,res)=>{
    const formData = req.body;
    var sql= "insert into contact values('"+req.body.name+"','"+req.body.number+"','"+req.body.message+"');";
    db.query(sql,(error,results,fields)=>{
      if(error){
        console.log('error:',error);
        return;
      }else{
        console.log('saved');
        res.redirect('/')
      }
    })
})

server.listen(port,()=>{
    console.log(`server running on port ${port}`);
    db.connect((err) => {
      if(err) {
        console.error('Database connection error:', err);
        process.exit(1);
      }
      console.log('Database connected');
    })
    openBrowser(port);
})




const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/static'));


app.use((req, res, next)=>{    
    var now = new Date().toString();
    var log = `${now} - ${req.method} - ${req.url}`;
    // console.log(req.body); 
    fs.appendFile('./log-file/logger.log', log+'\n', (err)=>{
        if(err) console.log("error");
    });
    next();
});

app.get('/',(req, res)=>{
    res.render('home',{
        name:'vabs',
        likes:[
            'sleep',
            'gaming',
            'travellig'
        ]
    });
});
app.get('/about',(req,res) => { 
    res.render('myForm',{
        title:'About Page',
        name :'Vaibhav',
        curYear: new Date().getFullYear()
    });
//    console.log(res.app);
});
// app.get('/help');


app.listen(3000);
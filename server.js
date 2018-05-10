const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// using middle ware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var logStr = now+" - "+req.method+" - "+req.url;
    fs.appendFile('error.log',logStr+'\n', (error) => {
        if(error){
            console.log("unable to create log file");
        }
    })
    console.log(logStr);

    next();
});


// we can use helper for a common code instead of using same function everytime like in this case we are using for date
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// helper to manipulate the text or data we are printing inside the partials or views
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => {

    res.render('home.hbs',{
       pageTitle: 'Home Page',
       welcomeMessage: "Hey Folks! Welcome to my website",
       //currentYear: new Date().getFullYear()
    });


    //res.send('<h1>Hello Express</h1>');
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: "About Us",
       // currentYear: new Date().getFullYear()
    });


   // res.send({
   //     name: 'Rohit Vij',
   //     age: 37
   // })
});

app.get('/bad', (req,res) => {
     res.send({
         errorMsg: 'Bad request send'
     })
});


app.get("/projects",(req, res) => {
    res.render('projects.hbs',{
        pageTitle: "Projects Listing"
    });
});

app.listen(port, () => {
    console.log("server has been started on port: "+port);
});
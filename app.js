require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')

const app = express();

const apiKey = process.env.APIKEY
//setting view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}))

/*
    ROUTES
*/

// GEt/
app.get('/', function(req, res){
    res.render('home.ejs', {weather: null, error: null});
});

app.post('/', function(req, res){
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+req.body.city+'&units=imperial&APPID='+apiKey

    request(url, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        if (error){
            res.render('home.ejs', {weather: null, error: "Error. Please try again."})
        }else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('home.ejs', {weather: null, error: "Error. Please try again."})
            }else{
                let weatherNow = "the weather in " + req.body.city + " is " +weather.main.temp + " degrees.";
                res.render('home.ejs', {weather: weatherNow, error: null})
            }
        };
    });
});

app.listen(3000, function(){
    console.log('server is live on port: 3000')
})
const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=c7c3a4eebaa2ae43ec332234ccbd7cc9&q= "+ query + " &units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
      const myWeatherData = JSON.parse(data);
      const temp = myWeatherData.main.temp;
      const desc = myWeatherData.weather[0].description;
      const icon = myWeatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<h1>The temperature in "+ query +" is "+ temp + " degrees Celcius</h1>");
      res.write("<p>Description is " + desc + "</p>");
      res.write("<img src=" + imageURL + "> </img>");
      res.send();

    });

  });
})


// const query = "Mardin";
//









app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})

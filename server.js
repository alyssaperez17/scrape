var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = promise;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes")(app);

mongoose.connect("mongodb://localhost/myscrapedb");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!')
});

require("./routes/api-routes.js")(app);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});


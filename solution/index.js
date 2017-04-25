var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var path = require('path');
var app = express();

// You can use ejs-layouts if you so desire :). Optional
// var expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views/public')));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  db.area.findAll().then(function(areas) {
    res.render('index', {regions: areas})
  })
})

app.get('/:name', function(req, res) {
  db.area.find({
    where: {name: req.params.name}
  }).then(function(region) {
    res.render('zone', {area: region})
  })
})

app.listen(3000);
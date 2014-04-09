// Express import
var express = require('express');

// Handlebars for Express
var exphbs = require('express3-handlebars');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
mongoose.connect('mongodb://ted:ted@ds061797.mongolab.com:61797/theenlighteneddeveloper', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);

// Bootstrap Express
var app = express();

// Use Handlebars as default express template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Tell Node to serve some resources
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/css'));

// Routing

app.get('/', function (req, res) {
    var query = User.find({}).limit(10);
    query.exec(function (err, docs) {
        if (err) {
            throw Error;
        }
        res.render('home', {users: docs});
    });
});

app.get('/users/:email', function (req, res) {
    if (req.params.email) {
        User.findOne({ email: req.params.email }, function (err, docs) {
            if (err) {
                throw Error;
            }
            res.render('user', docs);
        });
    }
});

app.listen(8080);
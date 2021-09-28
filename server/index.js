var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

// create bank account
app.get('/bankaccount/create/:user/:accttype/:alias/:balance', function (req, res) {
    // create new bank account
    var balance = Number(req.params.balance);
    console.log(req.params.user);
    dal.bankcreate(req.params.user,req.params.accttype,req.params.alias,balance).
        then((data) => {
            console.log("Account Created");
            res.send(data);            
        });                
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((data) => {
            console.log(user);
            res.send(data);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:account/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email,req.params.account, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/accounts/:user', function (req, res) {

    dal.all(req.params.user).
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);
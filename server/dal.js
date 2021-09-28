const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://mongo:27017/mit-final';
var db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, accounts:[]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// create bank account
function bankcreate(user, accttype, alias,balance){
    console.log(balance, user,accttype)

    return new Promise((resolve, reject) => {    
        
        let filter = {name:user}
        const updateDoc = {
            $push: {
              accounts: {accttype, alias,balance}
            },
          }; 
        db.collection('users').updateOne(filter, updateDoc)

        .then((data) => resolve({success:data.acknowledged,user:user,accttype:accttype,alias:alias,balance:balance}));
        console.log(`update complete, updated ${user}`)
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, account, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .updateOne(
                {email: email,"accounts.alias":account},
                { $inc: { "accounts.$.balance": amount}},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}

// all user accounts
function all(target){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({name:target})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, bankcreate, findOne, find, update, all};
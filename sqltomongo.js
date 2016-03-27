var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'),async = require('async');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'vsm'
});
var company,user,usercompany;
connection.query('SELECT * from company', function(err, rows, fields) {
connection.end();
  if (!err)
    {//console.log('The solution is: ',rows );
	company=rows;}
  else
    console.log('Error while performing Query32.');
  });
connection.query('SELECT * from shares', function(err, rows, fields) {

  if (!err)
    {//console.log('The solution is: ',rows );
	usercompany=rows;}
  else
    console.log('Error while performing Query32.');
  });

connection.query('SELECT * from users', function(err, rows, fields) {

  if (!err)
    {//console.log('The solution is: ',rows );
	user=rows;}
  else
    console.log('Error while performing Query.12');
  });
 
var url = 'mongodb://localhost:27017/vsm';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.collection('user').remove();
  db.collection('company').remove();
  db.collection('usercompany').remove();
async.series([
     function(callback){
              var collection = db.collection('company');
   
              collection.insert(company, function(err, result) {});
              console.log("Companies In");
              callback(null, 1);
       
    },
     function(callback){
              var collection = db.collection('user');
 
   
              collection.insert(user, function(err, result) {
              console.log("Users In");
              });
              callback(null, 2);
        
    },
      function(callback){
               var collection = db.collection('usercompany');
   
                collection.insert(usercompany, function(err, result) {
                console.log("userCompanies In");
                });

              callback(null, 3);
       
    },
       
],
function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
});


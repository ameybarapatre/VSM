var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'),async = require('async'),regression=require('regression');
var url = 'mongodb://localhost:27017/vsm';


MongoClient.connect(url, function(err, db) {var user = db.collection('user');
user.ensureIndex({"user_id":1});
networth(db);});
 

var networth =function(db){
  

  var company = db.collection('company');
  var collection = db.collection('usercompany');
  var callback1 =function(){console.log("done")}; 
  
  var q1 =async.queue(function(task1,callback1){
          var x=0 ; 
          var q =async.queue(function(task,callback1){
                    var y =task.name1.v_name;
                    if(task.name[y]!=null&&task.name[y]!=0)
                      {x=x +( task.name1.i_currentPrice * task.name[y] );
         
                      }
    
                    callback1();}, Infinity);
    

        q.drain = function() { 
                    var data; var user = db.collection('user');
                    user.find({user_id:task1.result.i_id}).toArray(function(err,resultk)
                              { if(resultk.length!=0){
                               console.log(task1.result.i_id);
                               data=x +resultk[0].f_amount;
                               collection.update({i_id : task1.result.i_id},{$set:{net_value:data}});
                               console.log(data);}
                             });
    
                    };
        company.find().forEach(function (result1) 
            { 
                  q.push({name: task1.result ,name1:result1}, function (err) {});
            });
      callback1();},Infinity);
 
  //start
    collection.find().forEach(function(result){
      q1.push({result: result }, function (err) {
              });
      q1.drain = function() {console.log("done");};      
        ;});
       

}; 



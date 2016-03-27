var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'),async = require('async'),regression=require('regression');
var url = 'mongodb://localhost:27017/vsm';


MongoClient.connect(url, function(err, db) {

db.collection('regression').remove();





var getregression=function(){
	console.log(max1);
 var data = db.collection('regression');

Object.keys(dataset).forEach(function(key){
	
		var result = regression('polynomial', dataset[key],2);
		var temp={};
		temp['ID'] = key;
		temp['EQ']=result['equation'];
		temp['ST']=result['string'];
		data.insert(temp,function(err,result){});
		

});

data.find({ID:'net_value'}).toArray(function(err,result1){
		console.log(result1);
	
	});



}; 





var dataset={};
var max1={};
 			 			
var getmax = function(cb){
	var collection = db.collection('usercompany');

	collection.find({net_value:{$exists:1}},{i_id :0}).limit(1).toArray(function(err,res){

					var j=0;
					var w = Object.keys(res[0]);
    				w.forEach(function(key1){
    							var q ={};
             					q[key1]=-1;

             					
              					
               					collection.find({net_value:{$exists:1}},{i_id :0}).sort(q).limit(1).toArray(function(err,result2){
    										
    										max1[key1]=result2[0][key1];
    									
    										
    										
 			 					});
 			 					j=j+1;
 			 					
               				
               			 if(j==w.length)
               			{		
               					cb(getregression);
               			}

    				
    				});
    					
    		
  
  	});
 

};


var distribution = function(callback){
         	 
			 var collection = db.collection('usercompany');
 			 var x=0;
 			 collection.ensureIndex({"net_value":1});
  			 
  			 var cursor  = collection.find({net_value:{$exists:1}},{i_id :0}).sort({net_value:1});
  			

  			 cursor.each(function(err,result)
  				{   if (result!=null){
  					Object.keys(result).forEach(function(key){
  						 
  						 



  						if (dataset[key]==null)
  						{   var tempd = [];
  							tempd.push(x);
  							if (result[key]!=null)
  							{	
  								tempd.push(100*result[key]/max1[key]);
  							}
  							else
  							{
  								tempd.push(0);
  							}
  							dataset[key] = [tempd];
  						}
  						else
  						{ 	var tempd = [];
  							tempd.push(x);
  							if (result[key]!=null)
  							{	
  								tempd.push(100*result[key]/max1[key]);
  							}
  							else
  							{
  								tempd.push(0);
  							}
  							dataset[key].push(tempd)	

  						}

  					});
  					x=x+1;}
  					else{callback();}

  				});

  			
		};
getmax(distribution);
//distribution(getregression);


});


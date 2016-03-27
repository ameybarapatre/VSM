var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'),async = require('async'),regression=require('regression');
  var math = require('mathjs');
var url = 'mongodb://localhost:27017/vsm';


MongoClient.connect(url, function(err, db) {

 var data = db.collection('regression');
 data.ensureIndex({"ID":1,"EQ" :1});
 var base = [];
data.find({ID:'net_value'},{ID:1,EQ:1}).toArray(function(err,result){ base=result[0]['EQ'];
});


 data.find({}).toArray(function(err,result){
		
		result.forEach(function(each){

			var q = each.EQ;
			console.log(each.ID);
			
			var red = function(total,currentValue,currentIndex,arr)
			{  
				 total=total + ( base[currentIndex] -currentValue )*(math.pow( 100 ,currentIndex+1)) /( currentIndex + 1);
				return total;

			} 
			var value={};
			 value['value'] = q.reduce(red,0);
			var query={};
			query['ID']=result['ID'];


			console.log(value);
			console.log("\n");
			 data.update(query,{ $set : value});


		});
	
	


	});


});
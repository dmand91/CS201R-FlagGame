var express = require('express');
var router = express.Router();
var fs = require('fs');
//var request = require('request');
var mongodb = require('mongodb');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});



  router.get('/getrandomcountry',function(req,res,next) {

          //console.log(req.query);             
          //var myRe = new RegExp("^" + req.query.q);
          //console.log(myRe);

     fs.readFile(__dirname + '/countrycodes.json',function(err,data) {
            if(err) throw err;
 	    var json = JSON.parse(data);

 	   // console.log(json);

            //var cities = data.toString().split("\n");
        	var randomNumber =Math.floor(Math.random() * (196 - 1 + 1)) + 1;      

		console.log(randomNumber);
                
	   var jsonresult = [];
        //for(var i = 0; i < json.length; i++) {
          //if(randomNumber == i) {
           console.log(json[randomNumber]);
           jsonresult.push({Name:json[randomNumber].Name},{Code:json[randomNumber].Code});
        //  }
      //  }
        //console.log(jsonresult);
        res.status(200).json(jsonresult);

        });

});


var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/user';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    /**
     * TODO: insert data here, once we've successfully connected
     */
    MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    // do some work here with the database.
    collection = db.collection('user');
    collection.remove(); // Remove anything that was there before
    collection.insert(user, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "pokemon" collection. The documents inserted with "_id" are:', result.length, result);
      }

      // Dont Close the connection, so we can use it in other routes
      // db.close();
    })
  }
});

  }
});

/* GET home page. */

router.get('/user', function(req, res) {
  console.log("In User");
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
});

router.post('/user', function(req, res) {
    console.log("In User Post");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "user" collection. The documents inserted with "_id" are:', result.length, result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});

module.exports = router;

/**
 * This array of pokemon will represent a piece of data in our 'database'
 */
var user = [
  {
    name: 'Bob',
    highScore: 32,
  },
  {
    name: 'Sally',
    highScore: 31,

  },
  {
    name: 'Sofie',
    highScore: 12,
  },
  {
    name: 'Brooke',
    highScore: 22,
  },
  {
    name: 'Madison',
    highScore: 38,
  },
  {
    name: 'Dallin',
    highScore: 24,
  }
];


var express = require('express')
var app = express();
var mysql = require('mysql');
var port = process.env.PORT || 8080;  // set our port


//DEPENDENCIES - call the packages we need
//For POST requests
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//ROUTES
app.route('/contacts')
//Get all contacts
	.get(function (req, res) {
	  	var sql = "SELECT * FROM contacts";
	  	con.query(sql, function (err, result, fields) {
		    JSON.stringify(result);
		    console.log(result);
		    res.send(result);
	  	});
	});

app.route('/contact/:id')
//Get contact by id
	.get(function (req, res) {
	  	var sql = "SELECT * FROM contacts WHERE id = ?";
	  	con.query(sql, req.params.id, function (err, result, fields) {
	    	JSON.stringify(result);
	    	console.log(result);
		    res.send(result);
	  	});
	});

app.route('/contact/create')
//Get contact by id
	.post(function (req, res) {
		var contact = {
	        id: req.body.id,
	        firstName: req.body.firstName,
	        lastName: req.body.lastName,
	        workPhone: req.body.workPhone,
	        mobile: req.body.mobile,
   	 	};
   	 	
		console.log (contact);
		var sql = "INSERT INTO contacts SET ?";
		con.query(sql, contact, function (err, result, fields) {
 	 	if (err) throw err;
 	  	console.log('Done!!')
 	  });
	});




app.route('/contact/delete')
//Delete contact by id
	.delete(function (req, res) {
	  	var sql = "DELETE FROM contacts WHERE id = ?";
	  	con.query(sql,req.body.id, function (err, result, fields) {
	  		if (err) throw err;
		  res.send('DONE!!');
	  	});
	});
	

app.listen(port)
console.log("Server is running at localhost:" + port);
/*
app.route('/contact/:id')
//Get contact by id
	.get(function (req, res) {
		for(i = 0; i < 5; i++){
			if(contacts[i].id === req.params.id){
				  res.send(contacts[i]);
			}
		}

	})

//Add a contact by id
	.post(function (req, res) {
		var user_id = req.body.id;
		var first_name = req.body.firstName;
		var last_name = req.body.lastName;
		var home_phone = req.body.homePhone;
		var mobile = req.body.mobile;
		var emailAdd = req.body.email;

		res.send(user_id + ' ' + first_name + ' ' + last_name + ' ' + home_phone + ' ' + mobile + ' ' + emailAdd);
	})

//Update a contact by id
	.put(function (req, res) {
		var user_id = req.body.id;
		var first_name = req.body.firstName;
		var last_name = req.body.lastName;
		var home_phone = req.body.homePhone;
		var mobile = req.body.mobile;
		var emailAdd = req.body.email;

		res.send(user_id + ' ' + first_name + ' ' + last_name + ' ' + home_phone + ' ' + mobile + ' ' + emailAdd);
	})

//Delete a contact by id
	.delete(function (req, res) {
		for(i = 0; i < 5; i++){
			if(contacts[i].id === req.params.id){
				  res.send(contacts[i]);
			}
		}

	})

//ERROR HANDLING
//only triggers unhandled requests
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
 
// 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  res.send(err.message || 'Sorry, contact not found');
});
*/

var express = require('express')
var app = express();
var mysql = require('mysql');
var uuid = require('uuid');
var port = process.env.PORT || 7777;  // set our port

//connect to the database

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "contacts_db"
});

var sql = "SET SQL_SAFE_UPDATES = 0";
con.query(sql,function (err, result, fields) {
		  if (err) throw err;
		  console.log('SQL_SAFE_UPDATES disabled');
	  	});
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
	  	var sql = "SELECT uuid, firstname, lastname, workphone, mobile FROM contacts";
	  	con.query(sql, function (err, result, fields) {
		    JSON.stringify(result);
		    console.log(result);
		    res.send(result);
	  	});
	});

app.route('/contact/:uuid')
//Get contact by id
	.get(function (req, res) {
	  	var sql = "SELECT uuid, firstname, lastname, workphone, mobile FROM contacts WHERE uuid = ?";
	  	con.query(sql, req.params.uuid, function (err, result, fields) {
	    	JSON.stringify(result);
	    	console.log(result);
		    res.send(result);
	  	});
	});

app.route('/contact/create')
//Create contact by id
	.post(function (req, res) {
		var contact = {
			uuid: uuid(),
	        firstName: req.body.firstName,
	        lastName: req.body.lastName,
	        workPhone: req.body.workPhone,
	        mobile: req.body.mobile
   	 	};
   	 	
		var sql = "INSERT INTO contacts SET ?";
		con.query(sql, contact, function (err, result, fields) {
 			if (err) throw err;
 			console.log(result);
 			res.send(contact.uuid);
 	  	});
	});

app.route('/contact/update/:uuid')
//Update a contact by id
	.put(function (req, res) {
		var contact = {
	        firstName: req.body.firstName,
	        lastName: req.body.lastName,
	        workPhone: req.body.workPhone,
	        mobile: req.body.mobile
   	 	};

   	 	console.log (contact);
		var sql = "Update contacts SET ? WHERE uuid = ?";
	  	con.query(sql, [contact, req.params.uuid], function (err, result, fields) {
	  		if (err) throw err;
		  res.send(req.params.uuid);
	  	});
	});

app.route('/contact/delete/:uuid')
//Delete contact by id
	.delete(function (req, res) {
	  	var sql = "DELETE FROM contacts WHERE uuid = ?";
	  	con.query(sql,req.params.uuid, function (err, result, fields) {
	  		if (err) throw err;
	  		console.log(result);
		  res.send('DONE!!');
	  	});
	});
	
app.route('/contact/update')
//Update contact by id
	.put(function (req, res) {
		var contact = {
			id: req.body.id,
	        firstName: req.body.firstName,
	        lastName: req.body.lastName,
	        workPhone: req.body.workPhone,
	        mobile: req.body.mobile
   	 	};
	  	var sql = "UPDATE contacts SET ? WHERE id = ?";
	  	con.query(sql,[contact, req.body.id], function (err, result, fields) {
	  		if (err) throw err;
		  res.send('Updated!!');
	  	});
	});

app.listen(port)
console.log("Server is running at localhost:" + port);
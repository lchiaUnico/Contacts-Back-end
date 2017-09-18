var mysql = require('mysql');
var uuid = require('uuid');


//connect to the database

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});


// Database setup

//Creates the database if it doesnot exists
con.query('CREATE DATABASE IF NOT EXISTS contacts_db', function (err) {
    if (err) throw err;
    console.info('database ready');
    //uses the database for further queries

    con.query('USE contacts_db', function (err) {
        if (err) throw err;
        console.info('Using database contacts_db');

        	//creates a table if it does not exist
        	 var sql = "CREATE TABLE IF NOT EXISTS contacts (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, uuid VARCHAR(36), firstname VARCHAR(15), lastname VARCHAR(15), workphone VARCHAR(9), mobile VARCHAR(10))";
			  con.query(sql, function (err, result) {
			    if (err) throw err;
			    console.log("Table created");
			  });

			 //inserts three records into the table

			  var record= { id: 0, uuid: uuid(), firstname: 'Lauren', lastname: 'Chia', workphone:'036666666', mobile: '0466666666' };
			  var insertSQL = "INSERT INTO contacts SET ?";
			  con.query(insertSQL, record, function (err, result) {
			    if (err) throw err;
			    console.log("Record inserted");
			  });
			  var record2= {uuid: uuid(), firstname: 'Krishna', lastname: 'Adhikari', workphone:'031234567', mobile: '0412345678' };
			  var insertSQL2 = "INSERT INTO contacts SET ?";
			  con.query(insertSQL2, record2, function (err, result) {
			    if (err) throw err;
			    console.log("Record inserted");
			  });
			  var record3= {uuid: uuid(), firstname: 'Vivek', lastname: 'Bhusal', workphone:'037654321', mobile: '0487654321' };
						  var insertSQL3 = "INSERT INTO contacts SET ?";
						  con.query(insertSQL3, record3, function (err, result) {
						    if (err) throw err;
						    console.log("Record inserted");
			  });

			//close the connection
			 con.end();
    });
});



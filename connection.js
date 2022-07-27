const { Pool } = require('pg');

const pool = new Pool ({
	host: "ec2-52-44-13-158.compute-1.amazonaws.com",
	user: "pqmykrpeklbmmw",
	port: 5432,
	password: "084747d347c86b5c8989c67e8049210a5d176bbf15a0f3454147a698afdd1ddd",
	database: "dcol1553kdbata",
  	ssl: {    /* <----- Add SSL option */
    rejectUnauthorized: false,
  }
})

const getUsers = (request, response) => {
	pool.query('SELECT * FROM objects.users ORDER BY object_id ASC, user_id ASC', (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows)
	})
}

const getUserById = (request, response) => {
	const id = parseInt(request.params.object_id)
  
	pool.query('SELECT * FROM objects.users WHERE object_id = $1', [id], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows)
	})
}

const getUserBy = (request, response) => {
	console.log(request.url);

	//credit to https://stackoverflow.com/a/28856178 for urlParams (slightly modified by me)
	if(request.url.includes('?name')){
		var urlParams = request.url.split(/[?&]/).slice(1).map(function(paramPair) {
			return paramPair.split(/=(.+)?/).slice(0, 2);
		}).reduce(function (obj, pairArray) {            
			obj[pairArray[0]] = pairArray[1];
			return obj;
		}, {});
		console.log(urlParams.name);

		var qstring = 'SELECT * FROM objects.users WHERE name = $1'.replace('$1', "'"+urlParams.name+"'");
		qstring = qstring.replace('%20', ' ');

		console.log(qstring);

		pool.query(qstring, (error, results) => {
		if (error) {
			throw error
		};
		response.status(200).json(results.rows);
		});
	};

}

const postUpdateUser = (request, response) => {

	if(request.body.username != null && request.body.password != null){
		var username = request.body.username;
		var password = request.body.password;

		var query = 'SELECT username, password FROM objects.users WHERE username = $1 AND password = $2';
		query = query.replace('%20', ' ');

		var values = [username, password]

		pool.query(query, values, (error, results) => {
			response.status(200).json(results);
			if (error) {
				console.log(error)
			};
		})
	};
	
	/*//credit to https://stackoverflow.com/a/28856178 for urlParams (slightly modified by me)
	if(request.url.includes('?')){
		var urlParams = request.url.split(/[?&]/).slice(1).map(function(paramPair) {
			return paramPair.split(/=(.+)?/).slice(0, 2);
		}).reduce(function (obj, pairArray) {            
			obj[pairArray[0]] = pairArray[1];
			return obj;
		}, {});
		console.log(urlParams);

		var qstring = 'SELECT * FROM objects.users WHERE name = $1'.replace('$1', "'"+urlParams.name+"'");
		qstring = qstring.replace('%20', ' ');

		console.log(qstring);

		pool.query(qstring, (error, results) => {
		if (error) {
			throw error
		};
		response.status(200).json(results.rows);
		});
	};*/
}

const postUser = (request, response) => {	
	var username 	= request.body.username;
	var password 	= request.body.password;
	var name 		= request.body.name;
	console.log("Username = "+username+
				", Name is "+name);
	
	var query = "INSERT INTO objects.users(\
					object_id\
					, user_id\
					, username\
					, password\
					, name\
				) VALUES (\
					nextval('object_id_seq')\
					, nextval('user_id_seq')\
					, $1\
					, $2\
					, $3\
				)"
	var values = [username
				  , password
				  , name]

	pool.query(query, values, (error, results) => {
		response.status(200).json(results);
		if (error) {
			console.log(error)
		};
	})
}

module.exports = {
	getUsers,
	getUserById,
	getUserBy,
	postUser,
	postUpdateUser,
	pool
}


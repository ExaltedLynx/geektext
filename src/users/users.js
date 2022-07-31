const pool = require("../../connection.js")

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
	if (request.url.includes('?name')) {
		var urlParams = request.url.split(/[?&]/).slice(1).map(function (paramPair) {
			return paramPair.split(/=(.+)?/).slice(0, 2);
		}).reduce(function (obj, pairArray) {
			obj[pairArray[0]] = pairArray[1];
			return obj;
		}, {});
		console.log(urlParams.name);

		var qstring = 'SELECT * FROM objects.users WHERE name = $1'.replace('$1', "'" + urlParams.name + "'");
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

		var values = [username, password];

		pool.query(query, values, (error, results) => {
			//response.status(200).json(results);
			if (error) {
				console.log(error);
			};
		
			console.log(results.rows);

			if(results.rows.length > 0 && request.body.newpassword != null){
				var queryUpdate = 'UPDATE objects.users SET password = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newpassword].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew password is: "+request.body.newpassword);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newname != null){
				var queryUpdate = 'UPDATE objects.users SET name = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newname].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew name is: "+request.body.newname);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newaddress1 != null){
				var queryUpdate = 'UPDATE objects.users SET address_1 = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newaddress1].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew Address_1 is: "+request.body.newaddress1);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newaddress2 != null){
				var queryUpdate = 'UPDATE objects.users SET address_2 = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newaddress2].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew Address_2 is: "+request.body.newaddress2);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newcity != null){
				var queryUpdate = 'UPDATE objects.users SET city = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newcity].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew City is: "+request.body.newcity);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newstate != null){
				var queryUpdate = 'UPDATE objects.users SET state = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newstate].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew State is: "+request.body.newstate);
					console.log(resultsupdate);
				})
			};
			if(results.rows.length > 0 && request.body.newzip != null){
				var queryUpdate = 'UPDATE objects.users SET zip = $1 WHERE username = $2 AND password = $3';
				var valuesUpdate = [request.body.newzip].concat(values);
				console.log(queryUpdate, valuesUpdate);

				pool.query(queryUpdate, valuesUpdate, (errorupdate, resultsupdate) => {
					console.log(resultsupdate);
					if (errorupdate) {
						console.log(errorupdate);
					};
					console.log("Username: "+username+"\nNew Zip is: "+request.body.newzip);
					console.log(resultsupdate);
				})
			};
			response.status(200).json(results.rows);
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
	var username = request.body.username;
	var password = request.body.password;
	var name = request.body.name;
	console.log("Username = " + username +
		", Name is " + name);

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
	postUser,
	postUpdateUser,
	getUserBy
}
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
	postUser
}
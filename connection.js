const { Pool } = require('pg');

const pool= new Pool
	({
		host: "localhost",
		user: "geektext",
		port: 5432,
		password: "geektext",
		database: "geektext"
	})

module.exports = pool;

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

module.exports = {
	getUsers,
	getUserById
}


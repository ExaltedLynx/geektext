const { Pool } = require('pg');

const pool= new Pool ({
	host: "ec2-52-44-13-158.compute-1.amazonaws.com",
	user: "pqmykrpeklbmmw",
	port: 5432,
	password: "084747d347c86b5c8989c67e8049210a5d176bbf15a0f3454147a698afdd1ddd",
	database: "dcol1553kdbata",
  	ssl: {    /* <----- Add SSL option */
    rejectUnauthorized: false,
  }
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


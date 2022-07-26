const { Pool } = require('pg');

const pool = new Pool({
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
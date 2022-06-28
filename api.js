const pool = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () =>
{
	console.log("Server is now listening at port 3000")
})

app.get("/", (req, res) => {
	res.send("Hello World");
});

//filters books in database by user chosen genre
app.get('/book', (req, res) => {
	pool.query(`Select * from book`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
})


//filters books in database by user chosen genre
app.get('/book/genre/:bookgenre', (req, res) => {
	pool.query(`Select * from book where bookgenre ='${req.params.bookgenre}'`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
})

pool.connect();

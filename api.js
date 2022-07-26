const bookSearchRoutes = require('./src/booksearch/routes.js');
const userRoutes = require('./src/users/routes.js')
const express = require('express');
const app = express();
const db = require('./connection')
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

/*
  Book Browsing and Sorting Features
 */
app.use("/book", bookSearchRoutes);

app.use("/users", userRoutes);

app.listen(port, () =>
{
	console.log("Server is now listening at port 3000")
})


app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
});

db.connect();

/*
app.get('/users', db.getUsers);

app.get('/users/:object_id', db.getUserById);

app.post('/users/new', db.postUser);
*/
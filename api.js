const pool = require('./connection.js')
const db = require('./connection')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () =>
{
	console.log("Server is now listening at port 3000")
})

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
});
  
app.get('/users', db.getUsers);
app.get('/users/:object_id', db.getUserById);

app.post('/users/new', db.postUser);
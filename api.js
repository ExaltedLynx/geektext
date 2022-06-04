const client = require('./connection.js')
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



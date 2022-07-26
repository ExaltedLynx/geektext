const pool = require("../../connection.js")

//retrieves all books from database in pages of x books at a time
const getAllBooks = (req, res) => {
	pool.query(`Select * from book limit '${req.params.numofbook}' offset'${(req.params.pagenum * req.params.numofbook) - req.params.numofbook}'`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
}


//filters books in database by user chosen genre
const sortBooksByGenre = (req, res) => {
	pool.query(`Select * from book where bookgenre ='${req.params.bookgenre}'`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
}

//filters books by top 10 most sold in descending order
const sortByBestSelling = (req, res) => {
	pool.query(`Select * from book order by copiessold desc limit 10`, (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
		else {
			res.send(err);
		}
	});
	pool.end;
}

//sorts books with a rating greater than or equal to the chosen rating
const sortBooksByRating = (req, res) => {
	pool.query("SELECT ISBN, bookname, AVG(rating_score)::NUMERIC(10,2) FROM reviews INNER JOIN book on reviews.review_ISBN = book.ISBN GROUP BY ISBN, book.bookName ORDER BY ISBN", (err, result) => {
		if (!err) {
			res.send(result.rows.filter(elem => elem.avg >= req.params.rating));
		}
		else {
			res.send(err);
		}
	});
}

module.exports = {
	getAllBooks,
	sortBooksByGenre,
	sortByBestSelling,
	sortBooksByRating
};
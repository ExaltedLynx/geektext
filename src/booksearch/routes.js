const { Router } = require("express");
const controller = require("./booksearch");
const router = Router();

router.get("/rating/:rating", controller.sortBooksByRating);
router.get("/genre/:bookgenre", controller.sortBooksByGenre);
router.get("/copiessold", controller.sortByBestSelling);
router.get("/:numofbook/:pagenum", controller.getAllBooks);

module.exports = router;
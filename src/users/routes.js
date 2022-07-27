const { Router } = require("express");
const controller = require("./users");
const router = Router();

router.get('/', controller.getUsers);
router.get('/:object_id', controller.getUserById);
router.get('/search', controller.getUserBy);
router.post('/new', controller.postUser);
router.post('/update', controller.postUpdateUser);

module.exports = router;
const { Router } = require("express");
const controller = require("./users");
const router = Router();

router.get('/', controller.getUsers);
router.get('/:object_id', controller.getUserById);
router.post('/new', controller.postUser);

module.exports = router;
const { Router } = require("express");
const router = Router();

router.use(require("./users.route"));
router.use(require("./books.route"));
router.use(require("./reviews.route"));
router.use(require("./rating.route"));

module.exports = router;

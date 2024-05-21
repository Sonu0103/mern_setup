const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

//  Make a create user API
router.post("/create", userControllers.createUser);

// Login user api
router.post("/login", userControllers.loginUser);

// controllers - Routes - (Index.js)

// expoting
module.exports = router;

//importing only router as u dont need the whole express

const router = require("express").Router();
const productControllers = require("../controllers/productControllers");

//Make a create user API

router.post("/create", productControllers.createProduct);

//exporting
module.exports = router;

//importing only router as u dont need the whole express

const router = require("express").Router();
const productControllers = require("../controllers/productControllers");

//Make a create user API

router.post("/create", productControllers.createProduct);

// fetch all
router.get("/get_all_products", productControllers.getAllProducts);

// fetch single product
// if POST, body(data)
router.get("/get_single_product/:id", productControllers.getProduct);

// delete product
router.delete("/delete_product/:id", productControllers.deleteProduct);

// update product
router.put("/update_product/:id", productControllers.updateProduct);

//exporting
module.exports = router;

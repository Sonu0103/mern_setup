// Make a function (logic)
const { get } = require("http");
const productModels = require("../models/productModels");
const path = require("path");
// const bcrypt = require("bcrypt");
// 1. Creating User Function

const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  //#. Destructuring
  const { productName, productDescription, productPrice, productCategory } =
    req.body;
  //   //2. Validation
  //   //2.1 If not : Send the reponse and stop the process

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  // check product image
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: "Image not Found!!",
    });
  }

  const { productImage } = req.files;

  // Uploading
  // 1. Generating unique name for each file
  const imageName = `${Date.now()}-${productImage.name}`;
  // 2. Define Specific Path
  const imageUploadPath = path.join(
    __dirname,
    `../public/products/${imageName}`
  );

  // 3. Upload to that path (await | trycatch)
  try {
    await productImage.mv(imageUploadPath);

    // Save to database
    const newProduct = new productModels({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: imageName,
    });

    const product = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Created!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};
// fetch all products
const getAllProducts = async (req, res) => {
  // # Try Catch
  try {
    // 1.find all the products
    const products = await productModels.find({});
    // 2.send response
    res.status(201).json({
      success: true,
      message: "product fetched Successfully!",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

//exporting
module.exports = {
  createProduct,
  getAllProducts,
};

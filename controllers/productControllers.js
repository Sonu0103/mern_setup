// Make a function (logic)
const { get } = require("http");
const productModels = require("../models/productModels");
const path = require("path");
const fs = require("fs");
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

// fetch single product
const getProduct = async (req, res) => {
  // receive id from url
  const productId = req.params.id;
  try {
    const product = await productModels.findById(productId);
    res.status(201).json({
      success: true,
      message: "Product Fetched!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  // get product id
  const productId = req.params.id;
  try {
    // fetch all product

    await productModels.findByIdAndDelete(productId);
    res.status(201).json({
      success: true,
      message: "deleted",
      // updatedProductList
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// update product
// 1. get a update id
// 2. if new image is provided
// 3. Upload (public)
// 4. Delete old image - delete product
// 5. update products

const updateProduct = async (req, res) => {
  try {
    // if there is file, uplaod new & delete old
    if (req.files && req.files.productImage) {
      // upload new to /public/products
      // 1. Destructure file
      const { productImage } = req.files;

      // make a new image name
      // 1. Generating unique name for each file
      const imageName = `${Date.now()}-${productImage.name}`;
      // 2. Define Specific Path
      const imageUploadPath = path.join(
        __dirname,
        `../public/products/${imageName}`
      );
      // move to folder
      await productImage.mv(imageUploadPath);
      // replace productImage name to new name
      req.body.productImage = imageName;

      //  # delete old image
      // file product information (We gave only ID)
      const existingProduct = await productModels.findById(req.params.id);

      // Search that image in directory
      if (req.body.productImage) {
        // if new image is uploaded, then only remove old image
        const oldImagePath = path.join(
          __dirname,
          `../public/products/${existingProduct.productImage}`
        );
        // delete from file system
        fs.unlinkSync(oldImagePath);
      }
    }
    // update in database
    const updatedProduct = await productModels.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    // send a RESPONSE
    res.status(201).json({
      success: true,
      message: "Product Updated",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " internal server error",
      error: error,
    });
  }
};

//exporting
module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

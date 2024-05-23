// Make a function (logic)
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

  //   // Try - Catch (Error Handling)
  //   else
  //     try {
  //       //4. Check existing product
  //       //check if the user is already exists
  //       const existingProduct = await productModels.findOne({ Name: Name });

  //       //4.1 if yes : Send response and stop the process
  //       if (existingProduct) {
  //         return res.json({
  //           success: false,
  //           message: "Product already exists!",
  //         });
  //       }
  //       //5. if not:
  //     } catch (error) {
  //       console.log(error);
  //       res.json({
  //         success: false,
  //         message: "Internal Server Error!",
  //       });
  //     }

  //   // Hash/encrypt the password
  //   const randomSalt = await bcrypt.genSalt(10);
  //   const hashPassword = await bcrypt.hash(password, randomSalt);

  //   //If proper data
  //   const newProduct = new productModels({
  //     //fields : valuse reciveced from user
  //     productName: Name,
  //     productDescription: description,
  //     productPrice: price,
  //     productCategory: hashPassword,
  //     productImage: satisfies,
  //   });

  //   //6. Save in the database
  //   await newProduct.save();

  //   //7. Send a success reponse
  //   res.json({
  //     success: true,
  //     message: "Product Created successfully!",
  //   });
};

//exporting
module.exports = {
  createProduct,
};

import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import mongoose, { Schema } from "mongoose";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

// create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};


// get product Controllers
export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "Successfully fetched a product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in gettin the product",
      error: error.message,
    });
  }
};


// get single product controller
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Successfully fetched a single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch single product",
      error,
    });
  }
};



// product photo controller
export const productPhotoController = async (req, res) => {
  try {
    const productId = req.params.pid;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(productId).select("photo");
    if (product && product.photo && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting the product photo",
      error: error.message,
    });
  }
};



// delete product controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Successfully deleted a product",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting a product",
      error,
    });
  }
};



// update a product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

// filter the product
export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Successfully filtered it",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Not able to filter properly",
      error,
    });
  }
};



// count product
export const countProductController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Counted the product successfully",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Not able to count the product",
      error,
    });
  }
};



// product list controller
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in pagination",
      error,
    });
  }
};


// searching the product
export const searchProductController = async(req,res) => {
  try {
    const {keyword} = req.params;
    const result = await productModel.find({
      $or : [
        {name : {$regex : keyword, $options : "i"}},
        {description : {$regex : keyword, $options : "i"}},
      ]
    })
    .select("-photo");
    res.json(result)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Somethin went wrong!",
      error
    })
  }
}

// search the related product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};


// product category
export const productCategoryController = async(req,res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      message : "Successfully fetched a product",
      category,
      products,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message : "Not able to fetch properly",
      error
    })
  }
}

// payment gateway 

// token 
export const braintreeTokenController = async(req, res) => {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error);

  }
}


// payment 
export const braintreePaymentController = async(req, res) => {
   try {
    const {cart, nonce} = req.body;
    let total= 0;
    cart.map((item) => {
      total += item.price;
    })

    let newTranscation = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce : nonce,
      options : {
        submitForSettlement : true
      }
    },
    function(error, result) {
      if(result) {
        const order= new orderModel({
          products : cart,
          payment : result,
          buyer : req.user._id
        }).save();
        res.json({ok : true})
      } else {
        res.status(500).send(error)
      }
    }
    )
   } catch (error) {
    console.log(error);
   }
}
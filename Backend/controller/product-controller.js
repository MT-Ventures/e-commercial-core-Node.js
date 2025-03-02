import cloudinary from "cloudinary";
import { getDataUri } from "./../utils/features.js";
import productModel from "../models/product-model.js";

class ProductController {
  // GET ALL PRODUCTS
  async getAllProductsController(req, res) {
    const { keyword, category } = req.query;
    try {
      const products = await productModel
        .find({
          name: {
            $regex: keyword ? keyword : "",
            $options: "i",
          },
          // category: category ? category : null,
        })
        .populate("category");
      res.status(200).send({
        success: true,
        message: "All products fetched successfully",
        totalProducts: products.length,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get All Products API",
        error,
      });
    }
  }

  // GET TOP PRODUCT
  async getTopProductsController(req, res) {
    try {
      const products = await productModel
        .find({})
        .sort({ rating: -1 })
        .limit(3);
      res.status(200).send({
        success: true,
        message: "Top 3 products",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get TOP PRODUCTS API",
        error,
      });
    }
  }

  // GET SINGLE PRODUCT
  async getSingleProductController(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).send({
        success: true,
        message: "Product Found",
        product,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get single Products API",
        error,
      });
    }
  }

  // CREATE PRODUCT
  async createProductController(req, res) { 
    try {
      const { name, description, price, category, stock } = req.body;
      if (!req.file) {
        return res.status(500).send({
          success: false,
          message: "Please provide product images",
        });
      }
      const file = getDataUri(req.file);
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };

      await productModel.create({
        name,
        description,
        price,
        category,
        stock,
        images: [image],
      });

      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Create Product API",
        error,
      });
    }
  }

  // UPDATE PRODUCT
  async updateProductController(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      const { name, description, price, stock, category } = req.body;
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      if (category) product.category = category;

      await product.save();
      res.status(200).send({
        success: true,
        message: "Product details updated",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Update Product API",
        error,
      });
    }
  }

  // UPDATE PRODUCT IMAGE
  async updateProductImageController(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      if (!req.file) {
        return res.status(404).send({
          success: false,
          message: "Product image not found",
        });
      }

      const file = getDataUri(req.file);
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      product.images.push(image);
      await product.save();
      res.status(200).send({
        success: true,
        message: "Product image updated",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Update Product Image API",
        error,
      });
    }
  }

  // DELETE PRODUCT IMAGE
  async deleteProductImageController(req, res) {
    try {

      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product Not Found",
        });
      }

      const id = req.query.id;
      if (!id) {
        return res.status(404).send({
          success: false,
          message: "Product image not found",
        });
      }

      let isExist = -1;
      product.images.forEach((item, index) => {
        if (item._id.toString() === id.toString()) isExist = index;
      });
      if (isExist < 0) {
        return res.status(404).send({
          success: false,
          message: "Image Not Found",
        });
      }

      await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
      product.images.splice(isExist, 1);
      await product.save();
      return res.status(200).send({
        success: true,
        message: "Product Image Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Delete Product Image API",
        error,
      });
    }
  }

  // DELETE PRODUCT
  async deleteProductController(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }

      for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id);
      }
      await product.deleteOne();
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Delete Product API",
        error,
      });
    }
  }

  // CREATE PRODUCT REVIEW AND COMMENT
  async productReviewController(req, res) {
    try {
      const { comment, rating } = req.body;
      const product = await productModel.findById(req.params.id);
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).send({
          success: false,
          message: "Product Already Reviewed",
        });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(200).send({
        success: true,
        message: "Review Added!",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Add Review API",
        error,
      });
    }
  }

  // GET PRODUCT REVIEWS
  async getProductReviewsController(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      res.status(200).send({
        success: true,
        message: "All Reviews",
        reviews: product.reviews,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get All Reviews API",
        error,
      });
    }
  }

  // DELETE PRODUCT REVIEWS
  async deleteProductReviewController(req, res) {
    try {
      const product = await productModel.findById(req.query.productId);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product Not Found",
        });
      }

      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );
      const numReviews = reviews.length;
      const rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        reviews.length;
      await productModel.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          rating,
          numReviews,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Review Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Delete Review API",
        error,
      });
    }
  }
}

export default new ProductController();

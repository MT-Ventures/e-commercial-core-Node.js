import categoryModel from "../models/category-model.js";
import productModel from "../models/product-model.js";

class CategoryController {
  // CREATE
  async createCategory(req, res) {
    try {
      const { category } = req.body;

      // Validation
      if (!category || typeof category !== "string" || category.trim() === "") {
        return res.status(400).send({
          success: false,
          message: "Please provide a valid category name",
        });
      }

      // Check if category already exists
      const existingCategory = await categoryModel.findOne({
        category: category.trim(),
      });
      if (existingCategory) {
        return res.status(409).send({
          success: false,
          message: "Category already exists",
        });
      }

      // Create category
      const newCategory = await categoryModel.create({
        category: category.trim(),
      });

      res.status(201).send({
        success: true,
        message: `${newCategory.category} category created successfully`,
        data: newCategory,
      });
    } catch (error) {
      console.error("Error in createCategory API:", error);

      // Differentiating between different types of errors
      if (error.name === "ValidationError") {
        return res.status(400).send({
          success: false,
          message: "Validation error",
          error: error.message,
        });
      }

      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // GET ALL CATEGORIES
  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        totalCat: categories.length,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getAllCategories API",
      });
    }
  }

  // DELETE CATEGORY
  async deleteCategory(req, res) {
    try {
      // Find category
      const category = await categoryModel.findById(req.params.id);
      // Validation
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found",
        });
      }

      // Find products with this category id
      const products = await productModel.find({ category: category._id });
      // Update product category
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        product.category = undefined;
        await product.save();
      }

      // Delete category
      await category.deleteOne();
      res.status(200).send({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.log(error);
      // Cast error || OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid ID",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error in deleteCategory API",
        error,
      });
    }
  }

  // UPDATE CATEGORY
  async updateCategory(req, res) {
    try {
      // Find category
      const category = await categoryModel.findById(req.params.id);
      // Validation
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found",
        });
      }

      // Get new category name
      const { updatedCategory } = req.body;
      // Find products with this category id
      const products = await productModel.find({ category: category._id });
      // Update product category
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        product.category = updatedCategory;
        await product.save();
      }

      if (updatedCategory) category.category = updatedCategory;

      // Save updated category
      await category.save();
      res.status(200).send({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      console.log(error);
      // Cast error || OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid ID",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error in updateCategory API",
        error,
      });
    }
  }
}

export default new CategoryController();

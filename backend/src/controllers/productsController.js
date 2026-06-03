/*
    Campos:
        name:
        idCategory:
        idBrand:
        size:
        color:
        description:
        price:
        stock:
        images: [
            image: String, //Image url of cloudinary, this is the path where the image is stored in the server, this is used to display the image in the frontend
            public_id: String //Public id of cloudinary, this is the unique identifier of the image in the cloudinary server, this is used to delete the image from the server when we delete the product
        ]
        mainFeatures: [
            feature: String //This is the main feature of the product, this is used to display the main features of the product in the frontend       
        ]
*/
import { v2 as cloudinary } from "cloudinary"; // Cloudinary allows us to upload and manage images in the cloud, which is useful for storing banner images without having to manage our own server storage.
import multer from "multer"; // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we will use it to handle the uploading of banner images from the frontend to the backend.
import { CloudinaryStorage } from "multer-storage-cloudinary"; // CloudinaryStorage is a storage engine for Multer that allows us to directly upload files to Cloudinary, simplifying the process of handling file uploads and storage in the cloud.

import productModels from "../models/products.js";
import categoriesModels from "../models/categories.js";
import brandModels from "../models/brand.js";

const productsController = {};

//SELECT
productsController.getProducts = async (req, res) => {
  try {
    const products = await productModels
      .find()
      .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
      .populate("idBrand", "name"); //Populate the idBrand field with the name of the brand, this is used to display the name of the brand in the frontend
    return res.status(200).json(products);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//CREATE
productsController.createProduct = async (req, res) => {
  try {
    let {
      name,
      idCategory,
      idBrand,
      size,
      color,
      description,
      price,
      stock,
      mainFeatures,
    } = req.body;

    //Validate that all the required fields are filled
    if (
      !name ||
      !idCategory ||
      !idBrand ||
      !price ||
      !stock ||
      !mainFeatures ||
      mainFeatures.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Validate that the price and stock are numbers and are greater than 0
    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }
    if (isNaN(stock) || stock < 0) {
      return res
        .status(400)
        .json({ message: "Stock must be a positive number" });
    }

    //Sanitize the data
    name = name.trim();
    size = size.trim();
    color = color.trim();
    description = description.trim();

    //Check if the product already exists, this is to avoid duplicates
    const existingProduct = await productModels.findOne({ name: name.trim() }); //Find a product with the same name
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create new images array from the uploaded files
    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    const newProduct = new productModels({
      name,
      idCategory,
      idBrand,
      size,
      color,
      description,
      price,
      stock,
      images,
      mainFeatures,
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
productsController.updateProduct = async (req, res) => {
  try {
    let {
      name,
      idCategory,
      idBrand,
      size,
      color,
      description,
      price,
      stock,
      mainFeatures,
    } = req.body;

    const productFound = await productModels.findById(req.params.id);
    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Delete old images from Cloudinary
    for (const img of productFound.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Create new images array from the uploaded files
    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    //Validate that all the required fields are filled
    if (
      !name ||
      !idCategory ||
      !idBrand ||
      !price ||
      !stock ||
      !mainFeatures ||
      mainFeatures.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Validate that the price and stock are numbers and are greater than 0
    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    if (isNaN(stock) || stock < 0) {
      return res
        .status(400)
        .json({ message: "Stock must be a positive number" });
    }

    //Sanitize the data
    name = name.trim();
    size = size.trim();
    color = color.trim();
    description = description.trim();

    const updatedProduct = await productModels.findByIdAndUpdate(
      req.params.id,
      {
        name,
        idCategory,
        idBrand,
        size,
        color,
        description,
        price,
        stock,
        mainFeatures,
        images,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await updatedProduct.save();
    return res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE
productsController.deleteProduct = async (req, res) => {
  try {
    const product = await productModels.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    //Delete the images from Cloudinary
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    const deletedProduct = await productModels.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//SEARCH by name
productsController.searchProductbyname = async (req, res) => {
  try {
    const { name } = req.body; //Request the name of the product that we want to search
    const products = await productModels.find({ name: { $regex: name, $options: "i" } }) //Find the products that match the name, we use regex to have a case insensitive search
    .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
    .populate("idBrand", "name"); //Populate the idBrand field with the name of the brand, this is used to display the name of the brand in the frontend
    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Count products
productsController.countProducts = async (req, res) => {
    try {
        const count = await productModels.countDocuments() //Count the number of products in the database
        return res.status(200).json({count}) //Send the count of products
    } catch (error) {
        console.error("Error counting products:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search by the name of the category
productsController.searchByCategory = async (req, res) => {
    try {
        const { name } = req.body; //Request the name of the category that we want to search
        const category = await categoriesModels.findOne({ name: { $regex: name, $options: "i" } }); //Find the category by name
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await productModels.find({ idCategory: category._id }) //Find the products that match the name of the category
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }
        return res.status(200).json(products)
    }
    catch (error) {
        console.error("Error searching products by category:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search by the name of the brand
productsController.searchByBrand = async (req, res) => {
    try {
        const { name } = req.body; //Request the name of the brand that we want to search
        const brand = await brandModels.findOne({ name: { $regex: name, $options: "i" } });
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        const products = await productModels.find({ idBrand: brand._id }) //Find the products that match the name of the brand
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }
        return res.status(200).json(products)
    }   
    catch (error) {
        console.error("Error searching products by brand:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search products by price range
productsController.searchByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body; //Request the minimum and maximum price that we want to search
        if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0) {
            return res.status(400).json({ message: "Price must be a positive number" });
        }
        const products = await productModels.find({ price: { $gte: minPrice, $lte: maxPrice } }) //Find the products that match the price range
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }       
        return res.status(200).json(products)
    }   
    catch (error) {
        console.error("Error searching products by price range:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search products by stock availability
productsController.searchByStockAvailability = async (req, res) => {
    try {        const { inStock } = req.body; //Request if we want to search products that are in stock or out of stock
        if (typeof inStock !== "boolean") {
            return res.status(400).json({ message: "Invalid inStock value" });
        }
        const products = await productModels.find({ stock: inStock ? { $gt: 0 } : 0 }) //Find the products that match the stock availability
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }
        return res.status(200).json(products)
    }   
    catch (error) {
        console.error("Error searching products by stock availability:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search by colors
productsController.searchByColor = async (req, res) => {
    try {
        const { color } = req.body; //Request the color that we want to search
        const products = await productModels.find({ color: { $regex: color, $options: "i" } }) //Find the products that match the color, we use regex to have a case insensitive search
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }
        return res.status(200).json(products)
    }
    catch (error) {
        console.error("Error searching products by color:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search by size
productsController.searchBySize = async (req, res) => {
    try {
        const { size } = req.body; //Request the size that we want to search
        const products = await productModels.find({ size: { $regex: size, $options: "i" } }) //Find the products that match the size, we use regex to have a case insensitive search
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }
        return res.status(200).json(products)
    }
    catch (error) {
        console.error("Error searching products by size:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Search by main features
productsController.searchByMainFeatures = async (req, res) => {
    try {
        const { feature } = req.body; //Request the main feature that we want to search
        const products = await productModels.find({ "mainFeatures.feature": { $regex: feature, $options: "i" } }) //Find the products that match the main feature, we use regex to have a case insensitive search
        .populate("idCategory", "name") //Populate the idCategory field with the name of the category, this is used to display the name of the category in the frontend
        .populate("idBrand", "name");   
        if (products.length === 0) {
            return res.status(404).json({message: "Products not found"})
        }   
        return res.status(200).json(products)
    }
    catch (error) {
        console.error("Error searching products by main features:", error);
        res.status(500).json({message: "Internal server error"})
    }    
}

export default productsController;
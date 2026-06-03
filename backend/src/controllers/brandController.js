/*
    Campos:
        name:
        country:
        status:
        images: [
            image: string //Image in cloudinary
            public_id: string //Public id of the image in cloudinary
        ]
*/
import { v2 as cloudinary } from "cloudinary"; // Cloudinary allows us to upload and manage images in the cloud, which is useful for storing banner images without having to manage our own server storage.
import multer from "multer"; // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we will use it to handle the uploading of banner images from the frontend to the backend.
import { CloudinaryStorage } from "multer-storage-cloudinary"; // CloudinaryStorage is a storage engine for Multer that allows us to directly upload files to Cloudinary, simplifying the process of handling file uploads and storage in the cloud.

const brandController = {};
//Import the model of the discount codes to perform operations on the database
import brandModels from "../models/brand.js";

//SELECT
brandController.getBrands = async (req, res) => {
  try {
    const brands = await brandModels.find();
    res.json(brands);
  } catch (error) {
    console.error("Error getting discount codes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
brandController.createBrand = async (req, res) => {
  try {
    let { name, country, status } = req.body; //Request the data that is needed to create a brand

    //Validate the data
    if (!name || !country || !status) {
      //Check if the required fields are not empty
      return res
        .status(400)
        .json({ message: "Name, country and status are required" });
    }

    //Sanitize the data
    name = name.trim(); //Remove spaces
    country = country.trim(); //Remove spaces
    status = status.trim().toLowerCase(); //Remove spaces and convert to lowercase, this is to have a consistent format for the status field

    //Check if the brand already exists, this is to avoid duplicates
    const existingBrand = await brandModels.findOne({ name: name }); //Find a brand with the same name
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    //Process the images, we receive an array of images in the request, and we need to save the path and the public id of each image in the database
    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    //Create a new brand with the data received from the request
    const newBrand = new brandModels({
      name,
      country,
      status,
      images,
    });

    console.log(req.files);

    //Save the data in the database
    await newBrand.save();
    //If the data is save, show a messagge of confirmation
    res.status(201).json({ message: "Brand saved" });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
brandController.updateBrand = async (req, res) => {
  try {
    let { name, country, status } = req.body;

    const brand = await brandModels.findById(req.params.id);
    console.log("BRAND COMPLETA:");
    console.log(JSON.stringify(brand, null, 2));


    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    // delete old images from Cloudinary
    for (const img of brand.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Create new images array from the uploaded files
    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    brand.name = name.trim();
    brand.country = country.trim();
    brand.status = status.trim().toLowerCase();
    brand.images = images;

    await brand.save();

    return res.status(200).json({
      message: "Brand updated",
      brand,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//DELETE
brandController.deleteBrand = async (req, res) => {
  try {
    const brand = await brandModels.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    // Delete the images from Cloudinary
    for (const img of brand.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const brandDeleted = await brandModels.findByIdAndDelete(req.params.id);

    if (!brandDeleted) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//Additional endpoints for specific brand operations
brandController.searchBrand = async (req, res) => {
  //This endpoint is used to search a brand by its name
  try {
    const { name } = req.body; //Request the name of the brand that we want to search

    const brand = await brandModels.findOne({  name: { $regex: name, $options: "i" }, }); //Find the brand by its name, we trim to have a consistent format for the brands
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    } //If the brand is not found, show a message of error

    //If the brand is found, send the data of the brand
    res.json(brand);
  } catch (error) {
    console.error("Error searching brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Count the number of brands in the database, this is useful for the admin dashboard to show the number of brands that are available
brandController.countBrands = async (req, res) => {
  try {
    const count = await brandModels.countDocuments(); //Count the number of brands in the database
    return res.status(200).json({ count }); //Send the count of brands
  } catch (error) {
    console.error("Error counting brands:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default brandController;

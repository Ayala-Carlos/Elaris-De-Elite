/*
    Campos:
        name:
        country:
        status:
        images: []
*/

const brandController = {};
//Import the model of the discount codes to perform operations on the database
import brandModels from "../models/brand.js";

//SELECT
brandController.getBrands = async (req, res) =>{
    try {
        const brands = await brandModels.find()
        res.json(brands) 
    } catch (error) {
        console.error("Error getting discount codes:", error);
        res.status(500).json({message: "Internal server error"})
    }
    
}

//INSERT
brandController.createBrand = async (req, res) => {
    try {
        let {name, country, status, images} = req.body; //Request the data that is needed to create a brand

        //Sanitize the data
        name = name.trim() //Remove spaces
        country = country.trim() //Remove spaces
        status = status.trim().toLowerCase() //Remove spaces and convert to lowercase, this is to have a consistent format for the status field
        images = images.map(image => image.trim()) //Remove spaces from each image url

        //Validate the data
        if(!name || !country || !status){ //Check if the required fields are not empty
            return res.status(400).json({message: "Name, country and status are required"})
        }

        //Check if the brand already exists, this is to avoid duplicates
        const existingBrand = await brandModels.findOne({name: name}) //Find a brand with the same name
        if(existingBrand){ 
            return res.status(400).json({message: "Brand already exists"})
        }

        //If the data is valid and the brand does not exist, create a new brand
        const newBrand = new brandModels({name, country, status, images}) // Send the data to the model to create a new 
        
        //Save the data in the database
        await newBrand.save()
        //If the data is save, show a messagge of confirmation
        res.status(201).json({message: "Brand saved"})
    } catch (error) {
        console.error("Error creating brand:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//UPDATE
brandController.updateBrand = async(req, res) => {
    let {name, country, status, images} = req.body; //Request the data that is needed to update a brand

    //Sanitize the data
    name = name.trim() //Remove spaces
    country = country.trim() //Remove spaces
    status = status.trim().toLowerCase() //Remove spaces and convert to lowercase, this is to have a consistent format for the status field
    images = images.map(image => image.trim()) //Remove spaces from each image url

    const updated = await brandModels.findByIdAndUpdate(req.params.id, { //Find the brand by its id and update it with the new data
        name, country, status, images
    }, {new: true})

    if(!updated){ return res.status(404).json({message: "Brand not found"})} //If the brand is not found, show a message of error

    //If the data is updated, send a confirmation message
    res.json({message: "Brand updated"})
}

//DELETE
brandController.deleteBrand = async(req, res) => {
    const deleted = await brandModels.findByIdAndDelete(req.params.id) //Find the brand by its id and delete it
    if(!deleted){ 
        return res.status(404).json({message: "Brand not found"})
    } //If the brand is not found, show a message of error

    //If the data is deleted, send a confirmation message
    res.json({message: "Brand deleted"})
}

//Additional endpoints for specific brand operations
brandController.searchBrand = async(req, res) => {
    //This endpoint is used to search a brand by its name
    try{
        const {name} = req.body; //Request the name of the brand that we want to search
        const brand = await brandModels.findOne({name: name.trim()}) //Find the brand by its name, we trim to have a consistent format for the brands
        if(!brand){ 
            return res.status(404).json({message: "Brand not found"})
        } //If the brand is not found, show a message of error

        //If the brand is found, send the data of the brand
        res.json(brand)
    }catch (error) {
        console.error("Error searching brand:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Count the number of brands in the database, this is useful for the admin dashboard to show the number of brands that are available
brandController.countBrands = async(req, res) => {
    try {
        const count = await brandModels.countDocuments() //Count the number of brands in the database
        return res.status(200).json({count}) //Send the count of brands
    } catch (error) {
        console.error("Error counting brands:", error);
        res.status(500).json({message: "Internal server error"})
    }
} 

export default brandController; 
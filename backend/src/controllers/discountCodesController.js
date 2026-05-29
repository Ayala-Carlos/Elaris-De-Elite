const discountCodesController = {};
//Import the model of the discount codes to perform operations on the database
import discountCodesModel from "../models/discountCodes.js";

//SELECT
discountCodesController.getDiscountCodes = async (req, res) =>{
    try {
        const discountCodes = await discountCodesModel.find()
        res.json(discountCodes) 
    } catch (error) {
        console.error("Error getting discount codes:", error);
        res.status(500).json({message: "Internal server error"})
    }
    
}

//INSERT
discountCodesController.createDiscountCode = async (req, res) => {
    try {
        let {code, discountPercentage, expirationDate, isActive, usageLimit} = req.body; //Request the data that is needed to create a discount code

        //Sanitize the data
        code = code.trim().toUpperCase() //Remove spaces and convert to uppercase, this is to avoid duplicates and to have a consistent format for the discount codes

        const newDiscountCode = new discountCodesModel({code, discountPercentage, expirationDate, isActive, usageLimit}) // Send the data to the model to create a new discount code
        //Save the data in the database
        await newDiscountCode.save()
        //If the data is save, show a messagge of confirmation
        res.status(201).json({message: "Discount code saved"})
    } catch (error) {
        console.error("Error creating discount code:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//UPDATE
discountCodesController.updateDiscountCode = async(req, res) => {
    let {code, discountPercentage, expirationDate, isActive, usageLimit} = req.body; //Request the data that is needed to update a discount code

    //Sanitize the data
    code = code.trim().toUpperCase() //Remove spaces and convert to uppercase, this is to avoid duplicates and to have a consistent format for the discount codes

    const updated = await discountCodesModel.findByIdAndUpdate(req.params.id, { //Find the discount code by its id and update it with the new data
        code, discountPercentage, expirationDate, isActive, usageLimit
    }, {new: true})

    if(!updated){ return res.status(404).json({message: "Discount code not found"})} //If the discount code is not found, show a message of error

    //If the data is updated, send a confirmation message
    res.json({message: "Discount code updated"})
}

//DELETE
discountCodesController.deleteDiscountCode = async(req, res) => {
    const deleted = await discountCodesModel.findByIdAndDelete(req.params.id) //Find the discount code by its id and delete it
    if(!deleted){ 
        return res.status(404).json({message: "Discount code not found"})
    } //If the discount code is not found, show a message of error

    //If the data is deleted, send a confirmation message
    res.json({message: "Discount code deleted"})
}

//Additional endpoints for specific discount code operations
discountCodesController.searchByCodeAndIsAvailable = async(req, res) => {
    //This endpoint is used to search a discount code by its code and check if it is available, this is useful for the checkout process to apply the discount code to the order
    try{
        const {code} = req.body; //Request the code of the discount code that we want to search
        const discountCode = await discountCodesModel.findOne({code: code.trim().toUpperCase(), isActive: true}) //Find the discount code by its code, we trim and convert to uppercase to have a consistent format for the discount codes
        if(!discountCode){ 
            return res.status(404).json({message: "Discount code not found"})
        } //If the discount code is not found, show a message of error

        //If the discount code is found, send the data of the discount code
        res.json(discountCode)
    }catch (error) {
        console.error("Error searching discount code:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Count the number of discount codes in the database, this is useful for the admin dashboard to show the number of discount codes that are available
discountCodesController.countDiscountCodes = async(req, res) => {
    try {
        const count = await discountCodesModel.countDocuments() //Count the number of discount codes in the database
        return res.status(200).json({count}) //Send the count of discount codes
    } catch (error) {
        console.error("Error counting discount codes:", error);
        res.status(500).json({message: "Internal server error"})
    }
} 

export default discountCodesController; 
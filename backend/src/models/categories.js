import { Schema, model } from "mongoose"

const categoriesSchema = new Schema({
    name:{
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String
    }
}, {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false
})

//"discountCodes" is the name of the collection that is saved in the DB
export default model("discountCodes", discountCodeSchema)
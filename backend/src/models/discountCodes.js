/*
    Campos:
        code:
        discountPercentage:
        expirationDate:
        isActive:
        usageLimit:
*/

import { Schema, model } from "mongoose"

const discountCodeSchema = new Schema({
    code:{
        type: String,
        unique: true
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100
    },
    expirationDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usageLimit: {
        type: Number,
        default: 1
    }
}, {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false
})

//"discountCodes" is the name of the collection that is saved in the DB
export default model("discountCodes", discountCodeSchema)
/*
    Campos:
        name:
        email:
        password:
        phoneNumber:
        accountStatus:
        isActive:
        loginAttempts:
        timeOut:
        loyaltyPoints:
*/

import { Schema, model } from "mongoose"

const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    timeOut: {
        type: Date
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    }
}, {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false
})

//"customers" is the name of the collection that is saved in the DB
export default model("customers", customerSchema)
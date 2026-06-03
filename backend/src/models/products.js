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

import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    idBrand: {
        type: Schema.Types.ObjectId,
        ref: "brand",
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        image: String,
        public_id: String
    }],
    mainFeatures: [{
        feature: String
    }]
}, {
    timestamps: true,
    strict: false
})

export default model("products", productSchema)
 
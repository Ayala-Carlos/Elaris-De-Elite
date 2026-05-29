/*
    Campos:
        name:
        country:
        status:
        images: []
*/

import { Schema, model } from "mongoose"

const bannerSchema = new Schema({
    name:{
        type: String
    },
    country: {
        type: String
    },
    status:{ 
        type: String
    },
    images:[{ 
        image: {//Image url of cloudinary, this is the path where the image is stored in the server, this is used to display the image in the frontend
            type: String
        },
        public_id: { //Public id of cloudinary, this is the unique identifier of the image in the cloudinary server, this is used to delete the image from the server when we delete the banner
            type: String
        }
    }]
}, {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false
})

//"Banners" is the name of the collection that is saved in the DB
export default model("Banners", bannerSchema)
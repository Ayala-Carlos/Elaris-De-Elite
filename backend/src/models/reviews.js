import mongoose, { Schema, model } from "mongoose"

const reviewsSchema = new Schema({
    idOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    idClient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    comment:{
        type: String
    },
    reviewDate:{
        type: Date
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"reviews" es el nombre de la colección que se guarda en la DB
export default model("reviews", reviewsSchema)
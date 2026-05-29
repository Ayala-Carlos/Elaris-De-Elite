import mongoose, { Schema, model } from "mongoose"

const administratorsSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    address:{
        type: String
    },
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"Administrators" es el nombre de la colección que se guarda en la DB
export default model("Administrators", administratorsSchema)
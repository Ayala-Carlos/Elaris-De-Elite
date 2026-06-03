
import mongoose, { Schema, model } from "mongoose";

const ordersSchema = new Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart", //The name of the coleccion should be "customers" using pascalCase.
    },
    address: [
      {
        country: {
          type: String
        },
        state: {
          type: String,
        },
        city: {
          type: String,
        },
        detailedAddress: {
          type: String,
        },
      },
    ],
    orderStatus: {
      type: String,
    },
    orderDate: {
      type: Date,
    },
    payment: [
        {
            paymentMethod: {
                type: String,
            },
            paymentStatus: {
                type: String,
            },
            paymentDate: {
                type: Date,
            },
        }
    ]
  },
  {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false,
  },
);

//"orders" is the name of the collection that is saved in the DB
export default model("orders", ordersSchema);

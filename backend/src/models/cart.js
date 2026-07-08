/*
        Fields:
            customerId:
            products:
                productId:
                quantity:
                subtotal:
            lastUpdated
            totalAmount:
            discountAmount:
            loyaltyPointsUsed: 
*/

import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers", //The name of the coleccion should be "customers" using pascalCase.
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    lastUpdated: {
        type: Date,
    },
    totalAmount: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
    loyaltyPointsUsed: {
        type: Number
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false,
  },
);

//"cart" is the name of the collection that is saved in the DB
export default model("cart", cartSchema);

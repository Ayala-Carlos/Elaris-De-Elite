import { Schema, model } from "mongoose";

const marketingCampaignSchema = new Schema({

    campaignName: {
        type: String
    },
    platform: {
        type: String
    },
    assignedBudget: {
        type: Number
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String
    }
}, {
    // timestamps: true agrega automáticamente los campos createdAt y updatedAt a la colección.
    timestamps: true,
    // strict: false permite flexibilidad para añadir campos adicionales si es necesario.
    strict: false
});

export default model("marketingCampaings", marketingCampaignSchema);
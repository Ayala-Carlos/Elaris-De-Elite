const marketingCampaingsController = {};
// Importamos el schema de la colección que vamos a ocupar
import marketingCampaingsModel from "../models/marketingCampaings.js";

// SELECT ALL
marketingCampaingsController.getMarketingCampaings = async (req, res) => {
  try {
    const marketingCampaings = await marketingCampaingsModel.find();
    res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error finding marketing campaings" });
  }
};

// INSERT
marketingCampaingsController.createMarketingCampaings = async (req, res) => {
  try {
    // Corregido: campaignName
    const { campaignName, platform, assignedBudget, description, startDate, endDate, status } = req.body; 
    
    // Corregido: pasamos campaignName al nuevo documento
    const newMarketingCampaign = new marketingCampaingsModel({ 
      campaignName, 
      platform, 
      assignedBudget, 
      description, 
      startDate, 
      endDate, 
      status 
    }); 
    
    await newMarketingCampaign.save();
    res.status(201).json({ message: "Marketing campaign saved" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error creating marketing campaign" });
  }
};

// UPDATE
marketingCampaingsController.updateMarketingCampaings = async (req, res) => {
  try {
    // Corregido: campaignName
    const { campaignName, platform, assignedBudget, description, startDate, endDate, status } = req.body; 
    
    await marketingCampaingsModel.findByIdAndUpdate(
      req.params.id,
      {
        // Corregido: actualizamos con la propiedad correcta
        campaignName,
        platform,
        assignedBudget,
        description,
        startDate,
        endDate,
        status
      },
      { new: true },
    );

    res.status(200).json({ message: "Marketing campaign updated" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error updating marketing campaign" });
  }
};

// DELETE
marketingCampaingsController.deleteMarketingCampaings = async (req, res) => {
  try {
    await marketingCampaingsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Marketing campaign deleted" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error deleting marketing campaign" });
  }
};

// SELECT BY ID
marketingCampaingsController.getMarketingCampaignById = async (req, res) => {
  try {
    const campaignId = req.params.id || req.body.id;
    const marketingCampaign = await marketingCampaingsModel.findById(campaignId);

    if (!marketingCampaign) {
      return res.status(404).json({ message: "Marketing campaign not found" });
    }

    return res.status(200).json(marketingCampaign);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error finding marketing campaign" });
  }
};

// SEARCH BY NAME
marketingCampaingsController.searchByName = async (req, res) => {
  try {
    // Corregido: campaignName
    const { campaignName } = req.body;

    // Corregido: hacemos la búsqueda usando la propiedad correcta en la BD
    const marketingCampaings = await marketingCampaingsModel.find({
      campaignName: { $regex: campaignName, $options: "i" },
    });

    if (!marketingCampaings || marketingCampaings.length === 0) {
      return res.status(404).json({ message: "No marketing campaigns found" });
    }

    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching a marketing campaign" });
  }
};

// LOW BUDGET
marketingCampaingsController.lowBudget = async (req, res) => {
  try {
    const marketingCampaings = await marketingCampaingsModel.find({ assignedBudget: { $lt: 1000 } });
    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching marketing campaigns with low budget" });
  }
};

// BUDGET RANGE
marketingCampaingsController.searchByBudgetRange = async (req, res) => {
  try {
    const { min, max } = req.body;
    const marketingCampaings = await marketingCampaingsModel.find({
      assignedBudget: { $gte: min, $lte: max },
    });

    if (!marketingCampaings || marketingCampaings.length === 0) {
      return res.status(404).json({ message: "Marketing campaigns not found" });
    }
    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching marketing campaigns by budget range" });
  }
};

// COUNT DOCUMENTS
marketingCampaingsController.countMarketingCampaings = async (req, res) => {
  try {
    const count = await marketingCampaingsModel.countDocuments();
    return res.status(200).json(count);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export default marketingCampaingsController;
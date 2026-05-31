const marketingCampaingsController = {};
//Importamos el schema de la colección que vamos a ocupar

import marketingCampaingsModel from "../models/marketingCampaings.js";

//SELECT
marketingCampaingsController.getMarketingCampaings = async (req, res) => {
  try {
    const marketingCampaings = await marketingCampaingsModel.find();
    res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error finding marketing campaings" });
  }
};

//INSERT
marketingCampaingsController.createMarketingCampaings = async (req, res) => {
  try {
    const { campaingName, platform, assignedBudget, description, startDate, endDate, status } = req.body; //Pedimos todos los datos que se van a insertar
    const newMarketingCampaign = new marketingCampaingsModel({ campaingName, platform, assignedBudget, description, startDate, endDate, status }); //Mandamos los datos que se solicitan
    //Guardamos los datos
    await newMarketingCampaign.save();
    //Si se guardan los datos enviamos un mensaje de confirmación
    res.status(201).json({ message: "Marketing campaign saved" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error creating marketing campaign" });
  }
};

//UPDATE
marketingCampaingsController.updateMarketingCampaings = async (req, res) => {
  try {
    const { campaingName, platform, assignedBudget, description, startDate, endDate, status } = req.body; //Pedimos todos los datos que se van a actualizar
    await marketingCampaingsModel.findByIdAndUpdate(
      req.params.id,
      {
        //Buscamos el campaign por su id y actualizamos los datos
        campaingName,
        platform,
        assignedBudget,
        description,
        startDate,
        endDate,
        status
      },
      { new: true },
    );

    //Si se actualizan los datos enviamos un mensaje de confirmación
    res.status(200).json({ message: "Marketing campaign updated" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error updating marketing campaign" });
  }
};

//DELETE
marketingCampaingsController.deleteMarketingCampaings = async (req, res) => {
  try {
    await marketingCampaingsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Marketing campaign deleted" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error deleting marketing campaign" });
  }
};

//Select 1 campaign (select for id)
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

//Search for marketing campaign name
marketingCampaingsController.searchByName = async (req, res) => {
  try {
    //#1 Request the data
    const { campaingName } = req.body;

    //#2 Search in the bd table
    //Regex is for search for a word in the name (is "like" in sql), and options i is for ignore case sensitive (ej "laptop" and "Laptop" are the same)
    const marketingCampaings = await marketingCampaingsModel.find({
      campaingName: { $regex: campaingName, $options: "i" },
    });

    //#3 Response
    if (!marketingCampaings) {
      return res.status(404).json({ message: "No marketing campaigns found" });
    }

    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching a marketing campaign" });
  }
};

//Marketing campaigns with low budget
marketingCampaingsController.lowBudget = async (req, res) => {
  try {
    // Search for marketing campaigns with assigned budget less than 1000

    // lt: is for search for products with stock less than 5
    // gt: is for search for products with stock greater than 5

    const marketingCampaings = await marketingCampaingsModel.find({ assignedBudget: { $lt: 1000 } });

    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching marketing campaigns with low budget" });
  }
};

//Filters that the user put
marketingCampaingsController.searchByBudgetRange = async (req, res) => {
  try {
    //#1 Request the min and max
    const { min, max } = req.body;

    //#2 Search in db table
    // lte: is for search for products with stock less than or equal to 5
    // gte: is for search for products with stock greater than or equal to 5
    const marketingCampaings = await marketingCampaingsModel.find({
      assignedBudget: { $gte: min, $lte: max },
    });

    if (!marketingCampaings) {
      return res.status(404).json({ message: "Marketing campaigns not found" });
    }
    return res.status(200).json(marketingCampaings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error searching marketing campaigns by budget range" });
  }
};

//Count how many items (products in this case) are in the bd table
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
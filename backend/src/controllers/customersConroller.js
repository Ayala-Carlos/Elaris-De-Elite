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


import customerModel from "../models/customer.js";

const customersController = {};

//SELECT
customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE
customersController.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await customerModel.findByIdAndDelete(req.params.id);

    if (!deleteCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer eliminated" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
customersController.updateCustomer = async (req, res) => {
  try {
    //Request the data that is needed to update a customer
    let {
        name,
        email,
        password,
        phoneNumber,
        accountStatus,
        isActive,
        loginAttempts,
        timeOut,
        loyaltyPoints,
    } = req.body;

    //Validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    name = name.trim();
    email = email.trim();

    //If email is in the database and is not the same as the current customer's email, show a message of error, this is to avoid duplicates
    const existingCustomer = await customerModel.findOne({ email: email });
    if (existingCustomer && existingCustomer._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if(name.length < 3 || name.length > 15){
        return res.status(400).json({ message: "Invalid name" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if(password.length > 20 || password.length < 6){
        return res.status(400).json({ message: "Password must be less than 20 characters and at least 6 characters" });
    }

    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (accountStatus && !["active", "inactive", "suspended"].includes(accountStatus)) {
      return res.status(400).json({ message: "Invalid account status" });
    }

    if(isActive !== undefined && typeof isActive !== "boolean"){
        return res.status(400).json({ message: "Invalid isActive value" });
    }

    //Actualizaciones
    const updateCustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
        loginAttempts,
        timeOut,
      },
      { new: true },
    );

    if (!updateCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer update" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Additional endpoints for specific customer operations
customersController.searchCustomerByEmail = async(req, res) => {
    try{
        const {email} = req.body; //Request the email of the customer that we want to search
        const customer = await customerModel.findOne({email: email.trim()}) //Find the customer by its email, we trim to have a consistent format for the customer emails
        if(!customer){ 
            return res.status(404).json({message: "Customer not found"})
        } //If the customer is not found, show a message of error

        //If the customer is found, send the data of the customer
        res.json(customer)
    }
    catch (error) {
        console.error("Error searching customer:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Count the number of customers in the database,
customersController.countCustomers = async(req, res) => {
    try {
        const count = await customerModel.countDocuments() //Count the number of customers in the database
        return res.status(200).json({count}) //Send the count of customers
    } catch (error) {
        console.error("Error counting customers:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export default customersController;

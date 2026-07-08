const administratorController = {};

import bcrypt from "bcryptjs";
import administratorModel from "../models/administrators.js";

administratorController.getAdministrators = async (req, res) => {
  try {
    const administrators = await administratorModel.find().select("-password");
    return res.status(200).json(administrators);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 
 *name
 email
 password
 phone
 address
 */

//Update de un administrador
administratorController.updateAdministrator = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //crear validaciones para los datos que se van a actualizar
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //hacer mas validaciones para los datos que se van a actualizar
    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAdministrator = await administratorModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      }, //new: true, es una opción que se utiliza para indicar qsdue se desea obtener el documento actualizado después de realizar la actualización. Si se establece en true, el método findByIdAndUpdate devolverá el documento actualizado en lugar del documento original antes de la actualización.
      { new: true },
    );

    //verificar si se encuentra el administrador por su id, si no se encuentra se manda un mensaje de error
    if (!updatedAdministrator) {
      return res.status(404).json({ message: "Administrator not found" });
    }
    return res.status(200).json({ message: "Administrator updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Delete de un administrador
administratorController.deleteAdministrator = async (req, res) => {
  try {
    const deletedAdministrator = await administratorModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedAdministrator) {
      return res.status(404).json({ message: "Administrator not found" });
    }
    return res.status(200).json({ message: "Administrator deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default administratorController;

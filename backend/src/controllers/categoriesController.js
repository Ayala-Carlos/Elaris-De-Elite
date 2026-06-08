const categoriesController = {};
//Importamos el schema de la colección que vamos a ocupar

import CategoriesModel from "../models/categories.js";

//SELECT
categoriesController.getCategories = async (req, res) =>{
    const categories = await CategoriesModel.find()
    res.json(categories) 
}

//INSERT
categoriesController.createCategory = async (req, res) => {
    const {name, description} = req.body; //Pedimos todos los datos que se van a insertar
    const newCategory = new CategoriesModel({name, description}) //Mandamos los datos que se solicitan
    //le ponemos validaciones a los datos que se van a insertar
    if(!name || !description){
        return res.status(400).json({message: "All fields are required"})
    }
    //se hacen mas validaciones a los datos que se van a insertar
    if(name.length < 3){
        return res.status(400).json({message: "Name must be at least 3 characters"})
    }
    if(description.length < 10){
        return res.status(400).json({message: "Description must be at least 10 characters"})
    }
    //Guardamos los datos
    await newCategory.save()
    //Si se guardan los datos enviamos un mensaje de confirmación
    res.json({message: "Category save"})
}

//UPDATE
categoriesController.updateCategory = async(req, res) => {
    const {name, description, status} = req.body; //Pedimos todos los datos que se van a actualizar
    //se hacen las validaciones a los datos que se van a actualizar
    if(!name || !description || !status){
        return res.status(400).json({message: "All fields are required"})
    }
    if(name.length < 3){
        return res.status(400).json({message: "Name must be at least 3 characters"})
    }
    if(description.length < 10){
        return res.status(400).json({message: "Description must be at least 10 characters"})
    }
    if(status !== "active" && status !== "inactive"){
        return res.status(400).json({message: "Invalid status"})
    }

    const updatedCategory = await CategoriesModel.findByIdAndUpdate(req.params.id, { //Buscamos la categoría por su id y actualizamos los datos
        name, description, status
    }, {new: true})

    //si no encuentra la categoría por su id, se manda un mensaje de error
    if(!updatedCategory){
        return res.status(404).json({message: "Category not found"})
    }

    //Si se actualizan los datos enviamos un mensaje de confirmación
    res.json({message: "Category updated"})
}

//DELETE
categoriesController.deleteCategory = async(req, res) => {
    const deletedCategory = await CategoriesModel.findByIdAndDelete(req.params.id) //Buscamos la categoría por su id y la eliminamos
    if(!deletedCategory){
        return res.status(404).json({message: "Category not found"})
    }
    res.json({message: "Category deleted"})
}

categoriesController.searchByName = async(req, res) => {
    //This endpoint is used to search a category by its name
    try{
        const {name} = req.body; //Request the name of the category that we want to search
        const category = await CategoriesModel.findOne({name: name.trim()}) //Find the category by its name, we trim and convert to lowercase to have a consistent format for the category names
        if(!category){ 
            return res.status(404).json({message: "Category not found"})
        } //If the category is not found, show a message of error

        //If the category is found, send the data of the category
        res.json(category)
    }catch (error) {
        console.error("Error searching category:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

//Count the number of categories in the database, this is useful for the admin dashboard to show the number of categories that are available
categoriesController.countCategories = async(req, res) => {
    try {
        const count = await CategoriesModel.countDocuments() //Count the number of categories in the database
        return res.status(200).json({count}) //Send the count of categories
    } catch (error) {
        console.error("Error counting categories:", error);
        res.status(500).json({message: "Internal server error"})
    }
} 

export default categoriesController; 
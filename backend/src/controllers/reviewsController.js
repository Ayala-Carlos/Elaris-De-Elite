const reviewsController = {};
//Importamos el schema de la colección que vamos a ocupar

import reviewsModel from "../models/reviews.js";

//SELECT
reviewsController.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find()
        res.status(200).json({ message: "Reviews found", reviews })
    } catch (error) {
        res.status(500).json({ message: "Error finding review" });
    }
};

//INSERT
reviewsController.createReviews = async (req, res) => {
    try {
        const { idOrder, idClient, rating, comment, reviewDate } = req.body; //Pedimos todos los datos que se van a insertar
        const newReview = new reviewsModel({ idOrder, idClient, rating, comment, reviewDate }) //Mandamos los datos que se solicitan
        //Guardamos los datos
        //creamos validaciones para el rating, para que solo se puedan insertar números del 1 al 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating. Please enter a rating between 1 and 5." });
        }
        //creamos mas validaciones para el comment, para que no se puedan insertar comentarios vacíos
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }
        await newReview.save()
        //Si se guardan los datos enviamos un mensaje de confirmación
        res.status(201).json({ message: "Review save" })
    } catch (error) {
        res.status(500).json({ message: "Error creating review" });
    }
};

//UPDATE
reviewsController.updateReviews = async (req, res) => {
    try {
        const { idOrder, idClient, rating, comment, reviewDate } = req.body; //Pedimos todos los datos que se van a actualizar

        //se crean validaciones para el rating, para que solo se puedan actualizar números del 1 al 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating. Please enter a rating between 1 and 5." });
        }
        //se crean mas validaciones para el comment, para que no se puedan actualizar comentarios vacíos
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

        const updatedReview = await reviewsModel.findByIdAndUpdate(req.params.id, { //Buscamos la reseña por su id y actualizamos los datos
            idOrder, idClient, rating, comment, reviewDate
        }, { new: true })
        //se valida si pudo actualizar la reseña, si no se encuentra el id se manda un mensaje de error
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        //Si se actualizan los datos enviamos un mensaje de confirmación
        res.status(200).json({ message: "Review updated" })
    } catch (error) {
        res.status(500).json({ message: "Error updating review" });
    }
};

//DELETE
reviewsController.deleteReviews = async (req, res) => {
    try {
        const deletedReview = await reviewsModel.findByIdAndDelete(req.params.id); //Buscamos la reseña por su id y la eliminamos
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted" })

    } catch (error) {
        res.status(500).json({ message: "Error deleting review" });
    }
};

export default reviewsController;
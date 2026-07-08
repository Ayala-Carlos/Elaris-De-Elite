const reviewsController = {};
//Importamos el schema de la colección que vamos a ocupar

import reviewsModel from "../models/reviews.js";
import cartModel from "../models/cart.js";
import ordersModel from "../models/orders.js";

//SELECT
reviewsController.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find().populate("idOrder").populate("idClient").populate("idProduct", "name images"); //Buscamos todas las reseñas y poblamos los campos idOrder, idClient e idProduct para mostrar la información relacionada
        res.status(200).json({ message: "Reviews found", reviews })
    } catch (error) {
        res.status(500).json({ message: "Error finding review" });
    }
};

//SELECT by product
reviewsController.searchByProduct = async (req, res) => {
    try {
        const { idProduct } = req.body;
        const reviews = await reviewsModel.find({ idProduct }).populate("idClient", "name").populate("idProduct", "name images");
        res.status(200).json({ message: "Reviews found", reviews })
    } catch (error) {
        res.status(500).json({ message: "Error finding review" });
    }
};

//INSERT
reviewsController.createReviews = async (req, res) => {
    try {
        const { idClient, idProduct, rating, comment, reviewDate } = req.body; //Pedimos todos los datos que se van a insertar

        //Un cliente solo puede reseñar sus propias compras
        if (idClient !== req.customer.id) {
            return res.status(403).json({ message: "No autorizado" });
        }

        //creamos validaciones para el rating, para que solo se puedan insertar números del 1 al 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating. Please enter a rating between 1 and 5." });
        }
        //creamos mas validaciones para el comment, para que no se puedan insertar comentarios vacíos
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

        //Solo se puede reseñar un producto que ya fue comprado (carrito completado que lo contenga)
        const purchasedCart = await cartModel.findOne({
            customerId: idClient,
            status: "completed",
            "products.productId": idProduct,
        });
        if (!purchasedCart) {
            return res.status(403).json({ message: "Solo puedes reseñar productos que hayas comprado." });
        }

        const purchaseOrder = await ordersModel.findOne({ cartId: purchasedCart._id });

        const newReview = new reviewsModel({ idOrder: purchaseOrder?._id, idClient, idProduct, rating, comment, reviewDate }) //Mandamos los datos que se solicitan
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
        const { idOrder, idClient, idProduct, rating, comment, reviewDate } = req.body; //Pedimos todos los datos que se van a actualizar

        //se crean validaciones para el rating, para que solo se puedan actualizar números del 1 al 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating. Please enter a rating between 1 and 5." });
        }
        //se crean mas validaciones para el comment, para que no se puedan actualizar comentarios vacíos
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

        const updatedReview = await reviewsModel.findByIdAndUpdate(req.params.id, { //Buscamos la reseña por su id y actualizamos los datos
            idOrder, idClient, idProduct, rating, comment, reviewDate
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
import { useCallback, useEffect, useState } from "react";
import { reviewsService } from "../services/reviewsService.js";

export const useProductReviews = (idProduct) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    if (!idProduct) return;
    setLoading(true);
    reviewsService
      .getByProduct(idProduct)
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idProduct]);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async ({ idClient, rating, comment }) => {
    await reviewsService.create({
      idProduct,
      idClient,
      rating,
      comment,
      reviewDate: new Date().toISOString(),
    });
    load();
  };

  return { reviews, loading, error, submitReview };
};

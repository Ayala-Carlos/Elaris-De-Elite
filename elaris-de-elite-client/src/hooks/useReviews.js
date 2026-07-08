import { useEffect, useState } from "react";
import { reviewsService } from "../services/reviewsService.js";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    reviewsService
      .getAll()
      .then((data) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { reviews, loading, error };
};

import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/authJwt.js";

// Controllers
import createReview from "../controllers/reviews/createReview.js";
import deleteReview from "../controllers/reviews/deleteReview.js";
import getReviewById from "../controllers/reviews/getReviewById.js";
import getReviews from "../controllers/reviews/getReviews.js";
import updateReview from "../controllers/reviews/updateReview.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const review = await getReviewById(req.params.id);
      res.status(200).send(review);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { propertyId, userId, rating, comment } = req.body;
    const review = await createReview(propertyId, userId, rating, comment);
    res.status(201).send(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { propertyId, userId, rating, comment } = req.body;
    const updatedReview = await updateReview(
      id,
      propertyId,
      userId,
      rating,
      comment
    );
    res.status(200).send(updatedReview);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    res.status(200).json({
      message: `Review with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

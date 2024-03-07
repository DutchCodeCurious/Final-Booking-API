import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/authJwt.js";

// Controllers
import createAmenity from "../controllers/amenities/createAmenity.js";
import deleteAmenity from "../controllers/amenities/deleteAmenity.js";
import getAmenityById from "../controllers/amenities/getAmenityById.js";
import getAmenities from "../controllers/amenities/getAmenities.js";
import updateAmenity from "../controllers/amenities/updateAmenity.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const Amenities = await getAmenities();
    res.status(200).send(Amenities);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const Amenity = await getAmenityById(req.params.id);
      res.status(200).send(Amenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const Amenity = await createAmenity(name);
    res.status(201).send(Amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAmenity = await updateAmenity(id, name);
    res.status(200).send(updatedAmenity);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenity(id);
    res.status(200).json({
      message: `Amenity with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

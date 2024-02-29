import Express from "express";
import authMiddleware from "../middleware/authJwt.js";

// Controllers
import createProperty from "../controllers/properties/createProperty.js";
import deleteProperty from "../controllers/properties/deleteProperty.js";
import getPropertyById from "../controllers/properties/getPropertyById.js";
import getProperties from "../controllers/properties/getProperties.js";
import updateProperty from "../controllers/properties/updateProperty.js";

import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      title,
      pricePerNight,
      bedroomCount,
      maxGuestCount,
      rating,
      amenities,
    } = req.query;
    const properties = await getProperties(
      title,
      pricePerNight,
      bedroomCount,
      maxGuestCount,
      rating,
      amenities
    );
    res.status(200).send(properties);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong by getting properties" });
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const property = await getPropertyById(req.params.id);
      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId,
    } = req.body;
    const property = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId
    );
    res.status(201).send(property);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong by creating property" });
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId,
    } = req.body;
    const updatedProperty = await updateProperty(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities,
      hostId
    );
    res.status(200).send(updatedProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deleteProperty(id);
    res.status(200).json({
      message: `Property with id: ${id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

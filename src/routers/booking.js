import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/authJwt.js";

// Controllers
import createBooking from "../controllers/bookings/createBooking.js";
import deleteBooking from "../controllers/bookings/deleteBooking.js";
import getBookingById from "../controllers/bookings/getBookingById.js";
import getBookings from "../controllers/bookings/getBookings.js";
import updateBooking from "../controllers/bookings/updateBooking.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.query;
    const Bookings = await getBookings(
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).send(Bookings);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const Booking = await getBookingById(req.params.id);
      res.status(200).send(Booking);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const Booking = await createBooking(
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).send(Booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const updatedBooking = await updateBooking(
      id,
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).send(updatedBooking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBooking(id);
    res.status(200).json({
      message: `Booking with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import dotenv from "dotenv";
import express from "express";

// Errors
import NotFoundError from "./errors/NotFoundError.js";

// Middleware
import log from "./middleware/logMiddleware.js";

// Routes
import usersRouter from "./routers/users.js";
import propertiesRouter from "./routers/properties.js";
import reviewRouter from "./routers/review.js";
import bookingsRouter from "./routers/booking.js";
import hostsRouter from "./routers/hosts.js";
import amenitiesRouter from "./routers/amenities.js";
import loginRouter from "./routers/login.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(log);

app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World, This will be the Booking api</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

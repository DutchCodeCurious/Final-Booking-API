import Express from "express";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";
import authMiddleware from "../middleware/authJwt.js";

// Controllers
import createUser from "../controllers/users/createUser.js";
import deleteUser from "../controllers/users/deleteUser.js";
import getUserById from "../controllers/users/getUserById.js";
import getUsers from "../controllers/users/getUsers.js";
import updateUser from "../controllers/users/updateUser.js";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, id } = req.query;
    const users = await getUsers(username, name, email, phoneNumber);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by getting users" });
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const user = await getUserById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;
    const user = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl
    );
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by creating user" });
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;
    const updatedUser = await updateUser(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.status(200).json({
      message: `User with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
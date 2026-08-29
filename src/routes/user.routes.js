import express from "express";
const router = express.Router();

import {

} from "../controllers/user.controller.js";




router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", verifyJWT, deleteUser);

router.patch("/change-password", verifyJWT, changePassword);

router.post("/logout", verifyJWT, logoutUser);


export default router;



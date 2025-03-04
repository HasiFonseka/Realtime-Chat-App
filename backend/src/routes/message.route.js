import { sendMessage } from "../controllers/message.controller.js"; // Added missing import

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSiderbar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSiderbar);
router.get("/:id", protectRoute, getMessages);

router.post("/sender/:id", protectRoute, sendMessage); // Fixed the route and handler

export default router;

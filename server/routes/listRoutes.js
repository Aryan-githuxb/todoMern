import express from "express";
import { getLists, createList, updateList, deleteList } from "../controllers/listController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware inside the route file for protection
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};

router.get("/", verifyToken, getLists);
router.post("/", verifyToken, createList);
router.put("/:id", verifyToken, updateList);
router.delete("/:id", verifyToken, deleteList);

export default router;
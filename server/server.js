import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/lists", listRoutes);

mongoose.connect("mongodb://localhost:27017/mellowtodo")
.then(() => {
  console.log("MongoDB Connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.error(err));


















































































// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "./models/User.js";
// import List from "./models/List.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // --- Middleware for Auth ---
// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.sendStatus(403);
//   jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     req.userId = decoded.id;
//     next();
//   });
// };

// // --- AUTH ROUTES ---

// // SIGNUP: Uses username (Name), email, and password
// app.post("/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ 
//       username, 
//       email, 
//       password: hashedPassword 
//     });
//     res.json({ message: "User created" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error during signup" });
//   }
// });

// // LOGIN: Uses email and password
// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // 1. Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(403).json({ error: "Invalid email or password" });
//     }

//     // 2. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(403).json({ error: "Invalid email or password" });
//     }

//     // 3. Create Token (passing username so frontend can show "Hi, Name")
//     const token = jwt.sign(
//       { id: user._id, username: user.username }, 
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: '24h' }
//     );

//     res.json({ token, username: user.username });
//   } catch (err) {
//     res.status(500).json({ error: "Server error during login" });
//   }
// });

// // --- LIST ROUTES ---
// app.get("/lists", verifyToken, async (req, res) => {
//   const lists = await List.find({ user: req.userId }).sort({ createdAt: -1 });
//   res.json(lists);
// });

// app.post("/lists", verifyToken, async (req, res) => {
//   const { title, type } = req.body;
//   const list = await List.create({ user: req.userId, title, type, items: [] });
//   res.json(list);
// });

// app.put("/lists/:id", verifyToken, async (req, res) => {
//   const updatedList = await List.findOneAndUpdate(
//     { _id: req.params.id, user: req.userId }, 
//     req.body, 
//     { new: true }
//   );
//   res.json(updatedList);
// });

// app.delete("/lists/:id", verifyToken, async (req, res) => {
//   await List.deleteOne({ _id: req.params.id, user: req.userId });
//   res.json({ message: "Deleted" });
// });

// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mellowtodo")
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("Connection Error:", err));

// app.listen(5000, () => console.log("Server running on port 5000"));
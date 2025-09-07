// server/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import routes
import donationRoutes from './routes/donationRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express(); // ✅ Must come BEFORE app.use()

// ================== Middleware ==================
app.use(cors());
app.use(express.json());

// ================== Test Route (Optional) ==================
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ================== Routes ==================
app.use("/api/donations", donationRoutes);
app.use("/api/books", bookRoutes); // ✅ Moved below 'app' declaration

// ================== MongoDB Connection ==================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoBD Connection Error:", err));

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
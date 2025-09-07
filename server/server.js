// server/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Route Imports
import donationRoutes from './routes/donationRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ================== Middleware ==================
app.use(cors());
app.use(express.json());

// ================== Test Route (optional)
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// ================== Routes ==================
app.use("/api/donations", donationRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes); 

// ================== MongoDB Connection ==================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
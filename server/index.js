import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config({
  path: "./.env",
});

// Connect to the database
databaseConnection();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOptions));
const allowedOrigins = [
    "http://localhost:3000",
    "https://shopiemudit.netlify.app",
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like from Postman) or matching origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
}));

// API routes
app.use("/user", userRouter); // User routes
app.use("/wishlist", wishlistRoutes); // Wishlist routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Mongo URI: ${process.env.MONGO_URI}`);
});

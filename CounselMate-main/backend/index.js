const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userProfileRoutes = require("./routes/userProfileRoute.js");
const aptitudeRoutes = require("./routes/aptitudeRoute.js");
const cookieParser = require("cookie-parser");


require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"], // frontend URLs
  credentials: true, 
})); 


app.use(express.json());
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI, 
      ttl: 24 * 60 * 60, 
    }),
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/user", userProfileRoutes);
app.use("/api/aptitude", aptitudeRoutes);


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});

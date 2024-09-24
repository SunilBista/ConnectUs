const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
require("dotenv").config();

dbConnect()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("Failed to connect to database", error);
  });

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials (if needed)
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("home");
});

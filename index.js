const express = require("express");
const xss = require("xss-clean");
const { createUser, getDbPool } = require("./database");
const authRoutes = require("./routes/auth");
const jobListingRoutes = require("./routes/jobListing");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const employeeRoutes = require("./routes/employee");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log("port: " + PORT);
const pool = getDbPool();
app.listen(PORT, () => console.log("listening on port 5000"));

// Middleware
app.use(express.json());
app.use(xss());
// app.use(
//   cors({
//     origin: "http://localhost:3000/", // TODO - frontend ip
//   })
// );

app.use("/auth", authRoutes);
app.use("/job-list", jobListingRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/employees", employeeRoutes);

// Close connection
process.on("SIGINT", () => {
  pool.end(() => {
    console.log("pool has ended");
    process.exit(0);
  });
});

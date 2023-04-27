const express = require("express");
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

// init app
const app = express();
const PORT = process.env.PORT || 9000;
const authenticate = require("./src/middlewares/authenticate");

// connect to db
require("./src/config/db").connectDB();

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/goals", authenticate, require("./src/routes/goalRoute"));
app.use("/api/v1/users", require("./src/routes/userRoute"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}
// not found route
app.use(require("./src/middlewares/notFoundMiddleware"));

// error handler
app.use(require("./src/middlewares/errorMiddleware"));

// run server
app.listen(PORT, () => {
    console.log((`Server running on port ${PORT}`.blue));
});

import express from "express";
import connectDB from "./db/db.js";
import bodyParser from "body-parser";
import adminRouters from "./routers/adminRouters.js";
import sellerRouters from "./routers/SellerRouters.js";
import authRouters from "./routers/authRouters.js"; 
import userRouters from "./routers/userRouters.js";

const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Welcome To Pruthvi Backend System!" });
});


app.use(bodyParser.json());

// const adminRoutes = require("./routers/adminRouters.js");
// const sellerRouters = require("./routers/SellerRouters.js");


app.use("/auth",authRouters)

app.use("api/users",userRouters)

app.use("/sellers",sellerRouters)

app.use("/admin",adminRouters)














const port = 5000;

app.listen(port, async() => {
    console.log(`Server is running on port ${port}`);
    await connectDB();
});
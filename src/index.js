import express from "express";
import connectDB from "./db/db.js";
import bodyParser from "body-parser";
import adminRouters from "./routers/adminRouters.js";
import sellerRouters from "./routers/SellerRouters.js";
import authRouters from "./routers/authRouters.js"; 
import userRouters from "./routers/userRouters.js";
import sellerProductRouters from "./routers/sellerProductRouters.js";
import productRouters from "./routers/productRouters.js";
import cartRouters from "./routers/cartRouters.js";
import orderRouters from "./routers/orderRouters.js";
import sellerOrderRouters from "./routers/sellerOrderRouters.js";
import paymentRouters from "./routers/paymentRouters.js";
import transactionRouters from "./routers/transactionRouters.js";
import sellerReportRouters from "./routers/sellerReportRouters.js";
import homeCategoryRouters from "./routers/homeCategoryRouters.js";
import dealRouters from "./routers/dealRouters.js";



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
app.use("/products",productRouters)
app.use("/api/sellers/products",sellerProductRouters);
app.use("/api/cart",cartRouters)

app.use("/api/orders",orderRouters)
app.use("/api/seller/orders",sellerOrderRouters)

app.use("/api/payment",paymentRouters)
app.use("/api/transactions",transactionRouters)
app.use("/api/sellers/report",sellerReportRouters)

app.use("/auth",authRouters)
app.use("api/users",userRouters)
app.use("/sellers",sellerRouters)


app.use("/admin",adminRouters)

app.use("/home",homeCategoryRouters);
app.use("/admin/deals",dealRouters);














const port = 5000;

app.listen(port, async() => {
    console.log(`Server is running on port ${port}`);
    await connectDB();
});
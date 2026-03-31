import express from "express";
import connectDB from "./db/db.js";

const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Welcome To Pruthvi Backend System!" });
});

const port = 5000;

app.listen(port, async() => {
    console.log(`Server is running on port ${port}`);
    await connectDB();
});
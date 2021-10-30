const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 5000;

// routes
const authRoutes = require("./routes/auth.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.json({
        limit: "50mb",
    })
);

app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "success",
    });
});

app.listen(PORT, () => {
    console.log("Server on running on PORT " + PORT);
});


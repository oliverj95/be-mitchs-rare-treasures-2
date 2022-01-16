const express = require("express");
const app = express();

// app.use(express.json()) this is for post patch and delete

app.get("/api/treasures", getTreasures)

nodule.exports = app;
import express from "express";
import bodyParser from "body-parser";
import getAllItems from "./routes/api/getAllItems";
import getItem from "./routes/api/getItem";
import config from "./config/default";

const port = config.port as number;

const app = express();

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/items", getAllItems);
app.use("/api/item/:title", getItem);

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

module.exports = { app, server };

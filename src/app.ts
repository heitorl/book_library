import express from "express";
import Routers from "./router";
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

Routers(app);

export default app;

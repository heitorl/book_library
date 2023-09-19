import { Express, Router } from "express";
import bookRouter from "./book.router";

const Routers = (app: Express): void => {
  app.use("/book", bookRouter);
};

export default Routers;

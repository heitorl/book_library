import { Request } from "express";
import { Book } from "../../entities";

declare module "express" {
  interface Request {
    validated?: Book;
  }
}

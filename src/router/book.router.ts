import { Router } from "express";
import { bookController } from "../controllers";
import validateSchema from "../middleware/validatedSchema";
import { createBookSchema } from "../schemas";
import { pagination } from "../middleware/pagination.middleware";

const bookRouter: Router = Router();

bookRouter.post(
  "",
  validateSchema(createBookSchema),
  bookController.createBook
);

bookRouter.get("", pagination, bookController.retrieve);

bookRouter.patch("/rentBook/:id", bookController.rentBook);

bookRouter.patch("/returnBook/:id", bookController.returnBook);

bookRouter.delete("/delete/:id", bookController.deleteBook);

export default bookRouter;

import { Router } from "express";
import { bookController } from "../controllers";
import validateSchema from "../middleware/validatedSchema";
import { createBookSchema } from "../schemas";

const bookRouter: Router = Router();

bookRouter.post(
  "",
  validateSchema(createBookSchema),
  bookController.createBook
);

bookRouter.get("", bookController.retrieve);

bookRouter.patch("/rentBook/:id", bookController.rentBook);

bookRouter.delete("/delete/:id", bookController.deleteBook);

export default bookRouter;

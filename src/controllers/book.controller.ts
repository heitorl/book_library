import { Request, Response } from "express";
import { bookService } from "../service";

class BookController {
  createBook = async (req: Request, res: Response) => {
    console.log("!@@#@!#!");
    const book = await bookService.create(req);

    return res.status(201).json(book);
  };
  retrieve = async (_: Request, res: Response) => {
    const { pagination } = res.locals;
    const books = await bookService.readAll(pagination);

    return res.status(200).json(books);
  };

  rentBook = async (req: Request, res: Response) => {
    const book = await bookService.rentBook(req, res);

    return res.status(200).json(book);
  };

  returnBook = async (req: Request, res: Response) => {
    const book = await bookService.returnBook(req);

    return res.status(200).json(book);
  };

  deleteBook = async (req: Request, res: Response) => {
    await bookService.delete(req, res);
  };
}

export default new BookController();

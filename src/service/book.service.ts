import { Request, Response } from "express";
import { serializedCreateBookSchema } from "../schemas/book.schema";
import { Book } from "../entities";
import { AppDataSource } from "../data-source";

interface ISerializedBook {
  id: string;
  title: string;
  author: string;
  description: string;
}

class BookService {
  create = async ({ validated }: Request): Promise<ISerializedBook> => {
    if (!validated) throw new Error("Validated data is required");

    const book: Partial<Book> = await AppDataSource.getRepository(Book).save(
      validated
    );

    return (await serializedCreateBookSchema.validate(book, {
      stripUnknown: true,
    })) as ISerializedBook;
  };

  readAll = async () => {
    const books = await AppDataSource.getRepository(Book).find({});

    const serializedBooks = await Promise.all(
      books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          available: book.available,
          info: {
            borrowedBy: book.borrowedBy,
            startDate: book.startDate,
            endDate: book.endDate,
          },
        };
      })
    );
    return serializedBooks;
  };

  rentBook = async ({ params, body }: Request, res: Response) => {
    const allowedProperties = ["borrowedBy", "startDate", "endDate"];
    const invalidProperties = Object.keys(body).filter(
      (prop) => !allowedProperties.includes(prop)
    );
    if (invalidProperties.length > 0) {
      return res.status(404).json({
        message: `As propriedades ${invalidProperties.join(
          ", "
        )} não são permitidas para atualização.`,
      });
    }
    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: params.id },
    });

    if (!book) {
      return res.status(404).json({
        message: `Livro com ID ${params.id} não encontrado.`,
      });
    }

    const startDateParts = body.startDate.split("/");
    const endDateParts = body.endDate.split("/");

    const startDate = new Date(
      Number(startDateParts[2]),
      Number(startDateParts[1]) - 1,
      Number(startDateParts[0])
    );

    const endDate = new Date(
      Number(endDateParts[2]),
      Number(endDateParts[1]) - 1,
      Number(endDateParts[0])
    );

    book.available = false;
    book.borrowedBy = body.borrowedBy;

    book.startDate = startDate;
    book.endDate = endDate;

    const updated = await AppDataSource.getRepository(Book).save(book);

    return updated;
  };

  delete = async ({ params }: Request, res: Response) => {
    const deleteResult = await AppDataSource.getRepository(Book).delete(
      params.id
    );

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted" });
  };
}

export default new BookService();

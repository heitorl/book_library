import { Request, Response, request } from "express";
import { serializedCreateBookSchema } from "../schemas/book.schema";
import { Book } from "../entities";
import { AppDataSource } from "../data-source";
import { format, addDays, parse, parseISO } from "date-fns";
import {
  Pagination,
  PaginationParams,
} from "../interfaces/pagination.interface";

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
  readAll = async ({
    nextPage,
    page,
    perPage,
    prevPage,
    order,
    sort,
  }: PaginationParams): Promise<Pagination> => {
    try {
      const [books, count] = await AppDataSource.getRepository(
        Book
      ).findAndCount({
        order: { [sort]: order },
        skip: page, // offset
        take: perPage, // limit
      });

      const serializedBooks = await Promise.all(
        books.map((book) => {
          const startDate =
            book.startDate && format(new Date(book.startDate), "dd/MM/yyyy");

          const endDate =
            book.endDate && format(new Date(book.endDate), "dd/MM/yyyy");

          return {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            available: book.available,
            info: {
              borrowedBy: book.borrowedBy,
              startDate,
              endDate,
            },
          };
        })
      );

      return {
        prevPage: page <= 1 ? null : prevPage,
        nextPage: count - page <= perPage ? null : nextPage,
        count,
        data: serializedBooks,
      };
    } catch (error) {
      console.error(error);
      return {
        prevPage: null,
        nextPage: null,
        count: 0,
        data: [],
      };
    }
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

    if (!body.startDate || !body.endDate) {
      return {
        error: true,
        message: "A data de atual e a data de entrega precisam ser fornecidas.",
      };
    }

    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: params.id },
    });

    if (!book) {
      return res.status(404).json({
        message: `Livro com ID ${params.id} não encontrado.`,
      });
    }

    const startDateString = body.startDate;
    const endDateString = body.endDate;

    const startDate = parse(startDateString, "dd/MM/yyyy", new Date());
    const endDate = parse(endDateString, "dd/MM/yyyy", new Date());

    book.available = false;
    book.borrowedBy = body.borrowedBy;

    book.startDate = startDate;
    book.endDate = endDate;

    const updated = await AppDataSource.getRepository(Book).save(book);

    return updated;
  };

  returnBook = async ({ params }: Request) => {
    try {
      const book = await AppDataSource.getRepository(Book).findOne({
        where: { id: params.id },
      });

      if (!book) {
        return {
          error: true,
          message: "Nenhum livro foi encontrado com o ID fornecido.",
        };
      }
      book.available = true;

      book.borrowedBy = "";
      book.startDate = null;
      book.endDate = null;

      const updatedBook = await AppDataSource.getRepository(Book).save(book);
      console.log("Livro atualizado:", updatedBook);

      return {
        message: "Livro devolvido com sucesso.",
        book: updatedBook,
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: "Ocorreu um erro ao tentar devolver o livro.",
      };
    }
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

  search = async ({ query }: Request, res: Response) => {
    console.log(query);
    const { keyword } = query;

    if (!keyword) {
      return res.status(400).json({ error: "A keyword parameter is required" });
    }

    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const results = await bookRepository
        .createQueryBuilder("book")
        .where("unaccent(book.title) ILIKE unaccent(:keyword)", {
          keyword: `%${keyword}%`,
        })
        .orWhere("unaccent(book.author) ILIKE unaccent(:keyword)", {
          keyword: `%${keyword}%`,
        })
        .getMany();

      const serializedBooks = await Promise.all(
        results.map((book) => {
          const startDate =
            book.startDate && format(new Date(book.startDate), "dd/MM/yyyy");

          const endDate =
            book.endDate && format(new Date(book.endDate), "dd/MM/yyyy");

          return {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            available: book.available,
            info: {
              borrowedBy: book.borrowedBy,
              startDate,
              endDate,
            },
          };
        })
      );

      return res.json(serializedBooks);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while searching for books" });
    }
  };
}

export default new BookService();

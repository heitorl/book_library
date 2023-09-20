import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities";

export const verifyBookIsRent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundBook = await AppDataSource.getRepository(Book).findOne({
      where: { id: req.params.id },
    });

    if (!foundBook) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    if (!foundBook.available) {
      return res.status(409).json({ message: "Livro não está disponível." });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export default verifyBookIsRent;

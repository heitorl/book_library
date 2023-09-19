import { NextFunction, Request, Response } from "express";

export const pagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const queryPage: number = Number(req.query.page); // offset
  const queryPerPage: number = Number(req.query.perPage); // limit

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number =
    queryPerPage && queryPerPage <= 10 && queryPerPage > 0 ? queryPerPage : 10;

  const baseUrl: string = "http://localhost:3000/products";
  const prevPage: string = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  const pagination = {
    page: perPage * (page - 1),
    perPage,
    prevPage,
    nextPage,
  };

  res.locals = { ...res.locals, pagination };

  return next();
};

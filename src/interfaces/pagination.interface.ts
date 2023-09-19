import { Book } from "../entities";

type Pagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<Book>;
};

type PaginationParams = {
  page: number;
  perPage: number;
  prevPage: string | null;
  nextPage: string | null;
};

export { Pagination, PaginationParams };

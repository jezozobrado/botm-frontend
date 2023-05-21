import { useQuery } from "@tanstack/react-query";
import { Book } from "../entities/Book";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

export interface QueryParams {
  ordering?: string;
  mainGenre?: string;
  defaultCategory?: string;
  searchText?: string;
  pageSize?: number;
  pageNumber?: number;
}

interface Response {
  books: Book[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const useBooks = (queryParams?: QueryParams) => {
  const apiClient = new APIClient<Response>("/books");
  return useQuery<Response, AxiosError>({
    queryKey: ["books", queryParams],
    queryFn: () =>
      queryParams
        ? apiClient.getAllBooks({
            params: {
              mainGenre: queryParams?.mainGenre || "",
              defaultCategory: queryParams?.defaultCategory || "",
              ordering: queryParams?.ordering || "",
              searchText: queryParams?.searchText || "",
              pageSize: queryParams?.pageSize,
              pageNumber: queryParams?.pageNumber,
            },
          })
        : apiClient.getAllBooks(),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useBooks;

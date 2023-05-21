import axios, { AxiosRequestConfig } from "axios";
import { ObjectId } from "bson";
import { Params } from "../components/CartItem";
import { Book } from "../entities/Book";
import User from "../entities/User";

export interface CartRequest {
  book: Book;
  customer?: ObjectId | string;
}

const axiosInstance = axios.create({
  baseURL: "https://glacial-basin-38558.herokuapp.com/api",
});

axiosInstance.defaults.headers.common["Authorization"] =
  localStorage.getItem("x-auth-token");

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllBooks = (config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);

  getBook = (slug: string) =>
    axiosInstance.get<T>(this.endpoint + "/" + slug).then((res) => res.data);

  getNewBooks = () =>
    axiosInstance.get<T>(`${this.endpoint}/new-books`).then((res) => res.data);

  addUser = (user: User) =>
    axiosInstance.post<T>(this.endpoint, user).then((res) => {
      localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
      axiosInstance.defaults.headers.common["Authorization"] =
        localStorage.getItem("x-auth-token");
      return res.data;
    });

  authUser = (user: User) =>
    axiosInstance.post<T>(this.endpoint, user).then((res) => {
      localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
      axiosInstance.defaults.headers.common["Authorization"] =
        localStorage.getItem("x-auth-token");

      return res.data;
    });

  addToCart = (cartRequest: CartRequest) =>
    axiosInstance.post<T>(this.endpoint, cartRequest).then((res) => res.data);

  getCartItems = (customer?: ObjectId | string) =>
    axiosInstance
      .get<T>(this.endpoint + "/" + customer)
      .then((res) => res.data);

  removeCartItem = (params: Params) =>
    axiosInstance
      .post<T>(this.endpoint + "/" + params.user + "/" + params.book)
      .then((res) => {
        return res.data;
      });
}

export default APIClient;

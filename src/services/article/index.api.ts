import { AxiosInstance, AxiosResponse } from "axios";
import { RootResponse } from "../../utils/types/rootResponse";
import { ArticleCreate } from "./index.model";

import  articleApiEndpoints  from "./index.endpoint";

export const createArticle = async (article: ArticleCreate,http:AxiosInstance) =>
  await http.post(`${articleApiEndpoints.articles}/create`, {
    title: article.title,
    body: article.body,
    picture: "text",
  }).then((response: AxiosResponse<RootResponse<[]>>) => {
    return response.data;
  });

export const deleteArticle = async (id: number,http:AxiosInstance) =>
  await http.delete(`${articleApiEndpoints.articles}/delete/${id}`).then(
    (response: AxiosResponse<RootResponse<[]>>) => {
      return response.data;
    }
  );

export const updateArticle = async ({ id, data }: any,http:AxiosInstance) =>
  await http.put(`${articleApiEndpoints.articles}/edit/${id}`, {
    title: data.title,
    body: data.body,
  }).then((response: AxiosResponse<RootResponse<[]>>) => {
    return response.data;
  });

export const getAllArticle = async (http:AxiosInstance) =>
  await http.get(articleApiEndpoints.articles).then(
    // (response: AxiosResponse<RootResponse<ArticleResponse[]>>) => {
      (response: any) => {
      return response.data;
    }
  );

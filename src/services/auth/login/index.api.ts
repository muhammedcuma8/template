import {  AxiosResponse, HttpStatusCode } from "axios";
import { RootResponse } from "../../../utils/types/rootResponse";
import { LoginParams } from "./index.model";

import  loginApiEndpoints  from "./index.endpoint";

export const login = async (login: LoginParams) =>
  await login.http.post(loginApiEndpoints.Login, {
    email: login.email,
    password: login.password,
  }).then((response: AxiosResponse<RootResponse<[]>>) => {
    if (response.status === HttpStatusCode.Ok) {
      localStorage.setItem("token", response.data.token as string);
      return response.data.result;
    } else {
      return response.data.message;
    }
  });
export const useLogin = (login: LoginParams) => {
 return login.http.post(loginApiEndpoints.Login, {
  username: login.email,
    password: login.password,
  })
  }
  export const logoutUser =   () => {
    localStorage.removeItem("token");
  };
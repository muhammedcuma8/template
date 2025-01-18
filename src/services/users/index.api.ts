import { useQuery } from "react-query";
import axios, { AxiosInstance } from "axios";

import  UserApiEndpoints  from "./index.endpoint";


export const createUser = async ({ data, http }: any) => {
  try {
    const response = await http.post(`${UserApiEndpoints.Users}/create`, {
      title: data.title,
      body: data.body,
      picture: "text",
    });

    if (response.status === 200) {
      return { success: true, message: "User created successfully" };
    } else {
      return { success: false, message: "An error occurred while creating the product" };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while creating the product" };
  }
};

 

export const deleteUser = async ({ data, http }: any) => {
  console.log(data);
  const response = await http.delete(`${UserApiEndpoints.Users}/delete/${data.id}`);
  return response;
  // try {
  //   const response = await http.delete(`${UserApiEndpoints.Users}/delete/${data.id}`);

  //   if (response.status === 200) {
  //     return { success: true, message: "User deleted successfully" };
  //   } else {
  //     return { success: false, message: "An error occurred while deleting the product" };
  //   }
  // } catch (error) {
  //   return { success: false, message: "An error occurred while deleting the product" };
  // }
};

export const updateUser = async ({ id, data }: any) => {
  try {
    const response = await axios.put(`${UserApiEndpoints.Users}/edit/${id}`, data);

    if (response.status === 200) {
      return { success: true, message: "User updated successfully" };
    } else {
      return { success: false, message: "An error occurred while updating the product" };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while updating the product" };
  }
};

export const getAllUser = async (http: AxiosInstance) => { 
  console.log(http)
  return   await axios.get(UserApiEndpoints.Users)
};
export const getAllRoles = async (http: AxiosInstance) => { 
  console.log(http)
  return   await axios.get(UserApiEndpoints.Roles)
};
export const getAllPermissions = async (http: AxiosInstance) => { 
  console.log(http)
  return   await axios.get(UserApiEndpoints.Permissions)
};
export const getUsers = async ({ http, pageNumber = 0 }:{ http: AxiosInstance, pageNumber: number}) => {  
console.log(http,pageNumber)
  return  await axios.get(UserApiEndpoints.Users);
};
export const getAllPages = async (http: AxiosInstance) => { 
  console.log(http)
  return   await axios.get(UserApiEndpoints.Pages)
};
export const getAllUserRoles = async (http: AxiosInstance) => { 
  console.log(http)
  return   await axios.get(UserApiEndpoints.userRoles)
};
  export const useGetAllUser = (http:AxiosInstance) =>
  useQuery("getAllUser", () => getAllUser(http));
  export const useGetAllRoles = (http:AxiosInstance) =>
  useQuery("getAllRoles", () => getAllRoles(http));
  export const useGetAllPermissions = (http:AxiosInstance) =>
  useQuery("getAllPermissions", () => getAllPermissions(http));
  export const useGetAllPages = (http:AxiosInstance) =>
  useQuery("getAllPages", () => getAllPages(http));
  export const useGetAllUserRoles = (http:AxiosInstance) =>
  useQuery("UserRoles", () => getAllUserRoles(http));
  

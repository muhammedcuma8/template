import { useQuery } from "react-query";
import { AxiosInstance } from "axios";
// import { RootResponse } from "../../utils/types/rootResponse";
// import { ProductResponse } from "./index.model";

import  ProductApiEndpoints  from "./index.endpoint";

// export const createProduct = async ({ data, http }: any) =>
//   await http.post(`${ProductApiEndpoints.Products}/create`, {
//     title: data.title,
//     body: data.body,
//     picture: "text",
//   });
export const createProduct = async ({ data, http }: any) => {
  try {
    const response = await http.post(`${ProductApiEndpoints.Products}/create`, {
      title: data.title,
      body: data.body,
      picture: "text",
    });

    if (response.status === 200) {
      return { success: true, message: "Product created successfully" };
    } else {
      return { success: false, message: "An error occurred while creating the product" };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while creating the product" };
  }
};

// export const deleteProduct = async ({ id, http }: any) =>
//   await http.delete(`${ProductApiEndpoints.Products}/delete/${id}`);

  

export const deleteProduct = async ({ data, http }: any) => {
  console.log(data);
  const response = await http.delete(`${ProductApiEndpoints.Products}/delete/${data.id}`);
  return response;
  // try {
  //   const response = await http.delete(`${ProductApiEndpoints.Products}/delete/${data.id}`);

  //   if (response.status === 200) {
  //     return { success: true, message: "Product deleted successfully" };
  //   } else {
  //     return { success: false, message: "An error occurred while deleting the product" };
  //   }
  // } catch (error) {
  //   return { success: false, message: "An error occurred while deleting the product" };
  // }
};
// export const updateProduct = async ({ id, data, http }: any) => { console.log(data); return await http.put(`${ProductApiEndpoints.Products}/edit/${id}`, data); }

export const updateProduct = async ({ id, data, http }: any) => {
  try {
    const response = await http.put(`${ProductApiEndpoints.Products}/edit/${id}`, data);

    if (response.status === 200) {
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: "An error occurred while updating the product" };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while updating the product" };
  }
};

export const getAllProduct = async (http: AxiosInstance) => { 
  return   await http.get(ProductApiEndpoints.Products)
};
export const getProducts = ({ http, pageNumber = 0 }:{ http: AxiosInstance, pageNumber: number}) => {
  const queryParams = {
    page: pageNumber,
    CurrentPageDataCount:10
  };

  return  http.get(ProductApiEndpoints.Products, {
      params: queryParams
    });
};
  export const useGetAllProduct = (http:AxiosInstance) =>
  useQuery("getAllProduct", () => getAllProduct(http));

  

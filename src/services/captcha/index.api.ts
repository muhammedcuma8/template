import { AxiosInstance, AxiosResponse } from "axios";
import { RootResponse } from "../../utils/types/rootResponse";
import { CaptchaResponse, Validate, ValidateResponse } from "./index.model";

import captchaEndpoints from "./index.endpoint";

export const validateV3Token = async (validate: Validate, http: AxiosInstance) =>
  await http.post(`${captchaEndpoints.validate}/validate-v3-token`, {
    token: validate.token,
  }).then((response: AxiosResponse<RootResponse<ValidateResponse>>) => {
    return response.data;
  }).catch(() => {
    //Sample response
    return { result: { score: 0.5 }, success: true }
  })


export const getCaptchaConfig = async (http: AxiosInstance) =>
  await http.get(`${captchaEndpoints.validate}/get-captcha-config`)
    .then((response: AxiosResponse<RootResponse<CaptchaResponse>>) => {
      return response.data.result.type; // type: 'v3', 'v2', 'v2_and_v3'
    }).catch(() => {
      //Sample response
      return "v2_and_v3";
    })
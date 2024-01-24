/**
 * @author hieubt
 * @email [hieubt2@msb.com.vn]
 * @create date 18/01/2024
 * @modify date 18/01/2024
 * @desc [description]
 */
import { Method } from "axios";
export type ContentType =
  | "docx"
  | "xlsx"
  | "pdf"
  | "xls"
  | "jpeg"
  | "jpg"
  | "png"
  | "txt";

export interface HttpOptionBase {
  data?: any;
  serviceName?: string;
  headers?: any;
  responseType: ResponseType;
  params?: any;
  typeContent?: ContentType;
  accessToken?: string;
}
export interface HttpOptionWithMethod extends HttpOptionBase {
  method?: Method;
}
export interface HttpOptions extends HttpOptionWithMethod {
  endPoint: string;
}

export interface HttpBaseRequest {
  timestamp: string;
  message: "SUCCESS" | string;
  path: string;
  requestId: string;
}
export interface HttpRequest<T> extends HttpBaseRequest {
  data: T | null;
  errorMessage?: string;
  errorCode?: string;
}
export interface HttpRequestError {
  data: null;
  errorMessage: string;
  errorCode: string;
}
export interface HttpRequestList<T> {
  content: T[];
  currentPage: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
}

import { Response } from "express";

export enum ResponseType {
  Success = "success",
  Error = "error",
}

export interface IGeneralResponse {
  response: Response;
  data?: any | null;
  message: string;
  responseType?: ResponseType;
  toast: boolean;
  statusCode: number;
}

export interface IAppError {
  message: string;
  statusCode: number;
  toast: boolean;
  data?: any | null;
}

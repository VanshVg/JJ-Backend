import { IGeneralResponse, ResponseType } from "../types";

export const generalResponse = ({
  response,
  data = null,
  message,
  responseType = ResponseType.Success,
  toast,
  statusCode,
}: IGeneralResponse) => {
  response.status(statusCode).send({
    data,
    message,
    toast,
    responseType,
  });
};

import { IAppError } from "../types";
import { AppError } from "../utils/error.util";

export const throwAppError = ({
  message,
  statusCode,
  toast,
  data = null,
}: IAppError) => {
  throw new AppError(statusCode, message, data, toast);
};

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  [StatusCodes.BAD_REQUEST]: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  [StatusCodes.UNAUTHORIZED]: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};

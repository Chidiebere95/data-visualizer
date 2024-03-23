/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/semi */
import axios from 'axios';

interface IAjax {
  method: string;
  url: string;
  data: Record<string, any>;
  baseURL: string;
  headers?: Record<string, string>;
  before: () => void;
  after: () => void;
  mutate: boolean;
  success: () => void;
  error: () => void;
  handleError: boolean;
  serverError: boolean;
  formErrors: boolean;
  axiosProps: Record<string, string>;
}

// const URL = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_URL : process.env.REACT_APP_URL_PROD;
const URL = 'hehe';

const encIv = process.env.REACT_APP_ENCIV;
const encryptKey = process.env.REACT_APP_ENCRYPTION_KEY;
// Axios instance
export const axiosInstance = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor callbacks
// Request Success
const requestInterceptorSuccessCB = async (successfulReq: any) => {
  // const ctoken = await genCaptchaKeyAsync(process.env.REACT_APP_CAPTCHA_KEY as string);
  if (successfulReq.method === 'post' || successfulReq.method === 'POST') {
    const dataWithCtoken = {
      ...successfulReq.data,
      // ctoken,
    };

    const JSONData = JSON.stringify(dataWithCtoken);
    successfulReq.data = JSONData;
  }
  const authToken = localStorage.getItem('console_token') && localStorage.getItem('console_token') !== 'null' ? JSON.parse(localStorage.getItem('console_token') as string).access_token : null;

  // Set the authorization header

  if (authToken) {
    successfulReq.headers.Authorization = `Bearer ${authToken as string}`;
  }

  return successfulReq;
};

// Request Error
const requestInterceptorErrorCB = async (error: any) => {
  if (error.config.method === 'post' || error.config.method === 'POST') {
    error.response = {
      ...error.response,
      data: JSON.parse(error.response.data),
    };
  }
  return await Promise.reject(error);
};

// Response interceptor callbacks
// Response Success
const responseInterceptorSuccessCB = (successRes: any) => {
  // const store = getStore();
  // dispatchAction(loginUser());

  if (successRes.config.method === 'post' || successRes.config.method === 'POST') {
    // console.log(successRes);
  }
  return successRes;
};

// Response Error
const responseInterceptorErrorCB = async (error: any) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && error.response?.data.message === 'authorization failed, invalid bearer token' && !originalRequest?._retry) {
    originalRequest._retry = true;
    const token = JSON.parse(localStorage.getItem('console_token') as string);
    const refreshToken = token.refresh_token;
    await axios
      .post(`${URL!}/auth/refresh-token`, { refresh_token: refreshToken })
      .then(async ({ data }) => {
        token.access_token = data.message.access_token;
        localStorage.setItem('console_token', JSON.stringify(token));
        // api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${data.message.access_token as string}`;
        return await requestInterceptorSuccessCB(originalRequest);
      })
      .catch((error) => {
        if (error.response?.status === 400 && error.response?.data.message === 'Invalid refresh token') {
          localStorage.removeItem('console_token');
          window.location.replace('/');
        }
      });
    return;
  } else if (error.response?.status === 400 && error.response?.data.message === 'invalid refresh token') {
    window.location.replace('/');
  }

  return await Promise.reject(error.response.data);
};

(() => {
  //   if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
  // Request interceptor
  axiosInstance.interceptors.request.use(requestInterceptorSuccessCB, requestInterceptorErrorCB);

  // Response interceptor
  axiosInstance.interceptors.response.use(responseInterceptorSuccessCB, responseInterceptorErrorCB);

  // axiosInstance.interceptors.request.eject(baseURLInterceptor);
  //   }
})();

// Handle Response Data
const handleHttpResponse = (response: Record<string, any>, success: (arg: Record<string, any>) => void) => {
  // No Data Was Returned
  if (!response.data) {
    return;
  }

  if (response.data.success) {
    success(response);
  }
};

// Handle Response Errors
interface HttpError {
  response: Record<string, any>;
  error: ({ status }: any) => void;
  formErrors: boolean;
}
function handleHttpError({ response, error, formErrors }: HttpError) {
  // No Response Was Returned
  if (!response) {
    error({ status: 449 });
    return;
  }

  error(response);

  // Handle Error States / Codes
  switch (response.status) {
    case 400:
      // Bad Request
      break;
    case 404:
      // Not Found
      break;
    case 419:
      // X-CSRF-TOKEN Error
      break;
    case 422:
      if (formErrors) {
        // Input Data Error
      }
      break;
    case 500:
      // Server Error
      break;
    case 504:
      // Gateway Timeout
      break;

    // ================================================================================
    // ================================================================================
    // Custom Error Codes
    // ================================================================================
    // ================================================================================
    case 449:
      // Just Try Again
      break;
    default:
      // Unknown Error
      break;
  }
}

// Send HTTP Request
async function ajax({
  method = 'GET',
  url,
  data,
  baseURL,
  headers = {},
  before = () => {},
  after = () => {},
  mutate = false,
  success = () => {},
  error = () => {},
  handleError = true,
  serverError = false,
  formErrors = true,
  axiosProps = {},
}: IAjax) {
  // Request Response And Error
  interface Result {
    status: string;
    data: string | Array<Record<string, string>> | Record<string, string>;
    message: string | Record<string, string>;
    error: string | boolean;
  }

  let result: Result = {
    message: '',
    data: '',
    status: '',
    error: '',
  };
  // Call Before Function
  before();

  // Send Request
  await axiosInstance({
    // Request URL
    url,
    // Request Method
    method,
    // To overwrite incase
    baseURL,
    // Post Data
    data,
    // Request Headers
    headers,
    // Axios Specific Properties
    ...axiosProps,
  })
    .then((response) => {
      // Assign Request Response
      result = response.data;
      if (result.status !== 'success') {
        throw new Error(`${result.status} ${result.message as string}`);
      }

      // Handle Responses
      handleHttpResponse(response, success);
    })
    .catch((err) => {
      // Assign Response Error

      result.error = true;
      result.message = err.message;
      result.status = err.status;

      // Handle Errors
      if (handleError) {
        handleHttpError({
          ...err,
          error,
          serverError,
          formErrors,
        });
      }
    });

  // Call After Function With Response As Parameter
  //   after(result);

  return result;
}

// Send GET Requests
export const get = async (payload: any) => await ajax({ ...payload, method: 'GET' });

// Send POST Requests
export const post = async (payload: any) => await ajax({ ...payload, method: 'POST' });

// Send Delete Requests
export const del = async (payload: any) => await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload: any) => await ajax({ ...payload, method: 'PUT' });

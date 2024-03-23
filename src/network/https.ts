import axios from 'axios';
const URL = process.env.REACT_APP_URL || '';

interface IProps {
  method: string;
  url: string;
  data: any;
  baseURL: string;
}

async function ajax({ method = 'GET', url, data, baseURL }: IProps) {
  let result;
  const contentType = 'application/json';

  const axiosInstance = axios.create({
    baseURL: baseURL || URL,
    // timeout: 5000, // Set a timeout if needed
    headers: {
      'Content-Type': contentType,
    },
  });

  await axiosInstance({
    url,
    method,
    data,
  })
    .then((response) => {
      // interceptors already intercepted
      const { data } = response;
      result = data;
    })
    .catch((err) => {
      console.log('axios err', err);
      result = err.response?.data;
    });
  return result;
}

// Send GET Requests
export const get = async (payload: any) =>
  await ajax({ ...payload, method: 'GET' });

// Send POST Requests
export const post = async (payload: any) =>
  await ajax({ ...payload, method: 'POST' });

// Send Delete Requests
export const del = async (payload: any) =>
  await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload: any) =>
  await ajax({ ...payload, method: 'PUT' });

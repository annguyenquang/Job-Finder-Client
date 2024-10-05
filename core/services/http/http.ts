import axios, { CreateAxiosDefaults } from "axios"

const baseURL = process.env.SOME_API_URL || 'https://dummyjson.com';

export const http = () => {
  const defaultOption: CreateAxiosDefaults = {
    baseURL,
  };


  const instance = axios.create(defaultOption);

  //       instance.interceptors.request.use(async (request) => {
  //     const session = await getSession();
  //     if (session) {
  //       request.headers.Authorization = `Bearer ${session.jwt}`;
  //     }
  //     return request;
  //   });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    },
  );

  return instance;
}
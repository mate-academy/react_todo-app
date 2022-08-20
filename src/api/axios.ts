import axios from 'axios';

export const USER_ID = 4009;

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
  timeout: 1000,
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(
      url,
      {
        params: {
          userId: USER_ID,
        },
      },
    );

    return response.data;
  },
  async post<T>(url: string, data: unknown) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },
  async patch<T>(url: string, data: unknown) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },
  async delete(url: string) {
    return instance.delete(url);
  },
};

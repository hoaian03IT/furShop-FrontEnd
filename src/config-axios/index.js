import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:3333/api/",
  timeout: 100,
  headers: { "Content-Type": "application/json" },
});

export const get = async (url, options = {}, config) => {
  const data = await request.get(url, { params: options }, config);
  return data;
};

export const post = async (url, options, config) => {
  const data = await request.post(url, options, config);
  return data;
};

export const remove = async (url, options, config) => {
  const data = await request.delete(url, { data: options }, config);
  return data;
};

export const put = async (url, options, config) => {
  const data = await request.put(url, options, config);
  return data;
};

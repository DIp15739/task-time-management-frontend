const axios = require("axios");
/** Set base url for api */
axios.defaults.baseURL = process.env.REACT_APP_API;

/**
 * Parse and return HTTP API response
 * @param res
 */
const getResponse = (res?: any) => {
  if (res && (res.status === 200 || res.status === 201 || res.status === 204)) {
    return res.data;
  }
  throw new Error("Some error occur");
};

/**
 * Get request
 * @param path      API url path
 * @param params    Request parameters
 * @param headers    Request header
 */
export const get = (path: string, params?: any, headers?: any) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(path, { headers, params })
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Post request
 * @param path      API url path
 * @param params    Request parameters
 */
export const post = (path: string, params?: any, headers?: any) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(path, params, { headers })
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Put request
 * @param path      API url path
 * @param params    Request parameters
 * @param headers   Request headers
 */
export const put = (path: string, params?: any, headers?: any) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(path, params, { headers })
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

import axios from "axios";

const axiosInst = axios.create({
  baseURL: `https://pet-care-endpoint.herokuapp.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepts each API request and adds Auth header
axiosInst.interceptors.request.use(async (request) => {
  const jwtToken = await localStorage.getItem("token");
  if (jwtToken) {
    request.headers["Authorization"] = jwtToken;
  }
  return request;
});

async function callApi(url, method, headers, body) {
  try {
    const options = {
      method,
      url,
      headers: headers,
      mode: "cors",
    };
    if (method !== "GET" && body) {
      options.data = body;
    }
    const response = await axiosInst(options);
    return response.data;
  } catch (error) {
    console.log("Error Details url, method, headers, body, error", {
      url,
      method,
      headers,
      body,
      error,
    });
    throw error;
  }
}

export const GET = (path, headers = {}) => callApi(path, "GET", headers);
export const POST = (path, body, headers = {}) =>
  callApi(path, "POST", headers, body);
export const PUT = (path, body, headers = {}) =>
  callApi(path, "PUT", headers, body);
export const DELETE = (path, body, headers = {}) =>
  callApi(path, "DELETE", headers, body);

export default axiosInst;

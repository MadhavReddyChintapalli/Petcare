import { GET, POST, PUT, DELETE } from "./util";

export const fetchServices = async () => {
  const resp = await GET("/api/services");
  return resp;
};

export const getServiceData = async (id) => {
  const resp = await GET("/api/services/" + id);
  return resp;
};

export const postService = async (body) => {
  await POST("/api/services", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};

export const updateService = async (id, body) => {
  await PUT("/api/services/" + id, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};

export const deleteService = async (id) => {
    const resp = await DELETE("/api/services/" + id);
    return resp;
  };
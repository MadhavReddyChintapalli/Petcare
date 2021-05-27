import { GET, POST, PUT, DELETE } from "./util";

export const fetchSales = async () => {
  const resp = await GET("/api/sale");
  return resp;
};

export const getSaleData = async (id) => {
  const resp = await GET("/api/sale/" + id);
  return resp;
};

export const saleFeed = async (body) => {
  await POST("/api/sale", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};

export const updateSale = async (id, body) => {
  await PUT("/api/sale/" + id, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};

export const deleteSale = async (id) => {
  await DELETE("/api/sale/" + id);
  return;
};
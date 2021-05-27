import { GET, POST, PUT } from "./util";

export const fetchFeeds = async () => {
  const resp = await GET("/api/feeds");
  return resp;
};

export const getFeedData = async (id) => {
  const resp = await GET("/api/feeds/" + id);
  return resp;
};

export const postFeed = async (body) => {
  await POST("/api/feeds", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};

export const updateFeed = async (id, body) => {
  await PUT("/api/feeds/" + id, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return;
};
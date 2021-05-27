import { POST } from "./util";

export const handleLogin = async (email, password) => {
  const resp = await POST("/login", {
    email,
    password,
  });
  return resp;
};

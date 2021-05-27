import { POST } from "./util";

export const handleRegister = async (name, email, password) => {
  const resp = await POST("/register", {
    name,
    email,
    password,
  });
  return resp;
};

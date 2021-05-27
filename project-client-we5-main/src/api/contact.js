import { POST } from "./util";

export const postContactDetails = async (body) => {
  await POST("/contactUs", body);
  return;
};

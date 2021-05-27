import { POST } from "./util";

export const updateFoundPetInfo = async (reqBody) => {
  try {
    await POST("https://pet-care-endpoint.herokuapp.com/api/found-pets/", reqBody);
    return true;
  } catch (e) {
    return false;
  }
};

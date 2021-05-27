import { POST } from "./util";

export const updateLostPetInfo = async (reqBody) => {
  try {
    await POST("https://pet-care-endpoint.herokuapp.com/api/lost-pets/", reqBody);
    return true;
  } catch (e) {
    return false;
  }
};

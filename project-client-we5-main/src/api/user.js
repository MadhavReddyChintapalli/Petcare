import { GET, PUT } from "./util";



export const getUser = async (id) => {
    const resp = await GET("/api/user/" + id);
    return resp;
};


export const updateUser = async (body) => {
    await PUT("/api/user", body, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return;
};

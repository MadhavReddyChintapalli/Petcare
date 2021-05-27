import { GET, POST, PUT } from "./util";

export const fetchEvents = async () => {
    const resp = await GET("/api/event");
    return resp;
};

export const getEventData = async (id) => {
    const resp = await GET("/api/event/" + id);
    return resp;
};

export const postEvent = async (body) => {
    await POST("/api/event", body, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return;
};

export const updateEvent = async (id, body) => {
    await PUT("/api/event", body, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return;
};

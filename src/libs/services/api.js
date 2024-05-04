import service from "../axios";

export default {
  app: {
    get: (url, id) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return service.post(url);
      }
      return service.get(`${url}${id ? `/${id}` : ""}`);
    },
    create: (url, data) => service.post(url, data),
    update: (url, id, data) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return service.post(url, data);
      }
      if (id) {
        return service.put(`${url}/${id}`, data);
      }
      if (!id) {
        return service.put(`${url}`, data);
      }
    },
    delete: (url, id) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return service.post(url);
      }
      return service.delete(`${url}/${id}`);
    },
  },
};

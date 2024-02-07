import $axios from "../axios";

export default {
  app: {
    get: (url, id) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return $axios.post(url);
      }
      return $axios.get(`${url}${id ? `/${id}` : ""}`);
    },
    create: (url, data) => $axios.post(url, data),
    update: (url, id, data) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return $axios.post(url, data);
      }
      if (id) {
        return $axios.put(`${url}/${id}`, data);
      }
      if (!id) {
        return $axios.put(`${url}`, data);
      }
    },
    delete: (url, id) => {
      if (Array.isArray(id)) {
        url += id.reduce((query, val) => {
          query += `/${val}`;
          return query;
        }, "");
        return $axios.post(url);
      }
      return $axios.delete(`${url}/${id}`);
    },
  },
};

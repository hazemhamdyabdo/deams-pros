import { createStore } from "vuex";

// Modules
import app from "./app/index.js";
import auth from "./auth/index.js";


export default createStore({
  modules: {
    app,
    auth,
  },
  strict: process.env.DEV,
});
import Router from "@/router";
import { TOKEN_KEY, PROFILE_KEY, BRANCH_ID } from "@/libs/acl/config";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY) || null,
    profile: JSON.parse(localStorage.getItem(PROFILE_KEY)) || {
      isAdmin: false,
    },
    branchId: localStorage.getItem(BRANCH_ID) || null,
  },
  getters: {
    token: (state) => state.token || null,
    profile: (state) => state.profile || {},
    branchId: (state) => state.branchId || null,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem(TOKEN_KEY, token);
      state.token = token;
    },
    setProfile(state, profile) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      state.profile = profile;
    },
  },
  actions: {
    login({ commit, dispatch }, { userName, password }) {
      dispatch(
        "app/create",
        { url: "Users/auth", data: { userName, password } },
        { root: true }
      ).then((data) => {
        commit("setToken", data.value.token);
        commit("setProfile", data.value);
        Router.push("/dashboard");
      });
    },
    logout({ commit }) {
      this.state.app.branchId = null;
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(PROFILE_KEY);
      commit("setToken", "");
      commit("setProfile", {});
      Router.push("/login");
    },
    changePassword() {
      Router.push("/change-password");
    },
  },
};

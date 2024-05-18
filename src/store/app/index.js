// import { $themeBreakpoints } from '@themeConfig';
import api from "@/libs/services/api";
import { BRANCH_ID, CURRENT_YEAR } from "@/libs/acl/config";

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    branches: [],
    fiscalYears: [],
    branchId: parseInt(window.localStorage.getItem(BRANCH_ID), 10) || 0,
    userCurrentYear: JSON.parse(window.localStorage.getItem(CURRENT_YEAR)) || 0,
    currentBranch: {},
    currentCompany: {},
    currentYear: {},
    overlay: false,
  },
  getters: {
    overlay: (state) => state.overlay,
    branches: (state) => state.branches,
    branchId: (state) => state.branchId || state.branches[0]?.id,
    fiscalYears: (state) => state.fiscalYears,
    currentBranch: (state) => state.currentBranch,
    currentCompany: (state) => state.currentCompany,
    userCurrentYear: (state) => state.userCurrentYear,
    currentYear: (state) => state.currentYear,
    currentBreakPoint: (state) => {
      const { windowWidth } = state;
      if (windowWidth >= $themeBreakpoints.xl) return "xl";
      if (windowWidth >= $themeBreakpoints.lg) return "lg";
      if (windowWidth >= $themeBreakpoints.md) return "md";
      if (windowWidth >= $themeBreakpoints.sm) return "sm";
      return "xs";
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val;
    },
    TOGGLE_OVERLAY(state, val) {
      // state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay;
      // state.overlay = val !== undefined ? val : !state.overlay;
    },
    setCurrentYear(state, year) {
      state.currentYear = year;
      window.localStorage.setItem(
        CURRENT_YEAR,
        JSON.stringify(state.currentYear)
      );
    },
    setCurrentBranch(state, branch) {
      state.currentBranch = branch;
      state.branchId = branch.id;
      window.localStorage.setItem(BRANCH_ID, branch.id);
    },
    setCompany(state, company) {
      state.currentCompany = company;
      //  window.localStorage.COMAPNY_LOGO = state.currentCompany.logoUrl;
    },
  },
  actions: {
    setYears({ rootGetters, state }, fiscalYears) {
      const profile = rootGetters["auth/profile"];
      state.fiscalYears = fiscalYears;
      if (JSON.stringify(state.userCurrentYear) === "{}") {
        state.userCurrentYear = {
          ...state.fiscalYears.find(
            (item) => item.year === new Date().getFullYear()
          ),
        };
        // state.userCurrentYear = {
        //   year: new Date(state.currentCompany.fiscalYearStart).getFullYear(),
        //   startDate: state.currentCompany.fiscalYearStart,
        //   endDate: state.currentCompany.fiscalYearEnd,
        // }
      }
      if (profile.isAdmin) {
        state.currentYear = {
          ...state.fiscalYears.find(
            (item) => item.year === state.userCurrentYear.year
          ),
        };
      }
      if (
        profile.isAdmin === false &&
        profile.permissions.indexOf("viewFiscalYears") > -1
      ) {
        state.currentYear = {
          ...state.fiscalYears.find(
            (item) => item.year === state.userCurrentYear.year
          ),
        };
      }
      if (
        profile.isAdmin === false &&
        profile.permissions.indexOf("viewFiscalYears") === -1
      ) {
        state.currentYear = state.fiscalYears[0];
        // state.currentYear = {
        //   year: new Date(state.currentCompany.fiscalYearStart).getFullYear(),
        //   startDate: state.currentCompany.fiscalYearStart,
        //   endDate: state.currentCompany.fiscalYearEnd,
        // }
      }
      state.userCurrentYear = state.currentYear;
      window.localStorage.setItem(
        CURRENT_YEAR,
        JSON.stringify(state.currentYear)
      );
    },
    setBranches({ rootGetters, state }, branches) {
      const profile = rootGetters["auth/profile"];
      // profile.branches = []
      const res = branches.filter((x) =>
        profile.branches.some((b) => b === x.id)
      );
      if (res.length < 1) state.branches = branches;
      else state.branches = res;
      state.currentBranch = {
        ...(state.branchId
          ? state.branches.find((item) => item.id === state.branchId)
          : state.branches[0]),
      };
      state.branchId = state.currentBranch.id;
      window.localStorage.setItem(BRANCH_ID, state.currentBranch.id);
      // window.localStorage.COMAPNY_LOGO = state.currentCompany.logoUrl;
    },
    getAll({ commit }, { endpoints, callback }) {
      commit("TOGGLE_OVERLAY", true);
      Promise.all(endpoints.map((endpoint) => api.app.get(endpoint)))
        .then((data) => {
          commit("TOGGLE_OVERLAY", false);
          data = data.map((item) => item.data);
          callback(data);
        })
        .finally(() => {
          commit("TOGGLE_OVERLAY", false);
        });
    },
    get({ commit }, { id, url }) {
      if (url === "ItemTransactions/Resturants/incomplete-orders") {
        commit("TOGGLE_OVERLAY", false);
      } else {
        commit("TOGGLE_OVERLAY", true);
      }
      return new Promise((resolve, reject) => {
        api.app
          .get(url, id)
          .then(({ data }) => {
            resolve(data);
            commit("TOGGLE_OVERLAY", false);
          })
          .catch((error) => {
            console.error(error);
            // reject(error);
            commit("TOGGLE_OVERLAY", false);
          })
          .finally(() => {
            commit("TOGGLE_OVERLAY", false);
          });
      });
    },
    create({ commit }, { url, data }) {
      commit("TOGGLE_OVERLAY", true);
      return new Promise((resolve, reject) => {
        api.app
          .create(url, data)
          .then((res) => {
            resolve(res.data);
            commit("TOGGLE_OVERLAY", false);
          })
          .catch(({ response }) => {
            console.error(response);
            // reject(response);
            commit("TOGGLE_OVERLAY", false);
          })
          .finally(() => {
            commit("TOGGLE_OVERLAY", false);
          });
      });
    },
    update({ commit }, { url, data, id }) {
      commit("TOGGLE_OVERLAY", true);
      return new Promise((resolve, reject) => {
        api.app
          .update(url, id, data)
          .then((res) => {
            resolve(res);
            commit("TOGGLE_OVERLAY", false);
          })
          .catch(({ response }) => {
            console.error(response);
            // reject(response);
            commit("TOGGLE_OVERLAY", false);
          })
          .finally(() => {
            commit("TOGGLE_OVERLAY", false);
          });
      });
    },
    delete({ commit }, { url, id }) {
      commit("TOGGLE_OVERLAY", true);
      return new Promise((resolved, reject) => {
        api.app
          .delete(url, id)
          .then(() => {
            resolved();
            commit("TOGGLE_OVERLAY", false);
          })
          .catch(({ response }) => {
            // reject(response);
            commit("TOGGLE_OVERLAY", false);
          })
          .finally(() => {
            commit("TOGGLE_OVERLAY", false);
          });
      });
    },
  },
};

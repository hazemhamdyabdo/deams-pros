import Vue from "vue";
import Router from "@/router";
import VueI18n from "@/libs/i18n/index";

// axios
import axios from "axios";

import {
  baseURL,
  TOKEN_KEY,
  PROFILE_KEY,
  LANG,
  BRANCH_ID,
  CURRENT_YEAR,
} from "./acl/config";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

axiosIns.interceptors.request.use((request) => {
  if (request.method === "post" || request.method === "put") {
    if (request.data) {
      if (Object.prototype.hasOwnProperty.call(request.data, "englishName")) {
        request.data.englishName =
          request.data.englishName || request.data.arabicName;
      }
    }
  }
  const token = window.localStorage.getItem(TOKEN_KEY);
  const lang = window.localStorage.getItem(LANG);
  const branchId = window.localStorage.getItem(BRANCH_ID);
  const fiscalYear = window.localStorage.getItem(CURRENT_YEAR);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  request.headers.Language = lang || "en";
  request.headers.Branch = branchId;
  //   if (JSON.parse(fiscalYear)) {
  //     request.headers.FiscalYear = JSON.parse(fiscalYear).year;
  //   } else {
  //     request.headers.FiscalYear = new Date().getFullYear();
  // }

  return request;
});

axiosIns.interceptors.response.use(undefined, (error) => {
  // const token = window.localStorage.getItem(TOKEN_KEY)
  if (error.response.status === 401) {
    // const lang = window.localStorage.getItem(LANG);
    window.localStorage.setItem(TOKEN_KEY, "");
    window.localStorage.removeItem(PROFILE_KEY);
    globalProperties.swal({
      icon: "error",
      title: VueI18n.t("error"),
      text:
        error.response.data.title === "Unauthorized"
          ? "خطأ في اسم المستخدم او كلمة المرور"
          : error.response.data.detail,
      timer: 2000,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
    Router.push("/login");
  } else if ([400, 409].includes(error.response.status)) {
    globalProperties.swal({
      icon: "error",
      title: VueI18n.t("error"),
      text: error.response.data.detail,
      timer: 60000,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  }
  return Promise.reject(error);
});

export default axiosIns;

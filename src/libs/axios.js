// axios.js
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import i18n from "@/libs/i18n/index";

import {
  baseURL,
  TOKEN_KEY,
  PROFILE_KEY,
  LANG,
  BRANCH_ID,
  CURRENT_YEAR,
} from "./acl/config";

const axiosIns = axios.create({
  baseURL: baseURL,
});

axiosIns.interceptors.request.use((request) => {
  if (request.method === 'post' || request.method === 'put') {
    if (request.data) {
      if (Object.prototype.hasOwnProperty.call(request.data, 'englishName')) {
        request.data.englishName = request.data.englishName || request.data.arabicName;
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

  return request;
});

axiosIns.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    window.localStorage.setItem(TOKEN_KEY, "");
    window.localStorage.removeItem(PROFILE_KEY);
    Swal.fire({
      icon: "error",
      title: i18n.global.t("error"),
      text:
        error.response.data.title === "Unauthorized"
          ? "خطأ في اسم المستخدم او كلمة المرور"
          : error.response.data.detail,
      timer: 2000,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
    router.push("/login");
  } else if ([400, 409].includes(error.response.status)) {
    Swal.fire({
      icon: "error",
      title: i18n.global.t("error"),
      text: error.response.data.errors[0].message,
      timer: 60000,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  }
  return Promise.reject(error);
});

export default axiosIns;

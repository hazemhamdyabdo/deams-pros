import { createApp } from "vue";
// import apps from './app';
import store from "./store/index";
import { router } from "./router";
import App from "./App.vue";
// mixin
import SomeMixin from "./mixin/global";
import { BootstrapVue3, BToastPlugin } from "bootstrap-vue-3";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import FlagIcon from "vue-flag-icon";
import Select2 from "vue3-select2-component";
// import DatePicker from "vue3-datepicker";
import VueDatePicker  from '@vuepic/vue-datepicker';
import Vue3Autocounter from "vue3-autocounter";
import Toaster from "@meforma/vue-toaster";
import SummernoteEditor from "vue3-summernote-editor";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import StarRating from "vue-star-rating";
import VueFeather from "vue-feather";
import VueApexCharts from "vue3-apexcharts";
import VueEasyLightbox from "vue-easy-lightbox";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueFormWizard from "vue3-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

//shared
import GForm from "./components/form/index.vue";
import GField from "./components/form/inputs/field.vue";
import GPicker from "./components/form/inputs/datePicker.vue";
import GSelect from "./components/form/inputs/select.vue";
import i18n from "@/libs/i18n";
import axiosIns from "@/libs/axios";
import "@validations";
/*********Header component**********/
import Header from "./views/layouts/header.vue";
import Headertwo from "./views/layouts/header-two.vue";
import HeaderPos from "./views/layouts/headerpos.vue";
import Loader from "./views/layouts/loader.vue";
import Headermenu from "./components/headermenu.vue";
import Headertwomenu from "./components/headertwomenu.vue";
import Mobilemenu from "./components/mobilemenu.vue";
import Headerlogo from "./components/headerlogo.vue";
import Headerlogo1 from "./components/headerlogo1.vue";
/*********Sidebar component**********/
import Sidebar from "./views/layouts/sidebar.vue";
import SidebarOne from "./views/layouts/sidebarone.vue";
import Sidebarfour from "./views/layouts/sidebarfour.vue";
import Indextwomenu from "./components/indextwomenu.vue";
/*********Pageheader component**********/
import PageHeader from "./components/pageheader/pageheader.vue";
import PageaddHeader from "./components/pageheader/pageaddheader.vue";
import breadcrumb from "./components/pageheader/breadcrumb.vue";
/*********Dashboard**********/
import DashboardPage from "./views/pages/dashboard/Edit.vue";

/*********Modal component**********/

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/plugins/summernote/dist/summernote-lite.min.css";
import "./assets/plugins/summernote/dist/summernote-lite.min.js";
import "ionicons-npm/css/ionicons.css";
import "material-icons/css/material-icons.min.css";
import "material-icons/css/material-icons.css";
import "pe7-icon/dist/dist/pe-icon-7-stroke.css";
import "typicons.font/src/font/typicons.css";
import "weathericons/css/weather-icons.css";
import "./assets/css/vue-form-wizard.css";
import "./assets/css/style.css";
import swal from "sweetalert2";
window.Swal = swal;
// const store = createStore({
//   modules: {
//     apps,
//   },
//   strict: process.env.DEV,
// });
const app = createApp(App);
/*********Header component**********/
app.component("layouts", Header);
app.component("layoutstwo", Headertwo);
app.component("headerpos", HeaderPos);
app.component("loader", Loader);
app.component("headermenu", Headermenu);
app.component("headertwomenu", Headertwomenu);
app.component("mobilemenu", Mobilemenu);
app.component("headerlogo", Headerlogo);
app.component("headerlogo1", Headerlogo1);
/*********Sidebar component**********/
app.component("sidebar", Sidebar);
app.component("sidebarone", SidebarOne);
app.component("sidebarfour", Sidebarfour);
app.component("indextwosidebar", Indextwomenu);

/*********Pageheader component**********/
app.component("pageheader", PageHeader);
app.component("pageaddheader", PageaddHeader);
app.component("breadcrumb", breadcrumb);

/*********Dashboard**********/
app.component("indexpage", DashboardPage);

app.component("vue-select", Select2);
app.component("datepicker", VueDatePicker);
app.component("vue3-autocounter", Vue3Autocounter);
app.component(VueFeather.name, VueFeather);
app.component("star-rating", StarRating);
app.component("SummernoteEditor", SummernoteEditor);
//shaared

app.component("gform", GForm);
app.component("gfield", GField);
app.component("GPicker", GPicker);
app.component("GSelect", GSelect);
app.use(Toaster, {
  position: "top-right",
});
app.config.globalProperties.$http = axiosIns;
app.mixin(SomeMixin);
app.provide("$http", axiosIns);
app.use(i18n);

// app.use(axiosPlugin);
app.use(store);
// Check if Vuex is installed
// const isVuexInstalled = app.config.globalProperties.$store !== undefined;

// Output whether Vuex is installed or not
// console.log('Is Vuex installed?', isVuexInstalled);
app.use(CoolLightBox);
app.use(VueSweetalert2);
app.use(VueEasyLightbox);
app.use(VueApexCharts);
app
  .use(FlagIcon)
  .use(VueFormWizard)
  .use(Antd)
  .use(BootstrapVue3)
  .use(BToastPlugin);
app.use(router);
app.mount("#app");

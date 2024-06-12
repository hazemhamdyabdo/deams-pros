<template>
  <div id="app">
    <router-view />
    <!-- <b-overlay :show="show"> span hello</b-overlay> -->
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  data: function () {
    return { status: false };
  },
  computed: {
    ...mapGetters({
      show: "app.overLay",
    }),
  },
  watch: {
    profile(newVal) {
      if (newVal.isAdmin || this.profile.userId) this.Startup();
    //   window.localStorage.USERID = this.profile.userId;
    //   window.localStorage.USERNAME = this.profile.userName;
    //   this.selectedItem.phone = this.profile.phone;
    //   this.selectedItem.email = this.profile.email;
    },
  },
  methods: {
    ...mapActions({
      setBranches: "app/setBranches",
    }),
    ...mapMutations({
      setCompany: "app/setCompany",
    }),
	Startup() {
      this.get({ url: "aggregates/StartUp" })
        .then((data) => {
          this.setBranches(data.branches);
          this.setCompany(data.currentCompany);
          this.mainCompany = data.currentCompany;
          // this.setCompany(data.currentCompany);
        })},
  },
};
</script>
<style>
#body {
	font-family: "Dubai", sans-serif !important;
}
.b-table-empty-slot,
.b-table {
  text-align: center !important;
}
.pagination {
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
  --bs-pagination-font-size: 1rem;
  --bs-pagination-color: var(--bs-link-color);
  --bs-pagination-bg: #fff;
  --bs-pagination-border-width: 1px;
  --bs-pagination-border-color: #dee2e6;
  --bs-pagination-border-radius: 0.375rem;
  --bs-pagination-hover-color: var(--bs-link-hover-color);
  --bs-pagination-hover-bg: #e9ecef;
  --bs-pagination-hover-border-color: #dee2e6;
  --bs-pagination-focus-color: var(--bs-link-hover-color);
  --bs-pagination-focus-bg: #e9ecef;
  --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  --bs-pagination-active-color: #fff;
  --bs-pagination-active-bg: #ff9f43 !important;
  --bs-pagination-active-border-color: #0d6efd;
  --bs-pagination-disabled-color: #6c757d;
  --bs-pagination-disabled-bg: #fff;
  --bs-pagination-disabled-border-color: #dee2e6;
  display: flex;
  padding-right: 0;
  list-style: none;
}
.form-control.is-valid,
.was-validated .form-control:valid {
  border-color: #fe9f43 !important;
}

.router-link-exact-active,
.sidebar .sidebar-menu > ul > li > a:active {
  color: #FF9F43 !important;
  background-color: rgba(254, 159, 67, 0.08) !important;
}

.router-link-exact-active span {
  color: #FF9900 !important;
}

@media (max-width: 768px) {
	.sticky-sidebar {
		display: none;
	}
}

</style>

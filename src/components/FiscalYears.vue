<template>
  <li class="nav-item dropdown has-arrow flag-nav nav-item-box ms-5">
    <a
      style="width: fit-content"
      class="nav-link dropdown-toggle p-1"
      data-bs-toggle="dropdown"
      href="javascript:void(0);"
      role="button"
    >
      <span class="ml-50 text-body">
        {{ currentYear.year !== null ? currentYear.year : $t("all") }}
        <feather-icon
          icon="ChevronDownIcon"
          class="cart-item-remove cursor-pointer"
        />
      </span>
    </a>
    <div class="dropdown-menu dropdown-menu-right">
      <a
        href="javascript:void(0);"
        v-for="year in fiscalYears"
        :key="year.year"
        :value="entry"
        @click="
          (v) => {
            setCurrentYear(year);
            reload();
          }
        "
        class="dropdown-item"
      >
        <span class="ml-50">{{
          year.year !== null ? year.year : $t("all")
        }}</span>
      </a>
    </div>
  </li>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      fiscalYears: [],
      currentYear: {},
    };
  },
  methods: {
    ...mapMutations({
      setCurrentYear: "app/setCurrentYear",
    }),
    reload() {
      window.location.reload();
    },
  },
  computed: {
    ...mapGetters({
      isRight: "appConfig/isRTL",
      fiscalYears: "app/fiscalYears",
    }),
  },
  mounted() {
    this.get({ url: "FiscalYears" }).then((data) => {
      this.fiscalYears = data;
      this.branches = data.branches;
      if (!localStorage.getItem("@CURRENT_YEAR")) {
        const year = {
          ...data.find((item) => item.year === new Date().getFullYear()),
        };
        localStorage.setItem("@CURRENT_YEAR", JSON.stringify(year));
      }

      this.currentYear = JSON.parse(localStorage.getItem("@CURRENT_YEAR"));
    });
  },
};
</script>

<style>
.dropdown-menu .dropdown-item:hover::before,
.dropdown-menu .dropdown-item:hover::after {
  display: none !important;
}
</style>

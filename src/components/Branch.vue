<template>
  <li class="nav-item dropdown has-arrow flag-nav nav-item-box">
    <a
      style="width: fit-content"
      class="nav-link dropdown-toggle p-1"
      data-bs-toggle="dropdown"
      href="javascript:void(0);"
      role="button"
    >
      <span class="ml-50 text-body">
        {{ isRight ? currentBranch.arabicName : currentBranch.englishName }}
        <feather-icon
          icon="ChevronDownIcon"
          class="cart-item-remove cursor-pointer"
        />
      </span>
    </a>
    <div class="dropdown-menu dropdown-menu-right">
      <a
        href="javascript:void(0);"
        v-for="branch in branches"
        :key="branch.id"
        :value="branch"
        @click="
          (v) => {
            console.log('ss', branch);
            setCurrentBranch(branch);
            reload();
          }
        "
        class="dropdown-item"
      >
        <span class="ml-50">{{ branch.arabicName }}</span>
      </a>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      branches: [],
    };
  },
  methods: {
    ...mapMutations({
      setCurrentBranch: "app/setCurrentBranch",
    }),
    reload() {
      window.location.reload();
    },
    ...mapActions({
      setBranches: "app/setBranches",
    }),
  },
  computed: {
    ...mapGetters({
      isRight: "appConfig/isRTL",
      branchId: "app/branchId",
      currentBranch: "app/currentBranch",
    }),
  },
  mounted() {
    this.get({ url: "aggregates/StartUp" }).then((data) => {
      this.setBranches(data.branches);

      this.branches = data.branches;
    });
  },
};
</script>

<style></style>

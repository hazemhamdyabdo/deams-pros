<template>
    <b-nav-item-dropdown
      id="dropdown-grouped"
      variant="link"
      class="dropdown-language"
      right
    >
      <template #button-content>
        <span class="ml-50 text-body">
          {{ currentYear.year !== null ? currentYear.year : $t('all') }}
          <feather-icon
            icon="ChevronDownIcon"
            class="cart-item-remove cursor-pointer"
          />
        </span>
      </template>
      <b-dropdown-item
        v-for="year in fiscalYears"
        :key="year.year"
        @click="(v) => {
          setCurrentYear(year);
          reload()
        }"
      >
        <span class="ml-50">{{ year.year !== null ? year.year : $t('all') }}</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </template>
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    methods: {
      ...mapMutations({
        setCurrentYear: 'app/setCurrentYear',
      }),
      reload() {
        window.location.reload();
      }
    },
  };
  </script>
  
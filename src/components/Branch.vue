<template>
    <b-nav-item-dropdown
      id="dropdown-grouped"
      variant="link"
      class="dropdown-language"
      right
    >
      <template #button-content>
        <span class="ml-50 text-body">
          {{ isRight ? currentBranch.arabicName : currentBranch.englishName }}
          <feather-icon
            icon="ChevronDownIcon"
            class="cart-item-remove cursor-pointer"
          />
        </span>
      </template>
      <b-dropdown-item
        v-for="branch in branches"
        :key="branch.arabicName"
        @click="(v) => setCurrentBranch(branch)"
      >
        <span class="ml-50">{{ branch.arabicName }}</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    methods: {
      ...mapMutations({
        setCurrentBranch: 'app/setCurrentBranch',
      }),
    },
  };
  </script>
  
  <style></style>
  
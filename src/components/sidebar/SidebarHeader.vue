<template>
  <li class="submenu-open">
    <router-link :to="{ name: 'home' }"
          ><vue-feather type="grid"></vue-feather><span> {{ $t("dashboard") }}</span>
        </router-link>
  </li>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>

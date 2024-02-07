<template>
  <li class="submenu-open">
    <h6 class="submenu-hdr">Main</h6>
    <ul>
      <li
        v-bind:class="{
          active: currentPath == 'index' || currentPath == 'index',
        }"
      >
        <router-link :to="{ name: 'home' }"
          ><vue-feather type="grid"></vue-feather><span> Dashboard</span>
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>

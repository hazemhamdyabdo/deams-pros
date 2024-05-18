<template>
  <!-- Logo -->
  <div class="header-left active">
    <router-link to="dashboard" class="logo logo-normal">
      <img src="../assets/img/27.png" alt=""  style="transform: scale(0.84); margin-top: 0.4rem;">
    </router-link>
    <router-link to="dashboard" class="logo logo-white">
      <img src="../assets/img/27.png" alt="" />
    </router-link>
    <router-link to="dashboard" class="logo-small">
      <img src="../assets/img/27.png" alt="" />
    </router-link>
    <a :class="$route.meta.hideClass" id="toggle_btn" href="javascript:void(0);">
      <vue-feather type="chevrons-left" class="feather-16"></vue-feather>
    </a>
  </div>
  <!-- /Logo -->
</template>
<style scoped>
.router-link-active{
  background: none !important;
}
</style>

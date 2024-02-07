<template>
  <div id="sidebar-menu" class="sidebar-menu">
    <ul>
      <SidebarHeader />
      <SidebarBody />
    </ul>
  </div>
</template>

<script>
import SidebarHeader from "./SidebarHeader.vue";
import SidebarBody from "./SidebarBody.vue";
export default {
  components: {
    SidebarHeader,
    SidebarBody,
  },
};
</script>

<style scoped></style>

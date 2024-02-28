<template>
  <ul>
    <li class="submenu-open">
      <h6 class="submenu-hdr">Main</h6>
      <ul>
        <li>
          <router-link class="home" :to="{ name: 'home' }"
            ><vue-feather type="grid"></vue-feather><span> Dashboard</span>
          </router-link>
        </li>
      </ul>
    </li>
    <!-- we use template tage to condationnaly rendring -->
    <template v-for="item in navItems">
      <li v-if="!item.children" :key="item.title">
        <router-link
          :class="['submenu', { active: isActive(`${item.route}`) }]"
          :to="{ name: `${item.route}` }"
        >
          <vue-feather :type="item.icon ?? 'plus-square'"></vue-feather>

          {{ $t(`${item.title}`) }}
        </router-link>
      </li>
      <li v-else class="submenu" :key="item.title">
        <a
          href="#sidebarTransfer"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarTransfer"
        >
          <vue-feather :type="item.icon ?? 'shuffle'"></vue-feather>
          <span>{{ $t(`${item.title}`) }}</span>
          <span class="menu-arrow"></span>
        </a>
        <ul class="collapse menu-dropdown" id="sidebarTransfer">
          <li v-for="child in item.children" :key="child.title">
            <router-link
              :class="{ active: isActive(`${child.route}`) }"
              :to="{ name: `${child.route}` }"
            >
              <vue-feather :type="child.icon ?? 'plus-square'"></vue-feather>

              {{ $t(`${child.title}`) }}
            </router-link>
          </li>
        </ul>
      </li>
    </template>
  </ul>
  <!-- 
    <li class="submenu">
      <h6 class="submenu-hdr">Products</h6>
      <ul>
        <li>
          <router-link
            :class="
              currentPath == 'productlist' || currentPath == 'editproduct'
                ? 'active'
                : 'notactive'
            "
            :to="{ name: 'productlist' }"
            ><vue-feather type="box"></vue-feather
            ><span>Products</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="
              currentPath == 'addproduct' || currentPath == 'product-details'
                ? 'active'
                : 'notactive'
            "
            to="addproduct"
            ><vue-feather type="plus-square"></vue-feather
            ><span>Create Product</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="currentPath == 'categorylist' ? 'active' : 'notactive'"
            to="categorylist"
            ><vue-feather type="codepen"></vue-feather
            ><span>Category</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="currentPath == 'brandlist' ? 'active' : 'notactive'"
            to="brandlist"
            ><vue-feather type="tag"></vue-feather
            ><span>Brands</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="currentPath == 'subcategorylist' ? 'active' : 'notactive'"
            to="subcategorylist"
            ><vue-feather type="speaker"></vue-feather
            ><span>Sub Category</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="currentPath == 'barcode' ? 'active' : 'notactive'"
            to="barcode"
            ><vue-feather type="align-justify"></vue-feather
            ><span>Print Barcode</span></router-link
          >
        </li>
        <li>
          <router-link
            :class="currentPath == 'importproduct' ? 'active' : 'notactive'"
            to="importproduct"
            ><vue-feather type="minimize-2"></vue-feather
            ><span>Import Products</span></router-link
          >
        </li>
      </ul>
    </li>


   -->
</template>

<script>
import navItems from "@/navigation/vertical/index.js";

export default {
  data() {
    return {
      navItems: navItems,
    };
  },

  methods: {
    isActive(path) {
      return this.$route.name == path;
    },
  },
};
</script>

<style scoped>
a.router-link-exact-active {
  background: #ff9f43;
  color: #fff;
}
</style>

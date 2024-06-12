<template>
  <ul>
    <li class="submenu-open">
      <ul>
        <li>
          <router-link class="home" :to="{ name: 'home' }"
            ><vue-feather type="grid"></vue-feather
            ><span> {{ $t('dashboard') }}</span>
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
      <li v-else class="submenu" :key="item.children">
        <a
          :href="`#${item.title}`"
          data-bs-toggle="collapse"
          role="button"
          :aria-expanded="item.title === currentOpenedParent"
          :aria-controls="`${item.title}`"
          @click='toggleParnt(item.title)'
        >
          <vue-feather :type="item.icon ?? 'server'"></vue-feather>
          <span>{{ $t(`${item.title}`) }}</span>
          <span class="menu-arrow"></span>
        </a>
        <ul
          class="collapse menu-dropdown"
          :id="item.title"
          :class="{
            show: item.title === currentOpenedParent,
          }"
        >
          <li v-for="child in item.children" :key="child.title">
            <router-link
              :class="{ active: isActive(`${child.route}`) }"
              :to="{ name: `${child.route}` }"
            >
              <vue-feather :type="child.icon ?? 'star'"></vue-feather>

              {{ $t(`${child.title}`) }}
            </router-link>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script>
import navItems from '@/navigation/vertical/index.js';

export default {
  data() {
    return {
      navItems: navItems,
      currentOpenedParent: null,
    };
  },

  methods: {
    isActive(path) {
      return this.$route.name == path;
    },
    isFav(child) {
      return (child.isFav = !child.isFav);
    },
    toggleParnt(title) {
      if (this.currentOpenedParent == title) {
        this.currentOpenedParent = null;
      } else {
        this.currentOpenedParent = title;
      }
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

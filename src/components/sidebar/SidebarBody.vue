<template>
  <li class="submenu">
    <a
      v-bind:class="transferMenu ? 'active' : 'notactive'"
      href="#publicCodes"
      data-bs-toggle="collapse"
      role="button"
      aria-expanded="false"
      aria-controls="publicCodes"
      v-on:click="transferMenu = !transferMenu"
      ><vue-feather type="server"></vue-feather
      ><span>{{ $t("publicCodes") }}</span
      ><span class="menu-arrow"></span
    ></a>
    <ul class="collapse menu-dropdown" id="publicCodes">
      <li>
        <router-link
          :class="
            currentPath == 'banks' || currentPath == 'banks'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'banks' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("Banks") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'paymentMehtod' || currentPath == 'paymentMehtod'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'PaymentMehtod' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("paymentMethod") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'building' || currentPath == 'building'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'building' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("building") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'nationality' || currentPath == 'nationality'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'nationality' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("Nationalities") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'rentType' || currentPath == 'rentType'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'rentType' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("RentTypes") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'kitchenType' || currentPath == 'kitchenType'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'kitchenType' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("kitchensTypes") }}</span></router-link
        >
      </li>
      <li>
        <router-link
          :class="
            currentPath == 'room' || currentPath == 'room'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'room' }"
          ><vue-feather type="tablet"/>
          <span>{{ $t("rooms") }}</span></router-link
        >
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

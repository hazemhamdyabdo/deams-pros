<template>
  <li class="submenu">
    <a
      v-bind:class="transferMenu ? 'active' : 'notactive'"
      href="#sidebarTransfer"
      data-bs-toggle="collapse"
      role="button"
      aria-expanded="false"
      aria-controls="sidebarTransfer"
      v-on:click="transferMenu = !transferMenu"
      ><vue-feather type="shuffle"></vue-feather
      ><span>{{ $t("publicCodes") }}</span
      ><span class="menu-arrow"></span
    ></a>
    <ul class="collapse menu-dropdown" id="sidebarTransfer">
      <li>
        <router-link
          :class="
            currentPath == 'banks' || currentPath == 'banks'
              ? 'active'
              : 'notactive'
          "
          :to="{ name: 'banks' }"
          >{{ $t("Banks") }}</router-link
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
          ><vue-feather type="plus-square"></vue-feather
          ><span>{{ $t("paymentMethod") }}</span></router-link
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
          ><vue-feather type="plus-square"></vue-feather
          ><span>{{ $t("building") }}</span></router-link
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
          ><vue-feather type="plus-square"></vue-feather
          ><span>{{ $t("Nationalities") }}</span></router-link
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
          ><vue-feather type="plus-square"></vue-feather
          ><span>{{ $t("RentTypes") }}</span></router-link
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
          ><vue-feather type="plus-square"></vue-feather
          ><span>{{ $t("kitchensTypes") }}</span></router-link
        >
      </li>
    </ul>
  </li>

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
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

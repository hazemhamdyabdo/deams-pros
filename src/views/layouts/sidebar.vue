<template>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar" :class="$route.meta.sidebarClass"  style="overflow-y: scroll;">
    <div class="slimScrollDiv">
      <div class="sidebar-inner slimscroll" >
        <TheSidebar />
      </div>
    </div>
  </div>
</template>
<script>
import TheSidebar from "@/components/sidebar/TheSidebar.vue";

export default {
  data() {
    return {
      productMenu: false,
      salesMenu: false,
      purchaseMenu: false,
      expenseMenu: false,
      quotationMenu: false,
      transferMenu: false,
      returnMenu: false,
      peopleMenu: false,
      placesMenu: false,
      errorpageMenu: false,
      reportMenu: false,
      userMenu: false,
      settingMenu: false,
      elementMenu: false,
      chartMenu: false,
      iconMenu: false,
      formMenu: false,
      tableMenu: false,
      chatMenu: false,
      authenticationPageMenu: false,
      settings: {
        suppressScrollX: true,
      },
      activeClass: "active",
    };
    //  isactive : true
  },
  methods: {
    scrollHanle(evt) {},
    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      var searchInput = document.getElementById("search-options");

      searchInput.addEventListener("focus", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchInput.addEventListener("keyup", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });

      document.body.addEventListener("click", (e) => {
        if (e.target.getAttribute("id") !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    },
    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#sidebar")) {
          let a = document
            .querySelector("#sidebar")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
  components: {
    TheSidebar,
  },

  computed: {
    currentPath() {
      return this.$route.name;
    },
    productMenu() {
      return (
        this.$route.name == "productlist" ||
        this.$route.name == "product-details" ||
        this.$route.name == "addproduct" ||
        this.$route.name == "editproduct" ||
        this.$route.name == "editcategory" ||
        this.$route.name == "categorylist" ||
        this.$route.name == "addcategory" ||
        this.$route.name == "editsubcategory" ||
        this.$route.name == "subcategorylist" ||
        this.$route.name == "subaddcategory" ||
        this.$route.name == "brandlist" ||
        this.$route.name == "editbrand" ||
        this.$route.name == "addbrand" ||
        this.$route.name == "importproduct" ||
        this.$route.name == "barcode"
      );
    },
    salesMenu() {
      return (
        this.$route.name == "saleslist" ||
        this.$route.name == "sales-details" ||
        this.$route.name == "pos" ||
        this.$route.name == "add-sales" ||
        this.$route.name == "editsalesreturns" ||
        this.$route.name == "edit-sales" ||
        this.$route.name == "salesreturnlists" ||
        this.$route.name == "createsalesreturns"
      );
    },
    purchaseMenu() {
      return (
        this.$route.name == "purchaselist" ||
        this.$route.name == "addpurchase" ||
        this.$route.name == "editpurchase" ||
        this.$route.name == "importpurchase"
      );
    },
    expenseMenu() {
      return (
        this.$route.name == "expenselist" ||
        this.$route.name == "createexpense" ||
        this.$route.name == "editexpense" ||
        this.$route.name == "expensecategory"
      );
    },
    quotationMenu() {
      return (
        this.$route.name == "quotationlist" ||
        this.$route.name == "addquotation" ||
        this.$route.name == "editquotation"
      );
    },
    transferMenu() {
      return (
        this.$route.name == "banks" ||
        this.$route.name == "addBank" ||
        this.$route.name == "editBank/:id"
      );
    },
    returnMenu() {
      return (
        this.$route.name == "salesreturnlist" ||
        this.$route.name == "editsalesreturn" ||
        this.$route.name == "createsalesreturn" ||
        this.$route.name == "createpurchasereturn" ||
        this.$route.name == "editpurchasereturn"
      );
    },
    peopleMenu() {
      return (
        this.$route.name == "customerlist" ||
        this.$route.name == "addcustomer" ||
        this.$route.name == "editcustomer" ||
        this.$route.name == "supplierlist" ||
        this.$route.name == "editsupplier" ||
        this.$route.name == "addsupplier" ||
        this.$route.name == "userlist" ||
        this.$route.name == "edituser" ||
        this.$route.name == "adduser" ||
        this.$route.name == "editstore" ||
        this.$route.name == "storelist" ||
        this.$route.name == "addstore"
      );
    },
    placesMenu() {
      return (
        this.$route.name == "newcountry" ||
        this.$route.name == "editcountry" ||
        this.$route.name == "countrieslist" ||
        this.$route.name == "editstate" ||
        this.$route.name == "newstate" ||
        this.$route.name == "statelist"
      );
    },
    errorpageMenu() {
      return this.$route.name == "error-404" || this.$route.name == "error-500";
    },
    reportMenu() {
      return (
        this.$route.name == "purchaseorderreport" ||
        this.$route.name == "inventoryreport" ||
        this.$route.name == "salesreport" ||
        this.$route.name == "invoicereport" ||
        this.$route.name == "purchasereport" ||
        this.$route.name == "supplierreport" ||
        this.$route.name == "customerreport"
      );
    },
    userMenu() {
      return (
        this.$route.name == "newuser" ||
        this.$route.name == "userlists" ||
        this.$route.name == "newuseredit"
      );
    },
    settingMenu() {
      return (
        this.$route.name == "generalsettings" ||
        this.$route.name == "emailsettings" ||
        this.$route.name == "editpermission" ||
        this.$route.name == "createpermission" ||
        this.$route.name == "paymentsettings" ||
        this.$route.name == "currencysettings" ||
        this.$route.name == "grouppermissions" ||
        this.$route.name == "taxrates"
      );
    },
    elementMenu() {
      return (
        this.$route.name == "sweetalerts" ||
        this.$route.name == "tooltip" ||
        this.$route.name == "popover" ||
        this.$route.name == "ribbon" ||
        this.$route.name == "clipboard" ||
        this.$route.name == "drag-drop" ||
        this.$route.name == "rangeslider" ||
        this.$route.name == "rating" ||
        this.$route.name == "toastr" ||
        this.$route.name == "text-editor" ||
        this.$route.name == "counter" ||
        this.$route.name == "scrollbar" ||
        this.$route.name == "spinner" ||
        this.$route.name == "notification" ||
        this.$route.name == "lightbox" ||
        this.$route.name == "stickynote" ||
        this.$route.name == "timeline" ||
        this.$route.name == "form-wizard"
      );
    },
    chartMenu() {
      return (
        this.$route.name == "chart-apex" ||
        this.$route.name == "chart-js" ||
        this.$route.name == "chart-morris" ||
        this.$route.name == "chart-flot"
      );
    },
    iconMenu() {
      return (
        this.$route.name == "icon-fontawesome" ||
        this.$route.name == "icon-feather" ||
        this.$route.name == "icon-ionic" ||
        this.$route.name == "icon-material" ||
        this.$route.name == "icon-pe7" ||
        this.$route.name == "icon-simpleline" ||
        this.$route.name == "icon-themify" ||
        this.$route.name == "icon-weather" ||
        this.$route.name == "icon-typicon" ||
        this.$route.name == "icon-flag"
      );
    },
    formMenu() {
      return (
        this.$route.name == "form-basic-inputs" ||
        this.$route.name == "form-input-groups" ||
        this.$route.name == "form-horizontal" ||
        this.$route.name == "form-vertical" ||
        this.$route.name == "form-mask" ||
        this.$route.name == "form-validation" ||
        this.$route.name == "form-select2" ||
        this.$route.name == "form-fileupload"
      );
    },
    tableMenu() {
      return (
        this.$route.name == "tables-basic" || this.$route.name == "data-tables"
      );
    },
    chatMenu() {
      return (
        this.$route.name == "chat" ||
        this.$route.name == "calendar" ||
        this.$route.name == "email"
      );
    },
    currentPath() {
      return this.$route.name;
    },
  },
};
</script>

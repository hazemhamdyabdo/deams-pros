<template>
  <!-- Sidebar -->
  <div class="sidebar sidebar-four" id="sidebar">
 
      <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu sidebar-menu-three">
          <aside id="aside" class="ui-aside">
            <ul class="tab nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link active"
                  href="#home"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <img src="../../assets/img/icons/menu-icon.svg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link"
                  id="messages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#messages"
                  role="tab"
                  aria-controls="messages"
                  aria-selected="false"
                >
                  <img src="../../assets/img/icons/menu-icon-01.svg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  <img src="../../assets/img/icons/menu-icon-02.svg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link"
                  id="app-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#app"
                  role="tab"
                  aria-controls="app"
                  aria-selected="false"
                >
                  <img src="../../assets/img/icons/menu-icon-04.svg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link"
                  href="#report"
                  id="report-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#report"
                  role="tab"
                  aria-controls="report"
                  aria-selected="true"
                >
                  <img src="../../assets/img/icons/menu-icon-05.svg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="tablinks nav-link"
                  href="#set"
                  id="set-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#set"
                  role="tab"
                  aria-controls="set"
                  aria-selected="true"
                >
                  <img src="../../assets/img/icons/menu-icon-06.svg" alt="" />
                </a>
              </li>
            </ul>
          </aside>
          <div class="tab-content tab-content-four pt-2">
            <ul class="tab-pane active" id="home" aria-labelledby="home-tab">
              <li>
                <a href="index"><span> Dashboard</span> </a>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarTransfer"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTransfer"
                  v-on:click="Transfer = !Transfer"
                  :class="{ subdrop: Transfer }"
                  ><span> Transfer</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarTransfer">
                  <li><a href="transferlist">Transfer List</a></li>
                  <li><a href="addtransfer">Add Transfer </a></li>
                  <li><a href="importtransfer">Import Transfer </a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarProduct"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarProduct"
                  v-on:click="Product = !Product"
                  :class="{ subdrop: Product }"
                  ><span> Product</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarProduct">
                  <li><a href="productlist">Product List</a></li>
                  <li><a href="addproduct">Add Product</a></li>
                  <li><a href="categorylist">Category List</a></li>
                  <li><a href="addcategory">Add Category</a></li>
                  <li><a href="subcategorylist">Sub Category List</a></li>
                  <li><a href="subaddcategory">Add Sub Category</a></li>
                  <li><a href="brandlist">Brand List</a></li>
                  <li><a href="addbrand">Add Brand</a></li>
                  <li><a href="importproduct">Import Products</a></li>
                  <li><a href="barcode">Print Barcode</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarTransfer"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTransfer"
                  v-on:click="Transfer = !Transfer"
                  :class="{ subdrop: Transfer }"
                  ><span> Transfer</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarTransfer">
                  <li><a href="transferlist">Transfer List</a></li>
                  <li><a href="addtransfer">Add Transfer </a></li>
                  <li><a href="importtransfer">Import Transfer </a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarReturn"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarReturn"
                  v-on:click="Return = !Return"
                  :class="{ subdrop: Return }"
                  ><span> Return</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarReturn">
                  <li><a href="salesreturnlist">Sales Return List</a></li>
                  <li><a href="createsalesreturn">Add Sales Return </a></li>
                  <li><a href="purchasereturnlist">Purchase Return List</a></li>
                  <li><a href="createpurchasereturn">Add Purchase Return </a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarPeople"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPeople"
                  v-on:click="People = !People"
                  :class="{ subdrop: People }"
                  ><span> People</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarPeople">
                  <li><a href="customerlist">Customer List</a></li>
                  <li><a href="addcustomer">Add Customer </a></li>
                  <li><a href="supplierlist">Supplier List</a></li>
                  <li><a href="addsupplier">Add Supplier </a></li>
                  <li><a href="userlist">User List</a></li>
                  <li><a href="adduser">Add User</a></li>
                  <li><a href="storelist">Store List</a></li>
                  <li><a href="addstore">Add Store</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarPlaces"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPlaces"
                  v-on:click="Places = !Places"
                  :class="{ subdrop: Places }"
                  ><span> Places</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarPlaces">
                  <li><a href="newcountry">New Country</a></li>
                  <li><a href="countrieslist">Countries list</a></li>
                  <li><a href="newstate">New State </a></li>
                  <li><a href="statelist">State list</a></li>
                </ul>
              </li>
            </ul>
            <ul class="tab-pane" id="messages" aria-labelledby="messages-tab">
              <li><a href="newuser">New User </a></li>
              <li><a href="userlists">Users List</a></li>
            </ul>
            <ul class="tab-pane" id="profile" aria-labelledby="profile-tab">
              <li>
                <a href="components"><span> Components</span> </a>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarElements"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarElements"
                  v-on:click="Elements = !Elements"
                  :class="{ subdrop: Elements }"
                  ><span>Elements</span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarElements">
                  <li><a href="sweetalerts">Sweet Alerts</a></li>
                  <li><a href="tooltip">Tooltip</a></li>
                  <li><a href="popover">Popover</a></li>
                  <li><a href="ribbon">Ribbon</a></li>
                  <li><a href="clipboard">Clipboard</a></li>
                  <li><a href="drag-drop">Drag & Drop</a></li>
                  <li><a href="rangeslider">Range Slider</a></li>
                  <li><a href="rating">Rating</a></li>
                  <li><a href="toastr">Toastr</a></li>
                  <li><a href="text-editor">Text Editor</a></li>
                  <li><a href="counter">Counter</a></li>
                  <li><a href="scrollbar">Scrollbar</a></li>
                  <li><a href="spinner">Spinner</a></li>
                  <li><a href="notification">Notification</a></li>
                  <li><a href="lightbox">Lightbox</a></li>
                  <li><a href="stickynote">Sticky Note</a></li>
                  <li><a href="timeline">Timeline</a></li>
                  <li><a href="form-wizard">Form Wizard</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarCharts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCharts"
                  v-on:click="Charts = !Charts"
                  :class="{ subdrop: Charts }"
                  ><span>Charts </span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarCharts">
                  <li><a href="chart-apex">Apex Charts</a></li>
                  <li><a href="chart-js">Chart Js</a></li>
                  <li><a href="chart-morris">Morris Charts</a></li>
                  <li><a href="chart-flot">Flot Charts</a></li>
                  <li><a href="chart-peity">Peity Charts</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarIcons"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarIcons"
                  v-on:click="Icons = !Icons"
                  :class="{ subdrop: Icons }"
                  ><span> Icons </span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarIcons">
                  <li><a href="icon-fontawesome">Fontawesome Icons</a></li>
                  <li><a href="icon-feather">Feather Icons</a></li>
                  <li><a href="icon-ionic">Ionic Icons</a></li>
                  <li><a href="icon-material">Material Icons</a></li>
                  <li><a href="icon-pe7">Pe7 Icons</a></li>
                  <li><a href="icon-simpleline">Simpleline Icons</a></li>
                  <li><a href="icon-themify">Themify Icons</a></li>
                  <li><a href="icon-weather">Weather Icons</a></li>
                  <li><a href="icon-typicon">Typicon Icons</a></li>
                  <li><a href="icon-flag">Flag Icons</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarForms"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarForms"
                  v-on:click="Forms = !Forms"
                  :class="{ subdrop: Forms }"
                >
                  <span>Forms </span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarForms">
                  <li><a href="form-basic-inputs">Basic Inputs </a></li>
                  <li><a href="form-input-groups">Input Groups </a></li>
                  <li><a href="form-horizontal">Horizontal Form </a></li>
                  <li><a href="form-vertical"> Vertical Form </a></li>
                  <li><a href="form-mask">Form Mask </a></li>
                  <li><a href="form-validation">Form Validation </a></li>
                  <li><a href="form-select2">Form Select2 </a></li>
                  <li><a href="form-fileupload">File Upload </a></li>
                </ul>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarTable"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTable"
                  v-on:click="Table = !Table"
                  :class="{ subdrop: Table }"
                >
                  <span>Table </span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarTable">
                  <li><a href="tables-basic">Basic Tables </a></li>
                  <li><a href="data-tables">Data Table </a></li>
                </ul>
              </li>
              <li>
                <a href="blankpage"><span> Blank Page</span> </a>
              </li>
              <li class="submenu">
                <a
                  href="#sidebarError"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarError"
                  v-on:click="Error = !Error"
                  :class="{ subdrop: Error }"
                  ><span> Error Pages </span> <span class="menu-arrow"></span
                ></a>
                <ul class="collapse menu-dropdown" id="sidebarError">
                  <li><a href="error-404">404 Error </a></li>
                  <li><a href="error-500">500 Error </a></li>
                </ul>
              </li>
            </ul>
            <ul class="tab-pane" id="app" aria-labelledby="app-tab">
              <li><a href="chat">Chat</a></li>
              <li><a href="calendar">Calendar</a></li>
              <li><a href="email">Email</a></li>
            </ul>
            <ul class="tab-pane" id="report" aria-labelledby="report-tab">
              <li><a href="purchaseorderreport">Purchase order report</a></li>
              <li><a href="inventoryreport">Inventory Report</a></li>
              <li><a href="salesreport">Sales Report</a></li>
              <li><a href="invoicereport">Invoice Report</a></li>
              <li><a href="purchasereport">Purchase Report</a></li>
              <li><a href="supplierreport">Supplier Report</a></li>
              <li><a href="customerreport">Customer Report</a></li>
            </ul>
            <ul class="tab-pane" id="set" aria-labelledby="set-tab">
              <li><a href="generalsettings">General Settings</a></li>
              <li><a href="emailsettings">Email Settings</a></li>
              <li><a href="paymentsettings">Payment Settings</a></li>
              <li><a href="currencysettings">Currency Settings</a></li>
              <li><a href="grouppermissions">Group Permissions</a></li>
              <li><a href="taxrates">Tax Rates</a></li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  <!-- /Sidebar -->
</template>
<script>
export default {
  data() {
    return {
      Product: false,
      Sales: false,
      Purchase: false,
      Expense: false,
      Quotation: false,
      Transfer: false,
      Return: false,
      People: false,
      Places: false,
      Elements: false,
      Charts: false,
      Icons: false,
      Forms: false,
      Table: false,
      Error: false,
      settings: {
        suppressScrollX: true,
      },
    };
    //  isactive : true
  },
  methods: {
    scrollHanle(evt) {},
  },
};
</script>

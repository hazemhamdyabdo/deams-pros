<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
    <layouts></layouts>
    <sidebar></sidebar>
    <div class="page-wrapper">
      <div class="content">
        <pageaddheader :title="title" :title1="title1" :items="items" />

        <!-- /product list -->
        <div class="card">
          <div class="card-body">
            <div class="table-top">
              <div class="search-set">
                <div class="search-path">
                  <a
                    class="btn btn-filter"
                    id="filter_search"
                    v-on:click="filter = !filter"
                    :class="{ setclose: filter }"
                  >
                    <img src="@/assets/img/icons/filter.svg" alt="img" />
                    <span
                      ><img src="@/assets/img/icons/closes.svg" alt="img"
                    /></span>
                  </a>
                </div>
                <div class="search-input">
                  <a class="btn btn-searchset"
                    ><img src="@/assets/img/icons/search-white.svg" alt="img"
                  /></a>
                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                    <label>
                      <input
                        type="search"
                        class="form-control form-control-sm"
                        placeholder="Search..."
                        aria-controls="DataTables_Table_0"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                      ><img src="../../../assets/img/icons/pdf.svg" alt="img"
                    /></a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                      ><img src="../../../assets/img/icons/excel.svg" alt="img"
                    /></a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                      ><img
                        src="../../../assets/img/icons/printer.svg"
                        alt="img"
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /Filter -->
            <div
              class="card mb-0"
              id="filter_inputs"
              :style="{
                display: filter ? 'block' : 'none',
              }"
            >
              <div class="card-body pb-0">
                <div class="row">
                  <div class="col-lg-12 col-sm-12">
                    <div class="row">
                      <div class="col-lg col-sm-6 col-12">
                        <div class="form-group">
                          <vue-select
                            :options="Product"
                            placeholder="Choose Product"
                          />
                        </div>
                      </div>
                      <div class="col-lg col-sm-6 col-12">
                        <div class="form-group">
                          <vue-select
                            :options="Choose"
                            placeholder="Choose Category"
                          />
                        </div>
                      </div>
                      <div class="col-lg col-sm-6 col-12">
                        <div class="form-group">
                          <vue-select
                            :options="Category"
                            placeholder="Choose Sub Category"
                          />
                        </div>
                      </div>
                      <div class="col-lg col-sm-6 col-12">
                        <div class="form-group">
                          <vue-select :options="Brand" placeholder="Brand" />
                        </div>
                      </div>
                      <div class="col-lg col-sm-6 col-12">
                        <div class="form-group">
                          <vue-select :options="Price" placeholder="Price" />
                        </div>
                      </div>
                      <div class="col-lg-1 col-sm-6 col-12">
                        <div class="form-group">
                          <a class="btn btn-filters ms-auto"
                            ><img
                              src="../../../assets/img/icons/search-whites.svg"
                              alt="img"
                          /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Filter -->
            <div class="table-responsive">
              <a-table
                :columns="columns"
                :data-source="data"
                :row-selection="{
                  selectedRowKeys: selectedRowKeys,
                  onChange: onSelectChange,
                }"
                @change="onChange"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'id'">
                    <div class="productimgname">
                      <a href="javascript:void(0);" class="product-img">
                        <img
                          :src="
                            require('../../../assets/img/product/' + record.img)
                          "
                          alt="product"
                        />
                      </a>
                      <a href="javascript:void(0);">{{ record.ProductName }}</a>
                    </div>
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <router-link class="me-3" to="product-details">
                      <img src="@/assets/img/icons/eye.svg" alt="img" />
                    </router-link>
                    <router-link class="me-3" to="editproduct">
                      <img src="@/assets/img/icons/edit.svg" alt="img" />
                    </router-link>
                    <a
                      class="confirm-text"
                      href="javascript:void(0);"
                      @click="showAlert"
                    >
                      <img src="@/assets/img/icons/delete.svg" alt="img" />
                    </a>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
        </div>
        <!-- /product list -->
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    sorter: true,
  },
  {
    title: "Product Name",
    dataIndex: "ProductName",
    key: "id",
    sorter: {
      compare: (a, b) => {
        a = a.ProductName.toLowerCase();
        b = b.ProductName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "SKU",
    dataIndex: "SKU",
    sorter: (a, b) => a.SKU.localeCompare(b.SKU),
  },
  {
    title: "Category",
    dataIndex: "Category",
    sorter: {
      compare: (a, b) => {
        a = a.Category.toLowerCase();
        b = b.Category.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Brand",
    dataIndex: "Brand",
    sorter: true,
  },
  {
    title: "price",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => {
        a = a.price.toLowerCase();
        b = b.price.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Unit",
    dataIndex: "Unit",
    sorter: {
      compare: (a, b) => {
        a = a.Unit.toLowerCase();
        b = b.Unit.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Qty",
    dataIndex: "Qty",
    sorter: {
      compare: (a, b) => {
        a = a.Qty.toLowerCase();
        b = b.Qty.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Created By",
    dataIndex: "CreatedBy",
    sorter: {
      compare: (a, b) => {
        a = a.CreatedBy.toLowerCase();
        b = b.CreatedBy.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
  },
];
const data = [
  {
    id: 1,
    img: "product1.jpg",
    ProductName: "Macbook pro",
    SKU: "PT001",
    Category: "Computers",
    Brand: "N/D",
    price: "1500.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 2,
    img: "product2.jpg",
    ProductName: "Orange",
    SKU: "PT002",
    Category: "Fruits",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 3,
    img: "product3.jpg",
    ProductName: "Pineapple",
    SKU: "PT003",
    Category: "Fruits",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 4,
    img: "product4.jpg",
    ProductName: "Strawberry",
    SKU: "PT004",
    Category: "Fruits",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 5,
    img: "product5.jpg",
    ProductName: "Avocat",
    SKU: "PT005",
    Category: "Accessories",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "150.00",
    CreatedBy: "Admin",
  },
  {
    id: 6,
    img: "product6.jpg",
    ProductName: "Macbook Pro",
    SKU: "PT006",
    Category: "Shoes",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 7,
    img: "product7.jpg",
    ProductName: "Apple Earpods",
    SKU: "PT007",
    Category: "Shoes",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 8,
    img: "product8.jpg",
    ProductName: "iPhone 11",
    SKU: "PT008",
    Category: "Fruits",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 9,
    img: "product9.jpg",
    ProductName: "samsung",
    SKU: "PT009",
    Category: "Earphones",
    Brand: "N/D",
    price: "10.00",
    Unit: "pc",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 10,
    img: "product11.jpg",
    ProductName: "Banana",
    SKU: "PT0010",
    Category: "Health Care",
    Brand: "N/D",
    price: "10.00",
    Unit: "kg",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
  {
    id: 11,
    img: "product17.jpg",
    ProductName: "Limon",
    SKU: "PT0011",
    Category: "Health Care",
    Brand: "N/D",
    price: "10.00",
    Unit: "kg",
    Qty: "100.00",
    CreatedBy: "Admin",
  },
];
export default {
  data() {
    return {
      filter: false,
      title: "Product List",
      title1: "Manage your products",
      items: [
        {
          text: "Add New Product",
          addname: "/addproduct",
        },
      ],
      Product: ["Choose Product", "Macbook pro", "Orange"],
      Category: ["Choose Sub Category", "Computer"],
      Choose: ["Choose Category", "Computers", "Fruits"],
      Brand: ["Brand", "N/D"],
      Price: ["Price", "150.00"],
      data,
      columns,
    };
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#FF9F43",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.");
        }
      });
    },
  },
  name: "productlist",
};
</script>
<style>
.ant-tooltip {
  display: none !important;
}
</style>

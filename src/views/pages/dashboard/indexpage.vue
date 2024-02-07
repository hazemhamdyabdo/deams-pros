<template>
  <section class="page-wrapper">
    <main class="content">
      <div class="row">
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="dash-widget">
            <div class="dash-widgetimg">
              <span
                ><img src="../../../assets/img/icons/dash1.svg" alt="img"
              /></span>
            </div>
            <div class="dash-widgetcontent">
              <h5>
                $<vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="107144.0"
                  :delay="3"
                  :endAmount="307144.0"
                  :duration="5"
                  :autoinit="true"
                />
              </h5>
              <h6>Total Purchase Due</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="dash-widget dash1">
            <div class="dash-widgetimg">
              <span
                ><img src="../../../assets/img/icons/dash2.svg" alt="img"
              /></span>
            </div>
            <div class="dash-widgetcontent">
              <h5>
                $<vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="1385.0"
                  :delay="3"
                  :endAmount="4385.0"
                  :duration="5"
                  :autoinit="true"
                />
              </h5>
              <h6>Total Sales Due</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="dash-widget dash2">
            <div class="dash-widgetimg">
              <span
                ><img src="../../../assets/img/icons/dash3.svg" alt="img"
              /></span>
            </div>
            <div class="dash-widgetcontent">
              <h5>
                $<vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="185656.5"
                  :delay="3"
                  :endAmount="385656.5"
                  :duration="5"
                  :autoinit="true"
                />
              </h5>
              <h6>Total Sale Amount</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="dash-widget dash3">
            <div class="dash-widgetimg">
              <span
                ><img src="../../../assets/img/icons/dash4.svg" alt="img"
              /></span>
            </div>
            <div class="dash-widgetcontent">
              <h5>
                $<vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="10000.0"
                  :delay="3"
                  :endAmount="40000.0"
                  :duration="5"
                  :autoinit="true"
                />
              </h5>
              <h6>Total Sale Amount</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 d-flex">
          <div class="dash-count">
            <div class="dash-counts">
              <h4>100</h4>
              <h5>Customers</h5>
            </div>
            <div class="dash-imgs">
              <vue-feather type="user"></vue-feather>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 d-flex">
          <div class="dash-count das1">
            <div class="dash-counts">
              <h4>100</h4>
              <h5>Suppliers</h5>
            </div>
            <div class="dash-imgs">
              <vue-feather type="user-check"></vue-feather>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 d-flex">
          <div class="dash-count das2">
            <div class="dash-counts">
              <h4>100</h4>
              <h5>Purchase Invoice</h5>
            </div>
            <div class="dash-imgs">
              <vue-feather type="file-text"></vue-feather>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 d-flex">
          <div class="dash-count das3">
            <div class="dash-counts">
              <h4>105</h4>
              <h5>Sales Invoice</h5>
            </div>
            <div class="dash-imgs">
              <vue-feather type="file"></vue-feather>
            </div>
          </div>
        </div>
      </div>
      <!-- Button trigger modal -->
      <div class="row">
        <div class="col-lg-7 col-sm-12 col-12 d-flex">
          <div class="card flex-fill">
            <div
              class="card-header pb-0 d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title mb-0">Purchase & Sales</h5>
              <div class="graph-sets">
                <ul>
                  <li class="me-4">
                    <span>Sales</span>
                  </li>
                  <li class="ms-2">
                    <span>Purchase</span>
                  </li>
                </ul>
                <div class="dropdown">
                  <button
                    class="btn btn-white btn-sm dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    2022
                    <img
                      src="../../../assets/img/icons/dropdown.svg"
                      alt="img"
                      class="ms-2"
                    />
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item"
                        >2022</a
                      >
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item"
                        >2021</a
                      >
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item"
                        >2020</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <apexchart
                type="bar"
                height="300"
                :options="basicAreaChart.sline"
                :series="basicAreaChart.series"
              ></apexchart>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-12 d-flex">
          <div class="card flex-fill">
            <div
              class="card-header pb-0 d-flex justify-content-between align-items-center"
            >
              <h4 class="card-title mb-0">Recently Added Products</h4>
              <div class="dropdown">
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  class="dropset"
                >
                  <i class="fa fa-ellipsis-v"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <router-link to="productlist" class="dropdown-item"
                      >Product List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="addproduct" class="dropdown-item"
                      >Product Add</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive dataview datatableIndex">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  @change="onChange"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'id'">
                      <div class="productimgname">
                        <router-link to="productlist" class="product-img">
                          <img
                            :src="
                              require('../../../assets/img/product/' +
                                record.image)
                            "
                            alt="product"
                          />
                        </router-link>
                        <router-link to="productlist">{{
                          record.Products
                        }}</router-link>
                      </div>
                    </template>
                  </template>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-0">
        <div class="card-body">
          <h4 class="card-title">Expired Products</h4>
          <div class="table-responsive dataview datatableIndex">
            <a-table :columns="column" :data-source="datas" @change="onChange">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'image'">
                  <div class="productimgname">
                    <router-link to="productlist" class="product-img">
                      <img
                        :src="
                          require('../../../assets/img/product/' + record.image)
                        "
                        alt="product"
                      />
                    </router-link>
                    <router-link to="productlist">{{
                      record.ProductName
                    }}</router-link>
                  </div>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
import { ref } from "vue";
import { basicAreaChart } from "./data";
const currentDate = ref(new Date());
const columns = [
  {
    title: "Sno",
    dataIndex: "Sno",
    sorter: {
      compare: (a, b) => {
        a = a.Sno.toLowerCase();
        b = b.Sno.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Products",
    dataIndex: "Products",
    key: "id",
    sorter: {
      compare: (a, b) => {
        a = a.Products.toLowerCase();
        b = b.Products.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Price",
    dataIndex: "Price",
    sorter: {
      compare: (a, b) => {
        a = a.Price.toLowerCase();
        b = b.Price.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
];
const data = [
  {
    id: 1,
    Sno: "1",
    image: "product22.jpg",
    Products: "Apple Earpods",
    Price: "$891.2",
  },
  {
    id: 2,
    Sno: "2",
    image: "product23.jpg",
    Products: "iPhone 11",
    Price: "$668.51",
  },
  {
    id: 3,
    Sno: "3",
    image: "product24.jpg",
    Products: "samsung",
    Price: "$522.29",
  },
  {
    id: 4,
    Sno: "4",
    image: "product6.jpg",
    Products: "Macbook Pro",
    Price: "$291.01",
  },
];
const column = [
  {
    title: "Sno",
    dataIndex: "SNo",
    sorter: {
      compare: (a, b) => {
        a = a.SNo.toLowerCase();
        b = b.SNo.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Product Code",
    dataIndex: "ProductCode",
    sorter: {
      compare: (a, b) => {
        a = a.ProductCode.toLowerCase();
        b = b.ProductCode.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Product Name",
    dataIndex: "ProductName",
    key: "image",
    sorter: {
      compare: (a, b) => {
        a = a.ProductName.toLowerCase();
        b = b.ProductName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Brand Name",
    dataIndex: "BrandName",
    sorter: {
      compare: (a, b) => {
        a = a.BrandName.toLowerCase();
        b = b.BrandName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Category Name",
    dataIndex: "CategoryName",
    sorter: {
      compare: (a, b) => {
        a = a.CategoryName.toLowerCase();
        b = b.CategoryName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Expiry Date",
    dataIndex: "ExpiryDate",
    sorter: {
      compare: (a, b) => {
        a = a.ExpiryDate.toLowerCase();
        b = b.ExpiryDate.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
];
const datas = [
  {
    id: 1,
    SNo: "1",
    ProductCode: "IT0001",
    image: "product2.jpg",
    ProductName: "Orange",
    BrandName: "N/D",
    CategoryName: "Fruits",
    ExpiryDate: "12-12-2022",
  },
  {
    id: 2,
    SNo: "2",
    ProductCode: "IT0002",
    image: "product3.jpg",
    ProductName: "Pineapple",
    BrandName: "N/D",
    CategoryName: "Fruits",
    ExpiryDate: "25-11-2022",
  },
  {
    id: 3,
    SNo: "3",
    ProductCode: "IT0003",
    image: "product4.jpg",
    ProductName: "Stawberry",
    BrandName: "N/D",
    CategoryName: "Fruits",
    ExpiryDate: "19-11-2022",
  },
  {
    id: 4,
    SNo: "4",
    ProductCode: "IT0004",
    image: "product5.jpg",
    ProductName: "Avocat",
    BrandName: "N/D",
    CategoryName: "Fruits",
    ExpiryDate: "20-11-2022",
  },
];
export default {
  data() {
    return {
      basicAreaChart: basicAreaChart,
      data,
      columns,
      datas,
      column,
      startdate: currentDate,
    };
  },
};
</script>

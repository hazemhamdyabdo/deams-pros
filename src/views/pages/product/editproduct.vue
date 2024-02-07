<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
    <layouts></layouts>
    <sidebar></sidebar>
    <div class="page-wrapper">
      <div class="content">
        <pageheader :title="title" :title1="title1" />

        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <FormInput
                    label="Product Name"
                    id="productname"
                    name="productname"
                    v-model="productname"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <FormInput
                    id="category"
                    name="category"
                    label="Category"
                    type="select"
                    :options="Computers"
                    style="width: 100rem"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Sub Category</label>
                  <vue-select :options="None" placeholder="None" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Brand</label>
                  <vue-select :options="None" placeholder="None" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Unit</label>
                  <vue-select :options="Piece" placeholder="Piece" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>SKU</label>
                  <input type="text" value="PT0002" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Minimum Qty</label>
                  <input type="text" value="5" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <FormInput
                    type="number"
                    :label="$t('Quantity')"
                    id="quantity"
                    name="quantity"
                    class="w-full"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea class="form-control">
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</textarea
                  >
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Tax</label>
                  <vue-select :options="Tax" placeholder="Choose Tax" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Discount Type</label>
                  <vue-select :options="Percentage" placeholder="Percentage" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Price</label>
                  <input type="text" value="1500.00" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label> Status</label>
                  <vue-select :options="Active" placeholder="Active" />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label> Product Image</label>
                  <div class="image-upload">
                    <input type="file" />
                    <div class="image-uploads">
                      <img
                        src="../../../assets/img/icons/upload.svg"
                        alt="img"
                      />
                      <h4>Drag and drop a file to upload</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="product-list">
                  <ul class="row">
                    <li
                      :style="{
                        display: filter ? 'block' : 'none',
                      }"
                    >
                      <div class="productviews">
                        <div class="productviewsimg">
                          <img
                            src="../../../assets/img/icons/macbook.svg"
                            alt="img"
                          />
                        </div>
                        <div class="productviewscontent">
                          <div class="productviewsname">
                            <h2>macbookpro.jpg</h2>
                            <h3>581kb</h3>
                          </div>
                          <a
                            href="javascript:void(0);"
                            class="hideset"
                            v-on:click="filter = !filter"
                            >x</a
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-12">
                <a href="javascript:void(0);" class="btn btn-submit me-2"
                  >Update</a
                >
                <router-link to="productlist" class="btn btn-cancel"
                  >Cancel</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- /add -->
      </div>
    </div>
  </div>
</template>
<script>
import FormInput from "@/views/pages/Shared/form/FormItem.vue";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      filter: true,
      title: "Product Edit",
      title1: "Update your product",
      productname: "",
      Computers: [
        { value: "Computers", label: "Computers" },
        { value: "lap", label: "lap" },
        { value: "mobile", label: "mobile" },
      ],
      None: ["None", "option1"],
      Tax: ["Choose Tax", "2%"],
      Percentage: ["Percentage", "10%", "20%"],
      Piece: ["Piece", "Kg"],
      Active: ["Active", "Open"],
    };
  },
  name: "editproduct",
};
</script>

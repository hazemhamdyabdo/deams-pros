<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <pageheader />
        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              <b-row>
                <b-col 
                cols="12" 
                class="d-flex justify-content-center mb-2"
                >
                  <!-- media -->
                  <b-media no-body style="display: flex; gap: .6rem;">
                    <b-media-aside height="40">
                      <b-link>
                        <b-img
                          ref="previewEl"
                          rounded
                          height="40"
                          width="70"
                          :src="url"
                        />
                      </b-link>
                      <!--/ avatar -->
                    </b-media-aside>

                    <b-media-body class=" ml-75 mt-2">
                      <b-button
                        variant="primary"
                        style="padding: 2px 16px;"
                        size="sm"
                        @click="openFilePicker"
                      >
                        {{ $t("change") }}
                      </b-button>
                      <input
                        ref="imgupload"
                        type="file"
                        accept=".jpg, .png, .gif"
                        style="display: none"
                        @change="onFileChanged"
                      />
                      <!--/ upload button -->
                    </b-media-body>
                  </b-media>
                  <!--/ media -->
                </b-col>
              </b-row>
              <!-- data tab -->
              <b-tabs content-class="pt-2" pills fill>
                <b-tab :title="$t('mainData')">
                  <b-row>
                    <b-col md="4">
                      <gfield
                        label-text="code"
                        ref="code"
                        name="code"
                        id="code"
                        v-model="selectedItem.code"
                      />
                    </b-col>
                    <b-col md="4">
                      <!-- arabicName  -->
                      <gfield
                        id="arabicName"
                        rules="required"
                        v-model="selectedItem.arabicName"
                        label-text="arabicName"
                        ref="arabicName"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        id="englishName"
                        ref="englishName"
                        v-model="selectedItem.englishName"
                        name="englishName"
                        label-text="englishName"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="cities"
                        id="cityName"
                        ref="cityName"
                        v-model="selectedItem.cityId"
                        name="cityName"
                        label-text="cityName"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="countries"
                        id="countryName"
                        ref="countryName"
                        v-model="selectedItem.countryId"
                        name="countryName"
                        label-text="countryName"
                      />
                    </b-col>
                    <!-- numberOfUnits  -->
                    <b-col md="4">
                      <gfield
                        label-text="numberOfUnits"
                        name="numberOfUnits"
                        type="number"
                        v-model="selectedItem.NumberOfUnits"
                        rules="numeric"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <gfield
                        label-text="taxRegistrationNumber"
                        name="taxRegistrationNumber"
                        type="number"
                        v-model="selectedItem.TaxRegistrationNumber"
                        rules="numeric"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        label-text="commercialRegistrationNumber"
                        name="commercialRegistrationNumber"
                        type="number"
                        v-model="selectedItem.CommercialRegistrationNumber"
                        rules="numeric"
                      />
                    </b-col>
                    <b-col md="4">
                      <VueDatePicker
                        label="statrtOfFiscalYear"
                        v-model="selectedItem.fiscalYearStart"
                        rquired
                      />
                    </b-col>
                    <!-- <b-col md="4">
                      <gfield
                        label-text="statrtOfFiscalYear"
                        name="statrtOfFiscalYear"
                        type="number"
                        v-model="selectedItem.fiscalYearStart"
                        rules="required|numeric"
                      />
                    </b-col>  -->
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <VueDatePicker
                        label="endOfFiscalYear"
                        v-model="selectedItem.fiscalYearEnd"
                        :min="selectedItem.fiscalYearStart"
                      />
                    </b-col>

                    <b-col md="4">
                      <gfield
                        id="neighborhood"
                        ref="neighborhood"
                        v-model="selectedItem.neighborhood"
                        name="neighborhood"
                        label-text="neighborhood"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        id="street"
                        ref="street"
                        v-model="selectedItem.street"
                        name="street"
                        label-text="street"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <gfield
                        id="builidingNumber"
                        ref="builidingNumber"
                        v-model="selectedItem.builidingNumber"
                        name="builidingNumber"
                        label-text="builidingNumber"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        id="mailBox"
                        ref="mailBox"
                        v-model="selectedItem.mailBox"
                        name="mailBox"
                        label-text="mailBox"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        id="PostalCode"
                        ref="PostalCode"
                        v-model="selectedItem.postalCode"
                        name="PostalCode"
                        label-text="PostalCode"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <label
                        style="font-size: 14px; margin-bottom: 7px"
                        for="registeredInTax"
                      >
                        {{ $t("registeredInTax") }}
                      </label>
                      <b-form-group>
                        <b-form-checkbox
                          v-model="selectedItem.registeredInTax"
                          class="mr-0 mt-50"
                          name="is-rtl"
                          inline
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="12">
                      <b-form-group>
                        <label
                          style="font-size: 14px; margin-bottom: 7px"
                          for="customer"
                        >
                          {{ $t("notes") }}
                        </label>
                        <b-form-textarea
                          id="textarea"
                          v-model="selectedItem.notes"
                          label="Notes"
                          rows="3"
                          max-rows="6"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab :title="$t('contactData')">
                  <b-row>
                    <b-col md="4">
                      <gfield
                        label-text="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        v-model="selectedItem.homePhone"
                        rules="numeric"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        label-text="mobileNumber"
                        name="mobileNumber"
                        type="number"
                        v-model="selectedItem.mobileNumber"
                        rules="numeric"
                      />
                    </b-col>
                    <b-col md="4">
                      <gfield
                        label-text="faxNumber"
                        name="faxNumber"
                        type="number"
                        v-model="selectedItem.fax"
                        rules="numeric"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      <gfield
                        label-text="email"
                        name="email"
                        v-model="selectedItem.email"
                      />
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    v-permission="$route.meta.permission"
                    class="mx-2"
                    type="submit"
                    variant="primary"
                    data-action-type="save"
                  >
                    {{ $t("save") }}
                  </b-button>
                </b-col>
              </b-row>
            </gform>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@/components/form/inputs/VDatePicker.vue";
export default {
  components: {
    VueDatePicker,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      selectedItem: {
        fiscalYearStart: "",
        logoUrl: "",
      },
      items: [],
      countries: [],
      cities: [],
      id: 0,
      url: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelected();
    }
    this.getData();
    this.getCities();
    this.getCountries();
  },
  methods: {
    getData() {
      this.get({ url: "Facilities/@current" }).then((data) => {
        this.selectedItem = data;
        this.url = this.selectedItem.logoUrl
          ? `${this.domain}${this.selectedItem.logoUrl}`
          : "default_image.jpg";
        this.selectedItem.fiscalYearStart = this.getDate(data.fiscalYearStart);
        this.selectedItem.fiscalYearEnd = this.getDate(data.fiscalYearEnd);
      });
    },
    openFilePicker() {
      console.log("file");
      this.$refs.imgupload.click();
    },
    getCities() {
      this.get({ url: "Cities" }).then((data) => {
        this.cities = data;
      });
    },
    getCountries() {
      this.get({ url: "Countries" }).then((data) => {
        this.countries = data;
      });
    },
    onFileChanged(event) {
      console.log("daaa");
      const file = event.target.files[0];
      this.selectedItem.imageExtension = file.name.split(".").pop();
      this.toBase64(file)
        .then((file1) => {
          this.selectedItem.base64logo = file1.split(",").pop();
        })
        .then(() => {
          this.logoModel = {
            extension: this.selectedItem.imageExtension,
            base64Content: this.selectedItem.base64logo,
          };

          this.create({
            url: "Facilities/@current/logo",
            data: this.logoModel,
          }).then((data) => {
            this.selectedItem.logoUrl = data;
          });
        });
      this.url = URL.createObjectURL(file);
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    save() {
      this.selectedItem.branchId = this.branchId;
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
      if (this.selectedItem.id > 0) {
        this.update({
          url: "Cities",
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t("updatedSuccessfully") });
          this.$router.push({ name: "cities" });
        });
      } else {
        this.create({
          url: "Cities",
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t("savedSuccessfully") });
          this.$router.push({ name: "cities" });
        });
      }
    },
    getSelected() {
      this.get({ url: "Cities", id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },
  },
};
</script>
<style>
.card-body .nav-link.active {
  color: #fff !important;
  background-color: #fe9f43;
}

.card-body .nav-item .nav-link {
  color: #fe9f43;
  font-weight: bold;
  /* border: 1px solid #fe9f43; */
  margin: 3px;
}

.v3dp__popout[data-v-2e128338] {
  z-index: 1000;
}
</style>

<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              <b-row>
                <!-- code -->
                <b-col 
                  v-if="selectedItem.id > 0"
                  md="3"  
                >
                  <gfield
                    label-text="code"
                    ref="code"
                    name="code"
                    id="code"
                    v-model="selectedItem.code"
                  />
                </b-col>

                <!-- arabicName  -->
                <b-col md="3">
                  <gfield
                    id="arabicName"
                    rules="required"
                    v-model="selectedItem.arabicName"
                    label-text="companyArabicName"
                    ref="arabicName"
                  />
                </b-col>

                <!-- englishName -->
                <b-col md="3">
                  <gfield
                    id="englishName"
                    ref="englishName"
                    v-model="selectedItem.englishName"
                    name="englishName"
                    label-text="companyEnglishName"
                  />
                </b-col>

                <!-- taxNumber -->
                <b-col md="3">
                  <gfield
                    id="taxNumber"
                    ref="taxNumber"
                    v-model="selectedItem.taxNumber"
                    name="taxNumber"
                    label-text="companyTaxNumber"
                    rules="numeric||required"
                  />
                </b-col>

                <!-- commercialNumber -->
                <b-col md="3">
                  <gfield
                    id="taxNumber"
                    ref="taxNumber"
                    v-model="selectedItem.commercialNumber"
                    name="taxNumber"
                    label-text="companyCommercialNumber"
                    rules="numeric||required"
                  />
                </b-col>

                <!-- discountType -->
                <b-col
                  md="3"
                >
                  <label
                    style="font-size: 14px; margin-bottom: 6px;"
                  >
                    {{ $t("discountType") }}
                  </label>
                  <b-form-radio-group
                    class="group-button"
                    v-model="helper.discountTypeIsValue"
                    button-variant="outline-primary"
                    :options="discountTypeOptions"
                    size="md"
                    name="radios-btn-default"
                  />
                </b-col>

                <!-- countryName -->
                <b-col md="3">
                  <gfield
                    label-text="countryName"
                    ref="countryName"
                    name="countryName"
                    id="countryName"
                    v-model="selectedItem.countryName"
                  />
                </b-col>

                <!-- cityName -->
                <b-col md="3">
                  <gfield
                    label-text="cityName"
                    ref="cityName"
                    name="cityName"
                    id="cityName"
                    v-model="selectedItem.cityName"
                  />
                </b-col>

                <!-- address -->
                <b-col md="3">
                  <gfield
                    label-text="address"
                    ref="address"
                    name="address"
                    id="address"
                    v-model="selectedItem.address"
                  />
                </b-col>

                <!-- email -->
                <b-col md="3">
                  <gfield
                    label-text="email"
                    ref="email"
                    name="email"
                    id="email"
                    v-model="selectedItem.email"
                    rules="email"
                  />
                </b-col>

                <!-- companyPhone -->
                <b-col md="3">
                  <gfield
                    label-text="companyPhone"
                    ref="mobileNumber"
                    name="mobileNumber"
                    id="mobileNumber"
                    v-model="selectedItem.mobileNumber"
                    rules="numeric"
                  />
                </b-col>

                <!-- responsibleName -->
                <b-col md="3">
                  <gfield
                    label-text="responsibleName"
                    ref="responsibleName"
                    name="responsibleName"
                    id="responsibleName"
                    v-model="selectedItem.responsibleName"
                    rules="required"
                  />
                </b-col>

                <!-- responsibleMobileNumber -->
                <b-col md="3">
                  <gfield
                    label-text="responsibleMobileNumber"
                    ref="responsibleMobileNumber"
                    name="responsibleMobileNumber"
                    id="responsibleMobileNumber"
                    v-model="selectedItem.responsibleMobileNumber"
                    rules="numeric||required"
                  />
                </b-col>
              </b-row>

              <!-- notes -->
              <b-row>
                <b-col md="12">
                  <b-form-group>
                    <label
                      style="font-size: 14px; margin-bottom: 7px"
                      for="customer"
                    >
                      {{ $t('notes') }}
                    </label>
                    <b-form-textarea
                      id="textarea"
                      v-model="selectedItem.notes"
                      label="Notes"
                      rows="3"
                      max-rows="6"
                    />
                    <small
                      class="textarea-counter-value"
                    > {{ selectedItem.notes ? selectedItem.notes.length : 0 }} / 500
                    </small>
                    <small
                      v-if="selectedItem.notes && selectedItem.notes.length > 500"
                      class="float-right mt-2 text-danger"
                    > {{ this.$t('textLengthValidation', { for:$t('notes'), count: 500 }) }}
                    </small>
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- operations -->
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    type="submit"
                    class="me-2"
                    variant="primary"
                    data-action-type="save"
                  >
                    <vue-feather
                      type="check-circle"
                      size="12"
                      class="mx-1"
                    />
                    {{ $t('save') }}
                  </b-button>
                  <b-button
                    variant="outline-primary"
                    @click="backToList()"
                  >
                    <vue-feather
                      type="log-out"
                      size="12"
                      class="mx-1"
                    />
                    {{ $t('backToPreview') }}
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
export default {
  components: {},
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    discountTypeOptions() {
      return [
        { text: this.$t('value'), value: true },
        { text: this.$t('percentage'), value: false },
      ];
    }
  },
  data() {
    return {
      id: 0,
      selectedItem: {},
      helper: {
        discountTypeIsValue: true
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelected();
    }
  },
  methods: {
    prepareBeforeSave() {
      this.selectedItem.englishName = !this.selectedItem.englishName 
                                    ? this.selectedItem.arabicName 
                                    : this.selectedItem.englishName;

      this.selectedItem.discountType = this.helper.discountTypeIsValue 
                                     ? 'value' 
                                     : 'percentage' 
    },
    save() {
      this.prepareBeforeSave();
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'CompaniesContracts',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });
      } else {
        this.create({
          url: 'CompaniesContracts',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },
    getSelected() {
      this.get({ url: 'CompaniesContracts', id: this.id }).then((data) => {
        this.selectedItem = data;
        this.helper.discountTypeIsValue = this.selectedItem.discountType === 'value';
      });
    },

    backToList() {
      this.$router.push({ name: 'companiesContracts' });
    },
  },
};
</script>

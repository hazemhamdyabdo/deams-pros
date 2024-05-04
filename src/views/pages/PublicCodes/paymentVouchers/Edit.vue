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

                <!-- transaction Date -->
                <b-col md="3">  
                  <VueDatePicker
                    label="transactionDate"
                    v-model="selectedItem.transactionDate"
                  />
                </b-col>

                <!-- transaction Time  -->
                <b-col md="3">
                  <gfield
                    label-text="transactionTime"
                    name="transactionTime"
                    v-model="selectedItem.transactionTime"
                    disabled
                  />
                </b-col>

                <!-- expense  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"           
                    field="select" 
                    id="expenseId"
                    name="expenseId"
                    label-text="expense"
                    rules="required"
                    v-model="selectedItem.expenseId"
                    :options="lookup.expenses"
                    :dir="'rtl'"
                  />
                </b-col>

                <!-- isTaxable  -->
              <b-col md="3">
                <label
                  style="font-size: 14px; margin-bottom: 10px"
                  for="roomContainsKitchen"
                >
                  {{ $t('taxable') }}
                </label>
                <b-form-group>
                  <b-form-checkbox
                    id="isTaxable"
                    v-model="selectedItem.isTaxable"
                    name="is-rtl"
                    inline
                    @change="toggleVisibilty();"
                  />
                </b-form-group>
              </b-col>

              <!-- voucherValue -->
              <b-col md="3">
                  <gfield
                    id="voucherValue"
                    name="voucherValue"
                    v-model="selectedItem.voucherValue"
                    label-text="voucherValue"
                    rules="required|numeric"
                  />
                </b-col>

                <!-- taxValue -->
                <b-col 
                  v-if="visibility.tax"
                  md="3"
                >
                  <gfield
                    id="taxValue"
                    name="taxValue"
                    v-model="selectedItem.taxValue"
                    label-text="taxValue"
                    disabled
                  />
                </b-col>

                <!-- afterTaxValue -->
                <b-col 
                  v-if="visibility.afterTax"
                  md="3"
                >
                  <gfield
                    id="afterTaxValue"
                    name="afterTaxValue"
                    v-model="selectedItem.afterTaxValue"
                    label-text="orignalPrice"
                    disabled
                  />
                </b-col>

                <!-- supplier  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"           
                    field="select" 
                    id="supplierId"
                    name="supplierId"
                    label-text="supplier"
                    v-model="selectedItem.supplierId"
                    :options="lookup.suppliers"
                    :dir="'rtl'"
                  />
                </b-col>

                <!-- paymentMethod  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"           
                    field="select" 
                    id="paymentMethodId"
                    name="paymentMethodId"
                    label-text="paymentMethod"
                    rules="required"
                    v-model="selectedItem.paymentMethodId"
                    :options="lookup.paymentMethods"
                    :dir="'rtl'"
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

              <!-- opertaions -->
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
      selectedItem: {},
      lookup: {
        expenses: [],
        suppliers: [],
        paymentMethods: []
      },
      visibility: {
        tax: false,
        afterTax: false
      },
      items: [],
      id: 0,
    };
  },
  mounted() {
    this.onLoad();
    this.getLookups();
    if (this.id > 0) {
      this.getSelected();
    }
  },
  watch: {
    // calculate tax Value
    'selectedItem.voucherValue' (voucherValue){
      this.calculatedTax(voucherValue);
    }
  },
  methods: {
    save() {
      this.selectedItem.branchId = this.branchId;
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
      if (this.selectedItem.id > 0) {
        this.update({
          url: "PaymentVouchers",
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t("updatedSuccessfully") });
          this.backToList();
        });
      } else {
        this.create({
          url: "PaymentVouchers",
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t("savedSuccessfully") });
          this.backToList();
        });
      }
    },
    onLoad() {
      this.id = this.$route.params.id;
      this.selectedItem.transactionDate = this.getDate();
      this.selectedItem.transactionTime = this.getTime();
      this.selectedItem.voucherValue = 0;
    },
    calculatedTax(voucherValue) {
      if (!this.selectedItem.isTaxable) {
        this.selectedItem.taxValue = 0;
        this.selectedItem.afterTaxValue = 0;
      } else {
        this.selectedItem.afterTaxValue = (voucherValue / 1.15).toFixed(2);
        this.selectedItem.taxValue = (voucherValue - this.selectedItem.afterTaxValue).toFixed(2);
      }
    },
    getSelected() {
      this.get({ url: "PaymentVouchers", id: this.id }).then((data) => {
        this.selectedItem = data;
        this.selectedItem.transactionDate = new Date (this.selectedItem.transactionDate);
        if (this.selectedItem.isTaxable) {
          this.visibility.tax = true;
          this.visibility.afterTax = true;
        }
      });
    },
    backToList() {
      this.$router.push({ name: 'paymentVouchers' });
    },
    toggleVisibilty() {
      this.visibility.tax = !this.visibility.tax;
      this.visibility.afterTax = !this.visibility.afterTax;
      this.calculatedTax(this.selectedItem.voucherValue);
    },
    getLookups() {
      this.get({ url: 'Suppliers' }).then((data) => {
        this.lookup.suppliers = data;
      });
      this.get({ url: 'PaymentMethods' }).then((data) => {
        this.lookup.paymentMethods = data;
      });
      this.get({ url: 'Expenses' }).then((data) => {
        this.lookup.expenses = data;
      });
    }
  }
}
</script>

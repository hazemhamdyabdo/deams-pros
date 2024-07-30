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

              <b-row>
                <!-- identity image upload -->
                <b-col md="6">
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <label style="margin-bottom: 10px;"> {{ $t('attachmentForPaymentVoucher') }}</label>
                      <div v-if="selectedItem.attachmentName">
                        <!-- download button -->
                        <b-button
                          v-b-tooltip.hover.top="$t('downloadAttachment')"
                          class="me-2"
                          variant="outline-success"
                          style="font-size: 11px;"
                          @click="downloadAttachment()"
                        > 
                          <vue-feather
                            type="download"
                            size="12"
                          />
                            {{ $t('download') }}
                        </b-button>
                        <!-- remove button -->
                        <b-button
                            v-b-tooltip.hover.top="$t('removeAttachment')"
                            variant="outline-danger"
                            style="font-size: 11px;"
                            @click="deleteAttachment()"
                          > 
                          <vue-feather
                            type="trash-2"
                            size="12"
                          />
                          {{ $t('delete') }} 
                        </b-button>
                      </div>
                    </div>
                    <div class="image-upload">
                      <input 
                        type="file" 
                        style="height: 102px;" 
                        @change="handleFileInputChange()"  
                        accept=".pdf, .jpg, .jpeg, .png"
                      />
                      <div class="image-uploads">
                        <img 
                          src="@/assets/img/icons/upload.svg" alt="upload-img" 
                        />
                        <h4>{{ selectedItem.attachmentName ? selectedItem.attachmentName : $t('dragAndDropFileToUpload') }}</h4>
                      </div>
                    </div>  
                  </b-form-group>
                </b-col>

                <!-- notes -->
                <b-col md="6">
                  <b-form-group>
                    <label
                      style="font-size: 14px; margin-bottom: 12px"
                      for="customer"
                    >
                      {{ $t("notes") }}
                    </label>
                    <b-form-textarea
                      id="textarea"
                      v-model="selectedItem.notes"
                      label="Notes"
                      rows="4"
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
import saveAs from 'file-saver';

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
        attachmentName: '',
        attachmentFileExtension: '',
        attachmentBase64Content: '',
      },
      lookup: {
        expenses: [],
        suppliers: [],
        paymentMethods: [],
        transactionDate: new Date()
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
        this.selectedItem.afterTaxValue = voucherValue;
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
    },

    handleFileInputChange(event) {
      if(event.target.files[0] && this.validateFile(event.target.files[0])) {
        const file = event.target.files[0];
        this.selectedItem.attachmentName = file.name;
        this.selectedItem.attachmentFileExtension = file.name.split('.').pop().toLowerCase();;
        this.toBase64(file).then((fileBase) => {
          this.selectedItem.attachmentBase64Content = fileBase.split(',').pop();
        });
      } else {
        event.target.value = '';
      }
    },
    validateFile(file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const extension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(extension);
    },
    downloadAttachment() {
      saveAs(`${this.baseUrl}${this.selectedItem.attachmentUrl}`, `${this.selectedItem.attachmentName}`);
    },
    deleteAttachment() {
      this.selectedItem.attachmentFileExtension = null;
      this.selectedItem.attachmentBase64Content = null;
      this.selectedItem.attachmentName = null;
    }
  }
}
</script>

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

                <!-- guest  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"           
                    field="select" 
                    id="guestId"
                    name="guestId"
                    label-text="guest"
                    rules="required"
                    v-model="selectedItem.guestId"
                    :options="lookup.guests"
                    :dir="'rtl'"
                  />
                </b-col>

                <!-- voucher Value -->
                <b-col md="3">
                  <gfield
                    id="voucherValue"
                    name="voucherValue"
                    v-model="selectedItem.voucherValue"
                    label-text="voucherValue"
                    rules="required|numeric"
                  />
                </b-col>

                <!-- payment Method  -->
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

              <!-- opertation -->
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
        guests: [],
        paymentMethods: [],
        transactionDate: new Date()
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
  methods: {
    save() {
      this.selectedItem.branchId = this.branchId;
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
      if (this.selectedItem.id > 0) {
        this.update({
          url: "CollectionVouchers",
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t("updatedSuccessfully") });
          this.backToList();
        });
      } else {
        this.create({
          url: "CollectionVouchers",
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t("savedSuccessfully") });
          this.backToList();
        });
      }
    },
    onLoad() {
      this.id = this.$route.params.id;
      this.selectedItem.transactionTime = this.getTime();
      this.selectedItem.voucherValue = 0;
    },
    getSelected() {
      this.get({ url: "CollectionVouchers", id: this.id }).then((data) => {
        this.selectedItem = data;
        this.selectedItem.transactionDate = new Date (this.selectedItem.transactionDate);
      });
    },
    backToList() {
      this.$router.push({ name: 'collectionVouchers' });
    },
    getLookups() {
      this.get({ url: 'Guests' }).then((data) => {
        this.lookup.guests = data;
      });
      this.get({ url: 'PaymentMethods' }).then((data) => {
        this.lookup.paymentMethods = data;
      });
    }
  }
}
</script>

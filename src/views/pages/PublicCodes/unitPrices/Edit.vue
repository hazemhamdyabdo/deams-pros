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
                  <!-- unitType -->
                  <b-col md="3">
                    <gfield
                      id="unitType"
                      ref="unitType"
                      v-model="selectedItem.unitType"
                      name="unitType"
                      label-text="unitType"
                      rules="required"
                    />
                  </b-col>
  
                  <!-- dailyPrice -->
                  <b-col md="3">
                    <gfield
                      id="dailyPrice"
                      name="dailyPrice"
                      v-model="selectedItem.dailyPrice"
                      label-text="dailyPrice"
                      rules="required|numeric"
                    />
                  </b-col>
  
                  <!-- weeklyPrice -->
                  <b-col md="3">
                    <gfield
                      id="weeklyPrice"
                      name="weeklyPrice"
                      v-model="selectedItem.weeklyPrice"
                      label-text="weeklyPrice"
                      rules="required|numeric"
                    />
                  </b-col>
  
                  <!-- monthlyPrice -->
                  <b-col md="3">
                    <gfield
                      id="monthlyPrice"
                      name="monthlyPrice"
                      v-model="selectedItem.monthlyPrice"
                      label-text="monthlyPrice"
                      rules="required|numeric"
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
  import VueDatePicker from "@/components/form/inputs/VDatePicker.vue";
  export default {
    components: {
      VueDatePicker
    },
    props: {
      id: {
        type: [Number, String],
        default: 0,
      },
    },
    data() {
      return {
        id: 0,
        selectedItem: {
        }
      };
    },
    mounted() {
      this.inLoad();
      if (this.id > 0) {
        this.getSelected();
      }
    },
    watch: {
    },
    methods: {
      inLoad() {
        this.id = this.$route.params.id;
      },
      save() {
        if (this.selectedItem.id > 0) {
          this.update({
            url: 'UnitPrices',
            data: this.selectedItem,
            id: this.selectedItem.id,
          }).then(() => {
            this.doneAlert({ text: this.$t('updatedSuccessfully') });
            this.backToList();
          });
        } else {
          this.create({
            url: 'UnitPrices',
            data: this.selectedItem,
          }).then(() => {
            this.doneAlert({ text: this.$t('savedSuccessfully') });
            this.backToList();
          });
        }
      },
      getSelected() {
        this.get({ url: 'UnitPrices', id: this.id }).then((data) => {
          this.selectedItem = data;
        });
      },
  
      backToList() {
        this.$router.push({ name: 'unitesPrices' });
      },
    },
  };
  </script>
  
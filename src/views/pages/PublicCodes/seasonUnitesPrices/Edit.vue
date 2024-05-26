<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              
              <!-- isActive -->
              <b-row class="mb-4">
                <b-col md="3">
                  <b-form-checkbox
                    v-model="selectedItem.isActive"
                    name="check-button"
                    switch
                    inline
                  >
                    {{ $t('active') }}
                  </b-form-checkbox>
                </b-col>
              </b-row>

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
                    label-text="arabicName"
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
                    label-text="englishName"
                  />
                </b-col>

                <!-- seasonStartDate  -->
                <b-col md="3">
                  <VueDatePicker
                    label="seasonStartDateAd"
                    v-model="selectedItem.seasonStartDate"
                  />
                </b-col>

                <!-- seasonStartDateHijri  -->
                <b-col md="3">
                  <gfield
                    label-text="seasonStartDateHijri"
                    id="seasonStartDateHijri"
                    name="seasonStartDateHijri"
                    v-model="selectedItem.seasonStartDateHijri"
                    disabled
                  />
                </b-col>

                <!-- seasonEndDate  -->
                <b-col md="3">
                  <VueDatePicker
                    label="seasonEndDateAd"
                    v-model="selectedItem.seasonEndDate"
                  />
                </b-col>

                <!-- seasonEndDateHijri  -->
                <b-col md="3">
                  <gfield
                    label-text="seasonEndDateHijri"
                    id="seasonEndDateHijri"
                    name="seasonEndDateHijri"
                    v-model="selectedItem.seasonEndDateHijri"
                    disabled
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
        isActive: true,
        seasonStartDate: new Date(),
        seasonEndDate: new Date()
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
    'selectedItem.seasonStartDate'(startAdDate) {
      this.selectedItem.seasonStartDateHijri = this.adDateToHijriDate(startAdDate)
    },

    'selectedItem.seasonEndDate'(EndAdDate) {
      this.selectedItem.seasonEndDateHijri = this.adDateToHijriDate(EndAdDate)
    }
  },
  methods: {
    prepareBeforeSave() {
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
    },
    inLoad() {
      this.id = this.$route.params.id;
      this.selectedItem.seasonStartDate = this.getDate();
      this.selectedItem.seasonStartDateHijri = this.adDateToHijriDate();
      this.selectedItem.seasonEndDate = this.getDate();
      this.selectedItem.seasonEndDateHijri = this.adDateToHijriDate();
    },
    save() {
      this.prepareBeforeSave();
      if (!this.selectedItem.englishName) this.selectedItem.englishName = this.selectedItem.arabicName;
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'SeasonUnitesPrices',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });
      } else {
        this.create({
          url: 'SeasonUnitesPrices',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },
    getSelected() {
      this.get({ url: 'SeasonUnitesPrices', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },

    backToList() {
      this.$router.push({ name: 'seasonUnitesPrices' });
    },
  },
};
</script>

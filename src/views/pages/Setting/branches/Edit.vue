<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
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
                  <gfield
                    label-text="arabicName"
                    ref="arabicName"
                    name="arabicName"
                    id="arabicName"
                    v-model="selectedItem.arabicName"
                    rules="required"
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
                    id="workHours"
                    ref="workHours"
                    v-model="selectedItem.workHours"
                    name="workHours"
                    label-text="workHours"
                  />
                </b-col>
                <b-col md="4">
                  <gfield
                    id="address"
                    ref="address"
                    v-model="selectedItem.address"
                    name="address"
                    label-text="address"
                  />
                </b-col>
                <!-- mobileNumber -->
                <b-col md="4">
                  <gfield
                    id="mobileNumber"
                    v-model="selectedItem.phone1"
                    name="mobileNumber"
                    label-text="mobileNumber"
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
                    <small class="textarea-counter-value">
                      {{ selectedItem.notes ? selectedItem.notes.length : 0 }} /
                      500
                    </small>
                    <small
                      v-if="
                        selectedItem.notes && selectedItem.notes.length > 500
                      "
                      class="float-right mt-2 text-danger"
                    >
                      {{
                        this.$t('textLengthValidation', {
                          for: $t('notes'),
                          count: 500,
                        })
                      }}
                    </small>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    type="submit"
                    class="me-2"
                    variant="primary"
                    data-action-type="save"
                  >
                    <vue-feather type="check-circle" size="12" class="mx-1" />
                    {{ $t('save') }}
                  </b-button>
                  <b-button variant="outline-primary" @click="backToList()">
                    <vue-feather type="log-out" size="12" class="mx-1" />
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
  data() {
    return {
      selectedItem: {
        isShared: true,
        englishName: ''
      },
      items: [],
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelectedBranch();
    }
  },
  methods: {
    save() {
      this.selectedItem.branchId = this.branchId;
      //   if (!this.selectedItem.englishName) {
      //     this.selectedItem.englishName = this.selectedItem.arabicName;
      //   }
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'Branches',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.$router.push({ name: 'branches-list' });
        });
      } else {
        this.create({
          url: 'Branches',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.$router.push({ name: 'branches-list' });
        });
      }
    },
    getSelectedBranch() {
      this.get({ url: 'Branches', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },
    backToList() {
      this.$router.push({ name: 'branches-list' });
    },
  },
};
</script>

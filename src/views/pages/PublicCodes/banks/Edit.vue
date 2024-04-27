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
                <b-col md="3">
                  <gfield
                    label-text="arabicName"
                    ref="arabicName"
                    name="arabicName"
                    id="arabicName"
                    v-model="selectedItem.arabicName"
                    rules="required"
                  />
                </b-col>
                <b-col md="3">
                  <gfield
                    id="englishName"
                    ref="englishName"
                    v-model="selectedItem.englishName"
                    name="englishName"
                    label-text="englishName"
                  />
                </b-col>
                <!-- accountNumber -->
                <b-col md="3">
                  <gfield
                    id="accountNumber"
                    v-model="selectedItem.accountNumber"
                    name="accountNumber"
                    label-text="accountNumber"
                  />
                </b-col>
                <!-- iban  -->
                <b-col md="3">
                  <gfield
                    id="iban"
                    v-model="selectedItem.iban"
                    label-text="iban"
                    name="iban"
                    rules="required"
                  />
                </b-col>
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 7px"
                    for="general"
                  >
                    {{ $t('general') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      v-model="selectedItem.isShared"
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
                      {{ $t('notes') }}
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
  data() {
    return {
      selectedItem: {},
      items: [],
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelectedBank();
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
          url: 'Banks',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.$router.push({ name: 'banks' });
        });
      } else {
        this.create({
          url: 'Banks',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.$router.push({ name: 'banks' });
        });
      }
    },
    getSelectedBank() {
      this.get({ url: 'Banks', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },
    backToList() {
      this.$router.push({ name: 'banks' });
    },
  },
};
</script>

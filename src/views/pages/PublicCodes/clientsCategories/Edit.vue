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

                <!-- discount -->
                <b-col md="3">
                  <gfield
                    id="discount"
                    name="discount"
                    v-model="selectedItem.discountValue"
                    label-text="discount"
                    rules="required|numeric"
                  />
                </b-col>
              </b-row>

              <!-- notes -->
              <b-row>
                <b-col md="12">
                  <b-form-group :label="$t('notes')">
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
  data() {
    return {
      id: 0,
      selectedItem: {
        isActive: true
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
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
    },
    save() {
      this.prepareBeforeSave();
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'ClientsCategories',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });
      } else {
        this.create({
          url: 'ClientsCategories',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },
    getSelected() {
      this.get({ url: 'ClientsCategories', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },

    backToList() {
      this.$router.push({ name: 'clientsCategories' });
    },
  },
};
</script>

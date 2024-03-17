<template>
  <div class="main-wrapper">
  <div class="page-wrapper">
    <div class="content">
      <pageheader 
        :title=$t(title) 
        :title1=$t(title1) 
      />
      <div class="card">
        <div class="card-body">
          <gform @submit="save()">
            <b-row>
              <!-- code  -->
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

              <!-- englishName  -->
              <b-col md="3">
                <gfield
                    id="englishName"
                    v-model="selectedItem.englishName"
                    label-text="englishName"
                    ref="englishName"
                    dir="ltr"
                  />
              </b-col>

              <!-- isShared  -->
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

            <!-- notes  -->
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
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

            <!-- save button -->
            <b-row>
              <b-col cols="12" class="d-flex justify-content-end">
                <b-button
                  class="me-2"
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
                <b-button
                  type="submit"
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
// props section
props: {
  id: {
    type: Number,
    default: 0,
  },
},

// data section
data() {
  return {
    selectedItem: {},
    title: 'sources',
    title1: '',
    id: 0,
  };
},

// mounted section
mounted() {
  this.id = this.$route.params.id;
  this.title1 = this.id > 0 ? this.$t('editSource') : this.$t('addSource')
  if (this.id > 0) {
    this.getSelectedItem();
  }
},

// methods section
methods: {
  save() {
    // update
    if (this.selectedItem.id > 0) {
      this.update({
        url: 'Sources',
        data: this.selectedItem,
        id: this.selectedItem.id,
      }).then(() => {
        this.doneAlert({ text: this.$t('updatedSuccessfully') });
        this.backToList();
      });

      // insert
    } else {
      this.prepareForAdd();
      this.create({
        url: 'Sources',
        data: this.selectedItem,
      }).then(() => {
        this.doneAlert({ text: this.$t('savedSuccessfully') });
        this.backToList();
      });
    }
  },

  prepareForAdd() {
    if (!this.selectedItem.englishName)
      this.selectedItem.englishName = this.selectedItem.arabicName;
  },

  getSelectedItem() {
    this.get({ url: 'Sources', id: this.id }).then((data) => {
      this.selectedItem = data;
    });
  },

  backToList() {
    this.$router.push({ name: 'sources' });
  },
},
};
</script>

<style scoped>
</style>

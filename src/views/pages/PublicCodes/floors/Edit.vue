<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <pageheader  />
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
                  <!-- arabicName  -->
                  <gfield
                    id="arabicName"
                    rules="required"
                    v-model="selectedItem.arabicName"
                    label-text="arabicName"
                    ref="arabicName"
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
                <b-col md="3">
                  <gfield
                    label="arabicName"
                    :dir="'rtl'"
                    field="select"
                    :options="Buildings"
                    ref="buildingName"
                    v-model="selectedItem.buildingId"
                    label-text="buildingName"
                  />
                </b-col>
                <!-- arrangement  -->
                <b-col md="3">
                  <gfield
                    id="floorNumber"
                    v-model="selectedItem.arrangement"
                    name="floorNumber"
                    ref="floorNumber"
                    label-text="floorNumber"
                  />
                </b-col>
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 7px"
                    for="buidingInService"
                  >
                    {{ $t('FloorInService') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      v-model="selectedItem.status"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <!-- <b-col md="4">
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
                </b-col> -->
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
      Buildings: [],
      items: [],
      title: '',
      title1: '',
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getBuildings();
    if (this.id > 0) {
      this.getSelected();
    }
  },
  methods: {
    getBuildings() {
      this.get({ url: 'Buildings' }).then((data) => {
        this.Buildings = data;
      });
    },
    save() {
      this.selectedItem.branchId = this.branchId;
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'Floors',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.$router.push({ name: 'floor' });
        });
      } else {
        this.create({
          url: 'Floors',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.$router.push({ name: 'floor' });
        });
      }
    },
    getSelected() {
      this.get({ url: 'Floors', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },

    backToList() {
      this.$router.push({ name: 'floor' });
    },
  },
};
</script>

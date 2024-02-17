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
                
                <!-- roomNumber  -->
                <b-col md="3">
                  <gfield
                    id="roomNumber"
                    v-model="selectedItem.roomNumber"
                    label-text="roomNumber"
                    ref="roomNumber"
                  />
                </b-col>

                <!-- building  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"
                    :dir="'rtl'"
                    field="select"
                    :options="buildings"
                    id="buildingId"
                    ref="buildingId"
                    v-model="selectedItem.buildingId"
                    name="buildingId"
                    label-text="building"
                  />
                </b-col>

                <!-- floor  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"
                    dir="rtl"
                    field="select"
                    :options="floors"
                    id="floorId"
                    ref="floorId"
                    v-model="selectedItem.floorId"
                    name="floorId"
                    label-text="floor"
                  />
                </b-col>

                <!-- roomArea  -->
                <b-col md="3">
                  <gfield
                    id="roomArea"
                    v-model="selectedItem.roomArea"
                    label-text="roomArea"
                    ref="roomArea"
                  />
                </b-col>
                
                <!-- roomType  -->
                <b-col md="3">
                  <gfield
                    label="arabicName"
                    :dir="'rtl'"
                    field="select"
                    :options="roomTypes"
                    id="roomTypeId"
                    ref="roomTypeId"
                    v-model="selectedItem.roomTypeId"
                    name="roomTypeId"
                    label-text="roomType"
                  />
                </b-col>

                <!-- isRoomClean -->
                <b-col
                  md="3"
                >
                  <label
                    style="font-size: 14px; margin-bottom: 6px;"
                  >
                    {{ $t("roomStatus") }}
                  </label>
                  <b-form-radio-group
                    class="room-status-group"
                    v-model="selectedItem.isRoomClean"
                    button-variant="outline-primary"
                    :options="roomStatusOptions"
                    size="md"
                    name="radios-btn-default"
                  />
                </b-col>

                <!-- bathroomCount  -->
                <b-col md="3">
                  <gfield
                    id="bathroomCount"
                    v-model="selectedItem.bathroomCount"
                    type="number"
                    label-text="bathroomCount"
                    ref="bathroomCount"
                  />
                </b-col>

                <!-- bedsCount  -->
                <b-col md="3">
                  <gfield
                    id="bedsCount"
                    v-model="selectedItem.bedsCount"
                    type="number"
                    label-text="bedsCount"
                    ref="bedsCount"
                  />
                </b-col>
                
                <!-- isContainKitchen  -->
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
                    for="roomContainsKitchen"
                  >
                    {{ $t('roomContainsKitchen') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      id="roomContainsKitchen"
                      v-model="selectedItem.isContainKitchen"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                      @change="kitchenChanged()"
                    />
                  </b-form-group>
                </b-col>

                <!-- kitchen  -->
                <b-col 
                  v-if="helper.showKitchens"
                  md="3"
                >
                  <gfield
                    label="arabicName"
                    :dir="'rtl'"
                    field="select"
                    :options="kitchens"
                    id="kitchenId"
                    ref="kitchenId"
                    v-model="selectedItem.kitchenId"
                    name="kitchenId"
                    label-text="kitchen"
                    :rules="{ required: helper.showKitchens}"
                  />
                </b-col>

                 <!-- isContainLounge  -->
                 <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
                    for="roomContainsLounge"
                  >
                    {{ $t('roomContainsLounge') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      id="roomContainsLounge"
                      v-model="selectedItem.isContainLounge"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                      @change="loungeChanged()"
                    />
                  </b-form-group>
                </b-col>

                <!-- lounge  -->
                <b-col 
                  v-if="helper.showLounges"
                  md="3"
                >
                  <gfield
                    label="arabicName"
                    :dir="'rtl'"
                    field="select"
                    :options="lounges"
                    id="loungeId"
                    ref="loungeId"
                    v-model="selectedItem.loungeId"
                    name="loungeId"
                    label-text="lounge"
                    :rules="{ required: helper.showLaunges}"
                  />
                </b-col>

                <!-- isContainLandline  -->
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
                    for="roomContainsLandline"
                  >
                    {{ $t('roomContainsLandline') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      id="roomContainsLandline"
                      v-model="selectedItem.isContainLandline"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                      @change="landlineChanged()"
                    />
                  </b-form-group>
                </b-col>

                <!-- landlineConversion  -->
                <b-col 
                  v-if="helper.showLandlineConversion"
                  md="3"
                >
                  <gfield
                    id="landlineConversion"
                    v-model="selectedItem.landlineConversion"
                    label-text="landlineConversion"
                    ref="landlineConversion"
                    :rules="{ required: helper.showLandlineConversion}"
                  />
                </b-col>

                <!-- isContainTV  -->
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
                    for="roomContainsTV"
                  >
                    {{ $t('roomContainsTV') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      id="roomContainsTV"
                      v-model="selectedItem.isContainTV"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                    />
                  </b-form-group>
                </b-col>

                <!-- isOutOfService  -->
                <b-col md="3">
                  <label
                    style="font-size: 14px; margin-bottom: 10px"
                    for="outOfService"
                  >
                    {{ $t('outOfService') }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      id="outOfService"
                      v-model="selectedItem.isOutOfService"
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
                    v-permission="$route.meta.permission"
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
      helper: {
        showKitchens: false,
        showLonuges: false,
        showLandlineConversion: false
      },
      title: 'rooms',
      title1: 'addRoom',
      id: 0,
    };
  },

  computed: {
    roomStatusOptions() {
      return [
        { text: this.$t('clean'), value: true },
        { text: this.$t('notClean'), value: false },
      ];
    }
  },

  // mounted section
  mounted() {
    this.id = this.$route.params.id;
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
          url: 'Rooms',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });

        // insert
      } else {
        this.create({
          url: 'Rooms',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },

    getSelectedItem() {
      this.get({ url: 'Rooms', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },

    backToList() {
      this.$router.push({ name: 'room' });
    },

    kitchenChanged() {
      this.helper.showKitchens = !this.helper.showKitchens;
      this.selectedItem.kitchenId = null
    },

    loungeChanged() {
      this.helper.showLounges = !this.helper.showLounges;
      this.selectedItem.loungeId = null
    },

    landlineChanged() {
      this.helper.showLandlineConversion = !this.helper.showLandlineConversion;
      this.selectedItem.landlineConversion = null
    }
  },
};
</script>

<style scoped>
.room-status-group {
  display: flex !important;
  justify-content: center;
  align-items: center;
  border: 1px solid #ced4da;
  padding: 6px;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>

<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform @submit="save()" class="room-data">
              <b-tabs content-class="pt-2" pills fill>
                <b-tab :title="$t('mainData')">
                  <!-- isOutOfService -->
                  <b-row class="mb-4">
                    <b-col md="3">
                      <b-form-checkbox
                        v-model="selectedItem.isOutOfService"
                        name="check-button"
                        switch
                        inline
                      >
                        {{ $t('outOfService') }}
                      </b-form-checkbox>
                    </b-col>
                  </b-row>

                  <b-row>
                    <!-- code  -->
                    <b-col v-if="selectedItem.id > 0" md="3">
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
                        rules="required"
                      />
                    </b-col>

                    <!-- building  -->
                    <b-col md="3">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="lookup.buildings"
                        id="buildingId"
                        ref="buildingId"
                        v-model="selectedItem.buildingId"
                        name="buildingId"
                        label-text="building"
                        rules="required"
                        @change="
                          () => {
                            selectedItem.floorId = null;
                          }
                        "
                      />
                    </b-col>

                    <!-- floor  -->
                    <b-col md="3">
                      <gfield
                        label="arabicName"
                        dir="rtl"
                        field="select"
                        :options="lookup.floors"
                        id="floorId"
                        ref="floorId"
                        v-model="selectedItem.floorId"
                        name="floorId"
                        label-text="floor"
                        rules="required"
                        :filterFn="
                          (floor) => floor.buildingId == selectedItem.buildingId
                        "
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
                        :options="lookup.roomTypes"
                        id="roomTypeId"
                        ref="roomTypeId"
                        v-model="selectedItem.roomTypeId"
                        name="roomTypeId"
                        label-text="roomType"
                        rules="required"
                      />
                    </b-col>

                    <!-- roomType  -->
                    <b-col md="3">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="lookup.roomStatuses"
                        id="roomStatusId"
                        ref="roomStatusId"
                        v-model="selectedItem.roomStatusId"
                        name="roomStatusId"
                        label-text="roomStatus"
                        rules="required"
                      />
                    </b-col>

                    <!-- isRoomClean
              <b-col
                md="3"
              >
                <label
                  style="font-size: 14px; margin-bottom: 6px;"
                >
                  {{ $t("roomStatus") }}
                </label>
                <b-form-radio-group
                  class="group-button"
                  v-model="selectedItem.isRoomClean"
                  button-variant="outline-primary"
                  :options="roomStatusOptions"
                  size="md"
                  name="radios-btn-default"
                />
              </b-col> -->

                    <!-- bathroomCount  -->
                    <b-col md="3">
                      <gfield
                        id="bathroomCount"
                        v-model="selectedItem.bathroomsCount"
                        label-text="bathroomCount"
                        rules="numeric"
                      />
                    </b-col>

                    <!-- bedsCount  -->
                    <b-col md="3">
                      <gfield
                        id="bedsCount"
                        v-model="selectedItem.bedsCount"
                        label-text="bedsCount"
                        rules="numeric"
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
                          inline
                          @change="kitchenChanged()"
                        />
                      </b-form-group>
                    </b-col>

                    <!-- kitchen  -->
                    <b-col v-if="helper.showKitchens" md="3">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="lookup.kitchens"
                        id="kitchenId"
                        ref="kitchenId"
                        v-model="selectedItem.kitchenId"
                        name="kitchenId"
                        label-text="kitchen"
                        :rules="{ required: helper.showKitchens }"
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
                          inline
                          @change="loungeChanged()"
                        />
                      </b-form-group>
                    </b-col>

                    <!-- lounge  -->
                    <b-col v-if="helper.showLounges" md="3">
                      <gfield
                        label="arabicName"
                        :dir="'rtl'"
                        field="select"
                        :options="lookup.lounges"
                        id="loungeId"
                        ref="loungeId"
                        v-model="selectedItem.loungeId"
                        name="loungeId"
                        label-text="lounge"
                        :rules="{ required: helper.showLaunges }"
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
                          inline
                          @change="landlineChanged()"
                        />
                      </b-form-group>
                    </b-col>

                    <!-- landlineConversion  -->
                    <b-col v-if="helper.showLandlineConversion" md="3">
                      <gfield
                        id="landlineConversion"
                        v-model="selectedItem.landlineConversion"
                        label-text="landlineConversion"
                        ref="landlineConversion"
                        :rules="{ required: helper.showLandlineConversion }"
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
                        <small class="textarea-counter-value">
                          {{
                            selectedItem.notes ? selectedItem.notes.length : 0
                          }}
                          / 500
                        </small>
                        <small
                          v-if="
                            selectedItem.notes &&
                            selectedItem.notes.length > 500
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
                </b-tab>
                <b-tab :title="$t('roomPrice')">
                <b-row>
                  <!-- arabicName  -->
                <b-col md="3">
                  <gfield
                    id="arabicName"
                    v-model="_roomPrice.seasonPriceArabicName"
                    label-text="arabicName"
                    ref="arabicName"
                  />
                </b-col>
                <b-col md="3">
                  <gfield
                    id="englishName"
                    v-model="_roomPrice.seasonPriceEnglishName"
                    label-text="englishName"
                    ref="englishName"
                  />
                </b-col>
                   <!-- seasonStartDate  -->
                <b-col md="3">
                  <VueDatePicker
                    label="seasonStartDateAd"
                    v-model="_roomPrice.seasonStartDate"
                  />
                </b-col>

                <!-- seasonStartDateHijri  -->
                <b-col md="3">
                  <gfield
                    label-text="seasonStartDateHijri"
                    id="seasonStartDateHijri"
                    name="seasonStartDateHijri"
                    v-model="_roomPrice.seasonStartDateHijri"
                    disabled
                  />
                </b-col>

                <!-- seasonEndDate  -->
                <b-col md="3">
                  <VueDatePicker
                    label="seasonEndDateAd"
                    v-model="_roomPrice.seasonEndDate"
                  />
                </b-col>

                <!-- seasonEndDateHijri  -->
                <b-col md="3">
                  <gfield
                    label-text="seasonEndDateHijri"
                    id="seasonEndDateHijri"
                    name="seasonEndDateHijri"
                    v-model="_roomPrice.seasonEndDateHijri"
                    disabled
                  />
                </b-col>

                <!-- unitType -->
                <b-col md="3">
                  <gfield
                    id="unitType"
                    ref="unitType"
                    v-model="_roomPrice.unitType"
                    name="unitType"
                    label-text="unitType"
                  />
                </b-col>

                <!-- dailyPrice -->
                <b-col md="3">
                  <gfield
                    id="dailyPrice"
                    name="dailyPrice"
                    v-model="_roomPrice.dailyPrice"
                    label-text="dailyPrice"
                    rules="numeric"
                  />
                </b-col>

                <!-- weeklyPrice -->
                <b-col md="3">
                  <gfield
                    id="weeklyPrice"
                    name="weeklyPrice"
                    v-model="_roomPrice.weeklyPrice"
                    label-text="weeklyPrice"
                    rules="numeric"
                  />
                </b-col>

                <!-- monthlyPrice -->
                <b-col md="3">
                  <gfield
                    id="monthlyPrice"
                    name="monthlyPrice"
                    v-model="_roomPrice.monthlyPrice"
                    label-text="monthlyPrice"
                    rules="numeric"
                  />
                </b-col>
                <b-col cols="12">
                    <b-button
                      v-if="_helper.operationsVisibility.showReset"
                      variant="secondary"
                      class="mt-2"
                      @click="reset()"
                    >
                      <vue-feather
                        type="rotate-ccw"
                        size="12"
                        class="mx-1"
                      />
                      {{ $t('reset') }}
                    </b-button>

                    <b-button
                      v-if="_helper.operationsVisibility.showEdit"
                      variant="secondary"
                      class="mt-2"
                      @click="updateRoomPrice()"
                    >
                      <vue-feather
                        type="edit-3"
                        size="12"
                        class="mx-1"
                      />
                      {{ $t('saveUpdatesOnRoomPrice') }}
                    </b-button>

                    <b-button
                      v-if="_helper.operationsVisibility.showAdd"
                      variant="secondary"
                      class="mt-2"
                      @click="addRoomPriceToList()"
                    >
                      <vue-feather
                        type="plus-circle"
                        size="14"
                        class="mx-1"
                      />
                      {{ $t('addToRoomPriceList') }}
                    </b-button>
                  </b-col>
              </b-row>  
              <b-row class="mb-4">         
                  <b-col>
                    <b-table
                      ref="roomPrice-table"
                      :items="Array.from(_RoomPriceList)"
                      :fields="roomPriceColumns"
                      perPage="25"
                      currentpage="1"
                      small
                      show-empty
                      hover
                      responsive
                      stickyColumn
                      :empty-text="$t('noCompaninonsAdded')"
                    >
                      <template #head(actions)>
                        <span></span>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-nowrap">
                          <b-button
                            v-b-tooltip.hover.top="$t('previewRoomPrice')"
                            variant="outline-primary"
                            class="me-2"
                            size="sm"
                            @click="preview(item)"
                          >
                            <vue-feather
                              type="eye"
                              size="12"
                            />
                          </b-button>

                          <b-button
                            v-b-tooltip.hover.top="$t('editRoomPrice')"
                            variant="outline-secondary"
                            class="me-2"
                            size="sm"
                            @click="edit(item)"
                          >
                            <vue-feather
                              type="edit-3"
                              size="12"
                            />
                          </b-button>

                          <b-button
                            v-b-tooltip.hover.top="$t('removeFromRoomPriceList')"
                            variant="outline-danger"
                            size="sm"
                            @click="removeFromList(item)"
                          >
                            <vue-feather
                              type="x"
                              size="12"
                            />
                          </b-button>
                        </div>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
                </b-tab>
              </b-tabs>
              <!-- save button -->
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
import VueDatePicker from "@/components/form/inputs/VDatePicker.vue";
import 
{ 
  isStringOnly,
  isNumericOnly
} from '@/mixin/publicMethods';
import saveAs from 'file-saver';
export default {
  // components
  components: {
    VueDatePicker,
  },
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
      selectedItem: {
        isRoomClean: true,
        seasonPriceEnglishName: '',
        roomPrices: []
      },
      _roomPrice: {},
      _RoomPriceList: [],
      lookup: {
        buildings: [],
        floors: [],
        kitchens: [],
        lounges: [],
        roomTypes: [],
        roomStatuses: [],
      },
      helper: {
        showKitchens: false,
        showLounges: false,
        showLandlineConversion: false,
      },
      _helper: {
        operationsVisibility: {
          showEdit: false,
          showAdd: true,
          showReset: false,
        },
        roomPriceValidator: {
          showForName: 
          {
            required: false,
            arabicOrEnglishOnly: false,
            unique: false
          },
          showForDailyPrice: 
          {
            required: false,
            numericOnly: false
          },
          showForWeeklyPrice: 
          {
            required: false,
            numericOnly: false
          },
          showForMonthyPrice: 
          {
            required: false,
            numericOnly: false
          },
        }
      },
      id: 0,
    };
  },
  watch: {
    'selectedItem.seasonStartDate'(startAdDate) {
      this._roomPrice.seasonStartDateHijri = this.adDateToHijriDate(startAdDate)
    },

    'selectedItem.seasonEndDate'(EndAdDate) {
      this._roomPrice.seasonEndDateHijri = this.adDateToHijriDate(EndAdDate)
    }
  },
  computed: {
    roomStatusOptions() {
      return [
        { text: this.$t('clean'), value: true },
        { text: this.$t('notClean'), value: false },
      ];
    },
    roomPriceColumns() {
      return [
        {
          key: 'serialNo',
          label: this.$t('serial'),
        },
        {
          key: 'seasonPriceArabicName',
          label: this.$t('seasonPriceArabicName'),
        },
        {
          key: 'seasonPriceEnglishName',
          label: this.$t('seasonPriceEnglishName'),
        },
        {
          key: 'seasonStartDate',
          label: this.$t('seasonStartDate'),
        },
        {
          key: 'seasonStartDateHijri',
          label: this.$t('seasonStartDateHijri'),
        },
        {
          key: 'seasonEndDate',
          label: this.$t('seasonEndDate'),
        },
        {
          key: 'seasonEndDateHijri',
          label: this.$t('seasonEndDateHijri'),
        },
        {
          key: 'unitType',
          label: this.$t('unitType'),
        },
        {
          key: 'dailyPrice',
          label: this.$t('dailyPrice'),
        },
        {
          key: 'weeklyPrice',
          label: this.$t('weeklyPrice'),
        },
        {
          key: 'monthlyPrice',
          label: this.$t('monthlyPrice'),
        },
        {
          key: 'actions'
        }
      ];
    },
  },
  // mounted section
  mounted() {
    this.id = this.$route.params.id;
    this.getLookups();
    if (this.id > 0) {
      this.getSelectedItem();
    }
    this._roomPrice.seasonStartDate = this.getDate();
    this._roomPrice.seasonStartDateHijri = this.adDateToHijriDate();
    this._roomPrice.seasonEndDate = this.getDate();
    this._roomPrice.seasonEndDateHijri = this.adDateToHijriDate();
  },

  // methods section
  methods: {
    isRoomPriceUnique() {
      return !this._RoomPriceList.find((x) => x.seasonPriceArabicName === this._roomPrice.seasonPriceArabicName.trim() && x.serialNo !== this._roomPrice.serialNo)
    },

    isValidRoomPrice() {
      let isValid = true
      // for roomPrice name
      if (!this._roomPrice.seasonPriceArabicName) {
        this._helper.roomPriceValidator.showForName.required = true;
        isValid = false
      }

      else if (!this.isRoomPriceUnique()) {
        this._helper.roomPriceValidator.showForName.unique = true;
        isValid = false
      }

      // for roomPrice daily
      if (!this._roomPrice.dailyPrice) {
        this._helper.roomPriceValidator.showForDailyPrice.required = true;
        isValid = false
      }

      // for roomPrice weekly
      if (!this._roomPrice.weeklyPrice) {
        this._helper.roomPriceValidator.showForWeeklyPrice.required = true;
        isValid = false
      }
      
      // for roomPrice monthy
      if (!this._roomPrice.monthlyPrice) {
        this._helper.roomPriceValidator.showForMonthyPrice.required = true;
        isValid = false
      }
      return isValid
    },
    addRoomPriceToList() {
     if(!this.isValidRoomPrice()) {
       return;
     }
      this.selectedItem.roomPrices.push(this._roomPrice);
      this._RoomPriceList.push({
        serialNo: this._RoomPriceList.length + 1,
        seasonPriceArabicName: this._roomPrice.seasonPriceArabicName,
        seasonPriceEnglishName: this._roomPrice.seasonPriceEnglishName ? this._roomPrice.seasonPriceEnglishName :this._roomPrice.seasonPriceArabicName,
        seasonStartDate: this.getDate(this._roomPrice.seasonStartDate),
        seasonStartDateHijri: this._roomPrice.seasonStartDateHijri,
        seasonEndDate: this.getDate(this._roomPrice.seasonEndDate),
        seasonEndDateHijri: this._roomPrice.seasonEndDateHijri,
        unitType: this._roomPrice.unitType,
        dailyPrice: this._roomPrice.dailyPrice,
        weeklyPrice: this._roomPrice.weeklyPrice,
        monthlyPrice: this._roomPrice.monthlyPrice,
      });

      this.reset();
    },
    updateRoomPrice() {
      if (!this.isValidRoomPrice()) return;
      const elementIndex = this.selectedItem.roomPrices.findIndex(x => x.seasonPriceArabicName === this._roomPrice.seasonPriceArabicName);
      if (elementIndex !== -1) {
        this._RoomPriceList[elementIndex] = {
        serialNo: this._RoomPriceList.length + 1,
        seasonPriceArabicName: this._roomPrice.seasonPriceArabicName,
        seasonPriceEnglishName: this._roomPrice.seasonPriceEnglishName,
        seasonStartDate: this.getDate(this._roomPrice.seasonStartDate),
        seasonStartDateHijri: this._roomPrice.seasonStartDateHijri,
        seasonEndDate: this.getDate(this._roomPrice.seasonEndDate),
        seasonEndDateHijri: this._roomPrice.seasonEndDateHijri,
        unitType: this._roomPrice.unitType,
        dailyPrice: this._roomPrice.dailyPrice,
        weeklyPrice: this._roomPrice.weeklyPrice,
        monthlyPrice: this._roomPrice.monthlyPrice,
        }
      }

      this.reset();
    },
    reset() {
      this._roomPrice = {}
      this._helper = {
        operationsVisibility: {
          showEdit: false,
          showAdd: true,
          showReset: false
        },
        roomPriceValidator: {
          showForName: {
            required: false,
            arabicOrEnglishOnly: false,
            unique: false
          },
          showForRelativeRelation: {
            required: false,
            arabicOrEnglishOnly: false
          },
          showForBirthDateAd: false,
          showForGender: false,
          showForIdentityContent: {
            required: false,
            numericOnly: false
          }
        }    
      }
      this._roomPrice.seasonStartDate = this.getDate();
      this._roomPrice.seasonStartDateHijri = this.adDateToHijriDate();
      this._roomPrice.seasonEndDate = this.getDate();
      this._roomPrice.seasonEndDateHijri = this.adDateToHijriDate();
    },
    maintianSerials() {
      for (let index = 0; index < this._RoomPriceList.length; index++) {
        this._RoomPriceList[index].serialNo = index+1;    
      }
    },
    preview(item) {
      this._roomPrice = this.selectedItem.roomPrices.find(x => x.seasonPriceArabicName === item.seasonPriceArabicName);
      this._helper.operationsVisibility = {
        showEdit: false,
        showAdd: false,
        showReset: true
      }
    },
    edit(item) {
      this._roomPrice = this.selectedItem.roomPrices.find(x => x.seasonPriceArabicName === item.seasonPriceArabicName);
      this._roomPrice.serialNo = item.serialNo;
      this._helper.operationsVisibility = {
        showEdit: true,
        showAdd: false,
        showReset: false
      }
    },
    removeFromList(item) {
      const elementIndex = this.selectedItem.roomPrices.findIndex(x => x.seasonPriceArabicName === item.seasonPriceArabicName);
      if(elementIndex !== -1) {
        this.selectedItem.roomPrices.splice(elementIndex, 1)
        this._RoomPriceList.splice(elementIndex, 1)
      }

      this.reset();
      this.maintianSerials();
    },
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
        this.selectedItem.seasonPriceEnglishName = this.selectedItem.seasonPriceArabicName;
        this.create({
          url: 'Rooms',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },

    getLookups() {
      this.get({ url: 'Aggregates/RoomsRelatedData' }).then((data) => {
        this.lookup = data;
      });
    },

    getSelectedItem() {
      this.get({ url: 'Rooms', id: this.id }).then((data) => {
        this.selectedItem = data;
        this.selectedItem.roomPrices.forEach(element => { 
          this._RoomPriceList.push({
            serialNo: element.lineSerial,
            seasonPriceArabicName: element.seasonPriceArabicName,
            seasonPriceEnglishName: element.seasonPriceEnglishName,
            seasonStartDate: this.getDate(element.seasonStartDate),
            seasonStartDateHijri: element.seasonStartDateHijri,
            seasonEndDate: this.getDate(element.seasonEndDate),
            seasonEndDateHijri: element.seasonEndDateHijri,
            unitType: element.unitType,
            dailyPrice: element.dailyPrice,
            weeklyPrice: element.weeklyPrice,
            monthlyPrice: element.monthlyPrice,
          })
        })
        // then maintain visibility
        this.helper = {
          showKitchens: data.isContainKitchen,
          showLounges: data.isContainLounge,
          showLandlineConversion: data.isContainLandline,
        };
      });
    },

    backToList() {
      this.$router.push({ name: 'rooms' });
    },

    kitchenChanged() {
      this.helper.showKitchens = !this.helper.showKitchens;
      this.selectedItem.kitchenId = null;
    },

    loungeChanged() {
      this.helper.showLounges = !this.helper.showLounges;
      this.selectedItem.loungeId = null;
    },

    landlineChanged() {
      this.helper.showLandlineConversion = !this.helper.showLandlineConversion;
      this.selectedItem.landlineConversion = null;
    },
  },
};
</script>
<style>
.room-data .nav-link.active {
  color: #fff !important;
  background-color: #fe9f43;
}

.room-data .nav-item .nav-link {
  color: #fe9f43;
  font-weight: bold;
  border: 1px solid #fe9f43;
  margin: 3px;
}

.v3dp__popout[data-v-2e128338] {
  z-index: 1000;
}
</style>
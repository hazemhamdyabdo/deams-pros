<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform class="guest-data">
              <b-tabs content-class="pt-2" pills fill>
                <b-tab :title="$t('mainData')">
                  <b-row>
                    <!-- v-if="_selectedItem.id > 0" -->
                    <b-col md="3">
                      <gfield
                        label-text="code"
                        name="code"
                        v-model="_selectedItem.code"
                        :disabled="_selectedItem.id"
                      />
                    </b-col>
                    <b-col md="3" v-if="_selectedItem.id > 0">
                      <gfield
                        label-text="bookingNumber"
                        name="bookingNumber"
                        v-model="_selectedItem.bookingNumber"
                        :disabled="_selectedItem.id"
                      />
                    </b-col>
                    <b-col md="3">
                      <VueDatePicker
                        label="bookingDate"
                        v-model="_selectedItem.bookingDate"
                      />
                    </b-col>
                    <!-- guests -->
                    <b-col md="3">
                      <gfield
                        label-text="guest"
                        name="guestId"
                        label="arabicName"
                        id="guestId"
                        v-model="_selectedItem.guestId"
                        field="select"
                        rules="required"
                        :options="lookup.guests"
                        :dir="'rtl'"
                      />
                    </b-col>
                    <b-col md="3">
                      <v-radio-group
                        :label="$t('bookingType')"
                        v-model="_selectedItem.bookingTypeId"
                        inline
                        style="font-weight: 600"
                      >
                        <v-radio
                          :label="bookingType[0].arabicName"
                          :value="bookingType[0].id"
                        ></v-radio>
                        <v-radio
                          :label="bookingType[1].arabicName"
                          :value="bookingType[1].id"
                        ></v-radio>
                      </v-radio-group>
                    </b-col>
                    <b-col md="3">
                      <v-radio-group
                        :label="$t('bookingStatus')"
                        inline
                        style="font-weight: 600"
                        v-model="_selectedItem.bookingStatus"
                      >
                        <v-radio
                          :label="$t('Confirmed')"
                          :value="true"
                        ></v-radio>
                        <v-radio
                          :label="$t('NotConfirmed')"
                          :value="false"
                        ></v-radio>
                      </v-radio-group>
                    </b-col>
                    <b-col md="3">
                      <VueDatePicker
                        label="dateOfEntry"
                        v-model="_selectedItem.dateOfEntry"
                        :min="_selectedItem.bookingDate"
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        v-model="_selectedItem.hijriDateOfEntry"
                        label-text="hijriDateOfEntry"
                        id="hijriDateOfEntry"
                        name="hijriDateOfEntry"
                        disabled
                      />
                    </b-col>
                    <b-col md="3">
                      <VueDatePicker
                        label="exitDate"
                        v-model="_selectedItem.exitDate"
                        :min="_selectedItem.dateOfEntry"
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        v-model="_selectedItem.hijriExitDate"
                        label-text="hijriExitDate"
                        id="hijriExitDate"
                        name="hijriExitDate"
                        disabled
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        label-text="durationInNights"
                        name="durationInNights"
                        v-model="durationInNights"
                        disabled
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        label-text="sources"
                        name="sources"
                        label="arabicName"
                        :options="lookup.sources"
                        :dir="'rtl'"
                        id="sources"
                        rules="required"
                        v-model="_selectedItem.sourceId"
                        field="select"
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        label-text="rentType"
                        id="rentType"
                        label="arabicName"
                        rules="required"
                        :options="lookup.rentTypes"
                        name="rentType"
                        v-model="_selectedItem.rentTypeId"
                        field="select"
                        :dir="'rtl'"
                      />
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab :title="$t('roomData')">
                  <b-row>
                    <b-col md="3">
                      <gfield
                        label="roomType"
                        :dir="'rtl'"
                        field="select"
                        v-model="_selectedItem.roomId"
                        :options="lookup.rooms"
                        label-text="roomType"
                        id="roomType"
                        name="roomType"
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        v-model="selectedRoom.roomNumber"
                        label-text="roomNumber"
                        id="roomNumber"
                        name="roomNumber"
                        disabled
                      />
                    </b-col>
                    <b-col md="3">
                      <gfield
                        ref="floor"
                        v-model="selectedRoom.floorName"
                        label-text="floor"
                        disabled
                      />
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    v-permission="$route.meta.permission"
                    class="mx-2"
                    type="submit"
                    variant="primary"
                    data-action-type="save"
                    @click="save"
                  >
                    {{ $t("save") }}
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
import { bookingType } from "@/libs/acl/Lookups";

export default {
  components: {
    VueDatePicker,
  },
  props: {
    id: {
      type: Number,
    },
  },
  data: () => ({
    title: "editAccommodation",
    description: "editAccommodationDescription",
    _selectedItem: {
      exitDate: new Date(),
      dateOfEntry: new Date(),
    },
    bookingType,
    lookup: {},
    selectedRoom: [],
  }),
  computed: {
    durationInNights() {
      return Math.ceil(
        (new Date(this._selectedItem.exitDate) -
          new Date(this._selectedItem.dateOfEntry)) /
          24 /
          60 /
          60 /
          1000
      );
    },
  },
  watch: {
    "_selectedItem.dateOfEntry": {
      immediate: true,
      handler(adDate) {
        this._selectedItem.hijriDateOfEntry = this.adDateToHijriDate(adDate);
      },
    },
    "_selectedItem.exitDate": {
      immediate: true,
      handler(adDate) {
        this._selectedItem.hijriExitDate = this.adDateToHijriDate(adDate);
      },
    },
    "_selectedItem.roomId": {
      handler(val) {
        this.get({ url: "Rooms" }).then((data) => {
          this.selectedRoom = data?.find((room) => room.id == val);
        });
      },
    },
    id: {
      immediate: true,
      handler() {
        this.getSelected();
      },
    },
  },
  methods: {
    async save() {
      await this.create({
        url: "Accommodations",
        data: {
          ...this._selectedItem,
          durationInNights: this.durationInNights.toString(),
        },
      });
      this.doneAlert({ text: this.$t("updatedSuccessfully") });
      this.backToList();
    },
    async getSelected() {
      console.log(this.$route.params.id);
      const res = await this.get({
        url: "Accommodations",
        id: this.$route.params.id,
      });
      this._selectedItem = res;
    },
    backToList() {
      this.$router.push({ name: "Accommodations" });
    },
    adDateToHijriDate(adDate = new Date()) {
      return new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
        day: "numeric",
        month: "long",
        weekday: "long",
        year: "numeric",
      }).format(new Date(adDate));
    },
    async getLookups() {
      const guests = await this.get({ url: "Guests" });
      this.lookup.guests = guests;

      const sources = await this.get({ url: "Sources" });
      this.lookup.sources = sources;

      const rentTypes = await this.get({ url: "RentTypes" });
      this.lookup.rentTypes = rentTypes;

      const rooms = await this.get({ url: "Rooms" });
      this.lookup.rooms = rooms;
    },
  },
  created() {
    this.getLookups();
  },
};
</script>
<style>
.card-body .nav-link.active {
  color: #fff !important;
  background-color: #fe9f43;
}

.card-body .nav-item .nav-link {
  color: #fe9f43;
  font-weight: bold;
  margin: 3px;
}
</style>

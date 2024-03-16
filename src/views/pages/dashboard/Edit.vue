<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="dashboard content">
        <b-row>
          <!-- dashboard header -->
          <pageheader 
            :title=$t(title) 
            :title1=$t(title1) 
          />      

          <!-- right side section  -->
          <b-col
            xl="7"
            md="12"
          >
            <b-card>
              <b-row>
                <!-- operations related data -->
                <b-col
                  xl="7"
                  md="12"
                >
                  <!-- booking and accommodation  -->
                  <label 
                    class="section-title mb-3"
                    > 
                      <vue-feather
                        type="cloud"
                        size="13"
                        class="mx-1"
                      ></vue-feather>
                    {{ $t("bookingAndAccommodation") }} 
                  </label>
                  <a
                    v-b-tooltip.hover.top="$t('newReservation')"
                    style="border-radius: 50%; background-color: #fe9f43; margin-right: 10px;"
                  >
                    <vue-feather
                        type="plus"
                        size="10"
                        class="mx-2"
                      ></vue-feather>
                  </a>

                  <div class="d-flex flex-wrap mb-4">
                    <div class="dash-widget me-2">
                      <div class="dash-widgetimg">
                        <span
                          style="background: transparent"
                        ><img src="@/assets/img/icons/ticket-purchase.svg" alt="img"/></span>
                      </div>
                      <div class="dash-widgetcontent">
                        <h5>
                          <vue3-autocounter
                            class="counter"
                            ref="counter"
                            :startAmount="0"
                            :delay="0"
                            :endAmount="14"
                            :duration="1"
                            :autoinit="true"
                          />
                        </h5>
                        <h6>{{ $t("approved") }}</h6>
                      </div>
                    </div>
                    <div class="dash-widget">
                      <div class="dash-widgetimg">
                        <span
                          style="background: transparent"
                        ><img src="@/assets/img/icons/waiting-room.svg" alt="img" /></span>
                      </div>
                      <div class="dash-widgetcontent">
                        <h5>
                          <vue3-autocounter
                            class="counter"
                            ref="counter"
                            :startAmount="0"
                            :delay="0"
                            :endAmount="5"
                            :duration="1"
                            :autoinit="true"
                          />
                        </h5>
                        <h6>{{ $t("notApproved") }}</h6>
                      </div>
                    </div>
                  </div>

                  <!-- room Service  -->
                  <div class="mb-4">
                    <label 
                      class="section-title mb-3"
                      > 
                        <vue-feather
                          type="hard-drive"
                          size="13"
                          class="mx-1"
                        ></vue-feather>
                      {{ $t("roomService") }} 
                    </label>
                    
                    <div class="d-flex flex-wrap">     
                      <div class="dash-count me-2" style="max-width: 150px; background: rgba(72, 61, 139, 0.7);">
                        <div class="dash-counts">
                          <h4>14</h4>
                          <h5> {{ $t('rented') }} </h5>
                        </div>
                        <div class="dash-imgs">
                          <span
                            style="background: transparent"
                          ><img src="@/assets/img/icons/door-close.svg" alt="img" /></span>
                        </div>
                      </div>

                      <div class="dash-count me-2" style="max-width: 150px; background: rgba(107, 142, 35, 0.7)">
                        <div class="dash-counts">
                          <h4>12</h4>
                          <h5> {{ $t('empty') }} </h5>
                        </div>
                        <div class="dash-imgs">
                          <span
                            style="background: transparent"
                          ><img src="@/assets/img/icons/door-open.svg" alt="img" /></span>
                        </div>
                      </div>

                      <div class="dash-count" style="max-width: 150px; background: rgba(205, 92, 92, 0.7);">
                        <div class="dash-counts">
                          <h4>19</h4>
                          <h5> {{ $t('suspended') }} </h5>
                        </div>
                        <div class="dash-imgs">
                          <span
                            style="background: transparent"
                          ><img src="@/assets/img/icons/door-hanger.svg" alt="img" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>

                <!-- financial related data -->
                <b-col
                  xl="5"
                  md=12
                >
                  <label 
                    class="section-title mb-3"
                    > 
                    <vue-feather
                      type="dollar-sign"
                      size="13"
                      class="mx-1"
                    />
                    {{ $t("profitAndLoss") }} 
                  </label>
                  <vue-feather
                      :type="this.dashboard.net >= 0 ? 'trending-up' : 'trending-down'"
                      size="20"
                      :stroke="this.dashboard.net >= 0 ? 'green' : 'red'"
                      class="mx-3"
                    />
                  <div class="dash-widget">
                    <div class="dash-widgetimg">
                      <span
                        style="background: rgba(0, 207, 232, 0.12);"
                      ><img src="@/assets/img/icons/income.svg" alt="img" /></span>
                    </div>
                    <div class="dash-widgetcontent">
                      <h5>
                        <vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="0"
                          :delay="0"
                          :endAmount="85200.0"
                          :duration="1"
                          :autoinit="true"
                        />
                      </h5>
                      <h6>{{ $t("income") }}</h6>
                    </div>
                  </div>
                  <div class="dash-widget">
                    <div class="dash-widgetimg">
                      <span
                        style="background: rgba(234, 84, 85, 0.12);"
                      ><img src="@/assets/img/icons/outgoing.svg" alt="img" /></span>
                    </div>
                    <div class="dash-widgetcontent">
                      <h5>
                        <vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="0"
                          :delay="0"
                          :endAmount="35400.0"
                          :duration="1"
                          :autoinit="true"
                        />
                      </h5>
                      <h6>{{ $t("expense") }}</h6>
                    </div>
                  </div>
                  <div class="dash-widget">
                    <div class="dash-widgetimg">
                      <span
                      style="background: rgba(40, 199, 111, 0.12);"
                      ><img src="@/assets/img/icons/money.svg" alt="img" /></span>
                    </div>
                    <div class="dash-widgetcontent">
                      <h5>
                        <vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="0"
                          :delay="0"
                          :endAmount="49800.0"
                          :duration="1"
                          :autoinit="true"
                        />
                      </h5>
                      <h6>{{ $t("net") }}</h6>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col>
                  <!-- today reservations  -->
                  <div>
                    <label 
                      class="section-title mb-3"
                      > 
                        <vue-feather
                          type="calendar"
                          size="13"
                          class="mx-1"
                        ></vue-feather>
                      {{ $t("todayReservations") }} 
                    </label>
                    <div class="d-flex justify-content-center">
                      <b-button-group
                      >
                        <b-button
                          variant="outline-secondary"
                          :class="{ 'active-reservation': this.selectedReservationType === this.todayReservation_enum.all}"
                          @click="reservationFilterChanged(this.todayReservation_enum.all)"
                        >
                        {{ $t("all") }}
                        </b-button>
                        <b-button
                          variant="outline-secondary"
                          :class="{ 'active-reservation': this.selectedReservationType === this.todayReservation_enum.arrivness}"
                          @click="reservationFilterChanged(this.todayReservation_enum.arrivness)"
                        >
                        {{ $t("arrivness") }}
                        </b-button>
                        <b-button
                          variant="outline-secondary"
                          :class="{ 'active-reservation': this.selectedReservationType === this.todayReservation_enum.departure}"
                          @click="reservationFilterChanged(this.todayReservation_enum.departure)"
                        >
                        {{ $t("departure") }}
                        </b-button>
                        <b-button
                          variant="outline-secondary"
                          :class="{ 'active-reservation': this.selectedReservationType === this.todayReservation_enum.booked}"
                          @click="reservationFilterChanged(this.todayReservation_enum.booked)"
                        >
                        {{ $t("booked") }}
                        </b-button>
                      </b-button-group>
                    </div>               
                  </div>

                  <div class="mt-4 mb-4">
                    <g-table
                      ref="todayReservation-table"
                      :items="filteredItems"
                      :columns="tableColumns"
                      :is-busy="isTableBusy"
                      :noAction="true"
                      :totalRows="totalRows"
                      @filtered="onFiltered"
                      :createButton="{ visiable: false }"
                      :searchInput="{ visiable: true }"
                      :perPageOptions="[5, 10]"
                    >
                    </g-table>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>

          <!-- left side section -->
          <b-col
            xl="5"
            md="12"
          >
            <!-- pie char for dialy work ratio-->
            <b-row>
              <b-col>
                <b-card>
                  <label 
                  class="section-title mb-3"
                  > 
                  <vue-feather
                    type="pie-chart"
                    size="13"
                    class="mx-1"
                  ></vue-feather>
                  {{ $t("dialyWorkRatio") }} 
                </label>
                <apexchart
                  type="pie"
                  height="230"
                  :options="dialyWorkRatio.chartOptions"
                  :series="dialyWorkRatio.series"
                ></apexchart>
                </b-card>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-card>
                  <label 
                    class="section-title mt-3"
                    > 
                    <vue-feather
                      type="coffee"
                      size="13"
                      class="mx-1"
                    ></vue-feather>
                    {{ $t("roomsWeeklyStatus") }} 
                  </label>
                  <apexchart
                    type="bar"
                    height="320"
                    :options="roomsWeeklyStatus.chartOptions"
                    :series="roomsWeeklyStatus.series"
                ></apexchart>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import GTable from '@/views/pages/Shared/Table.vue';

export default {
  components: {
    GTable,
  },

  data() {
    return {
      title: 'databoard',
      title1: 'databoardBreif',
      items: [],
      filteredItems: [],
      dashboard: {
        notApproved: 14,
        approved: 5,
        rented: 19,
        empty: 12,
        suspended: 14,
        income: 85200.00,
        expense: 35400.00,
        net: 49800.00
      },
      totalRows: 0,
      isTableBusy: false,
      selectedReservationType: null,
      todayReservation_enum: {
        all: 0,
        arrivness: 1,
        departure: 2,
        booked: 3
      },
      reservationStatus_enum: {
        approved: 1,
        notApproved: 2,
        reported: 3,
        hosted: 4
      },

      dialyWorkRatio: {
        series: [19, 12, 14],
        chartOptions: {
          chart: {
            type: 'pie',
            height: 250,
          },
          labels: [this.$t("rented"), this.$t("empty"), this.$t("suspended")],
        },
      },
      roomsWeeklyStatus : {
        chartOptions : {
          chart: {
              height: 350,
              type: 'bar',
              stacked: true,
              lineWidth: 1,
              gridTextSize: 11,
              hideHover: 'auto',
              resize: true
          },
          yaxis: {
            tickAmount: 6,
            labels: {
              show: true,
              minWidth: 0,
              maxWidth: 160,
              style: {
                fontSize: '14px',
                fontFamily: 'Tajawal'
              },
              offsetX: -20,
              offsetY: 0,
              rotate: 0,
            },
          },
          xaxis: {
            type: 'category',
            tickPlacement: 'between',
            position: 'bottom',
            labels: {
              rotate: -30,
              minHeight: 0,
              maxHeight: 60,
              style: {
                fontSize: '14px',
                fontFamily: 'Tajawal',
              },
            },
          },
          legend: {
            show: true,
            position: 'right',
          },
          labels: [this.$t("saturday"), this.$t("sunday"), this.$t("monday"), this.$t("tuesday"), this.$t("wednesday"), this.$t("thursday"), this.$t("friday")],
          colors: ['#664dc9', '#44c4fa'],
          tooltip: {
            y: {
              formatter: (val) => {
                return `${val} ${this.$t("room")}`;
              },
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Tajawal'
              },
          },
        },
        series: 
        [
          { name: this.$t("rented"), data: [12, 18, 15, 25, 30, 18, 12] }, 
          { name: this.$t("empty"), data: [18, 22, 18, 28, 35, 28, 18] }
        ],
      }
    }
  },

  watch: {
    selectedReservationType() { this.filterGridItems() }
  },

  computed: {
    tableColumns() {
      return [
        { key: "reservationNumber", label: this.$t("reservationNumber")},
        { key: "reservationStatus", label: this.$t("reservationStatus")},
        { key: "unitNumber", label: this.$t("unitNumber")},
        { key: "unitType", label: this.$t("unitType")},
        { key: "guestName", label: this.$t("guestName")},
        { key: "mobileNumber", label: this.$t("mobileNumber")},
      ];
    },
  },

  mounted() {
    // get Data
    this.items= [{
      reservationNumber: '1231',
      reservationStatus: 'مؤكد',
      reservationStatusId: 1,
      unitNumber: 'G1',
      unitType: 'غرفة وصالة',
      guestName: 'محمود',
      mobileNumber: '0107634256'
    },
    {
      reservationNumber: '1232',
      reservationStatus: 'غير مؤكد',
      reservationStatusId: 2,
      unitNumber: 'G2',
      unitType: 'غرفة وحمام',
      guestName: 'مصطفي',
      mobileNumber: '0118375875'
    },
    {
      reservationNumber: '1233',
      reservationStatus: 'تم الإبلاغ',
      reservationStatusId: 3,
      unitNumber: 'G3',
      unitType: 'غرفة وصالة',
      guestName: 'محمد',
      mobileNumber: '0122384783'
    },
    {
      reservationNumber: '1234',
      reservationStatus: 'غير مؤكد',
      reservationStatusId: 2,
      unitNumber: 'G4',
      unitType: 'غرفة مزدوجة',
      guestName: 'أحمد',
      mobileNumber: '0102331342'
    },
    {
      reservationNumber: '1235',
      reservationStatus: 'ساكن',
      reservationStatusId: 4,
      unitNumber: 'G5',
      unitType: 'غرفة مزدوجة',
      guestName: 'علي',
      mobileNumber: '0158347583'
    },
    {
      reservationNumber: '1236',
      reservationStatus: 'مؤكد',
      reservationStatusId: 1,
      unitNumber: 'G6',
      unitType: 'غرفة وصالة',
      guestName: 'ياسين',
      mobileNumber: '0123214332'
    },
    {
      reservationNumber: '1237',
      reservationStatus: 'ساكن',
      reservationStatusId: 4,
      unitNumber: 'G7',
      unitType: 'غرفة وحمام',
      guestName: 'خالد',
      mobileNumber: '0102324231'
    }];

    // set default values
    this.selectedReservationType = this.todayReservation_enum.all;
  },

  methods: {
    reservationFilterChanged(typeValue) {
      this.selectedReservationType = typeValue;
    },

    filterGridItems() {
      switch (this.selectedReservationType) {
        case this.todayReservation_enum.arrivness: 
          this.filteredItems = this.items.filter((i) => i.reservationStatusId === this.reservationStatus_enum.approved 
                                                     || i.reservationStatusId === this.reservationStatus_enum.notApproved );
          break;

        case this.todayReservation_enum.departure: 
          this.filteredItems = this.items.filter((i) => i.reservationStatusId === this.reservationStatus_enum.reported);
          break;

        case this.todayReservation_enum.booked: 
          this.filteredItems = this.items.filter((i) => i.reservationStatusId === this.reservationStatus_enum.hosted);
          break;
        
        default:
          this.filteredItems = this.items;
          break;
      }
    }
  }
}
</script>

<style>
.dashboard .section-title {
  font-size: 18px; 
  border-right: 5px solid #fe9f43;
  padding-right: 10px;
  font-weight: bold;
}

.apexcharts-legend-text {
  font-family: 'Tajawal' !important;
  padding-left: 5px;
  font-size: 16px !important;
}

.apexcharts-pie-label,
.apexcharts-datalabel {
  font-size: 16px;
  font-family: 'Tajawal' !important;
  text-anchor: middle;
  fill: #414926;
}

.dashboard .active-reservation {
  background-color: #6c757d;
  color: #FFF;
}
.dash-widget {
  margin-bottom: 10px !important;
  padding: 5px 10px !important;
}
.dash-count {
  min-height: 73px !important;
  padding: 5px 10px !important;
}
.dash-count .dash-imgs img{
  height: 35px !important;
}
</style>
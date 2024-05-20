<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <!-- header  -->
        <pageheader 
          :title="$t(title)" 
          :title1="$t(description)" 
        />
        <div class="card">
          <div class="card-body">
            <g-table
              ref="seasonUnitesPrices-table"
              :items="items"
              :columns="tableColumns"
              :is-busy="isTableBusy"
              :noAction="true"
              :perPage="perPage"
              :totalRows="totalRows"
              @filtered="onFiltered"
              :createButton="{ visiable: true }"
              :searchInput="{ visiable: true }"
              @on-create="
                (v) => {
                  $router.push({ name: 'addSeasonUnitesPrices' });
                }
              "
            >
              <template #actions="{ item }">
                <div class="text-nowrap">
                  <b-button
                    data-action-type="edit"
                    v-b-tooltip.hover.top="$t('edit')"
                    variant="custom"
                    class="btn-icon"
                    size="sm"
                    @click="edit(item)"
                  >
                    <vue-feather
                      type="edit"
                      size="14"
                      class="mx-1 clickable"
                    ></vue-feather>
                  </b-button>
                  <b-button
                    data-action-type="delete"
                    v-b-tooltip.hover.top="$t('delete')"
                    variant="flat-danger"
                    class="btn-icon"
                    size="sm"
                    @click="remove(item)"
                  >
                    <vue-feather
                      type="trash"
                      stroke="red"
                      size="14"
                      class="mx-1 danger clickable"
                    ></vue-feather>
                  </b-button>
                </div>
              </template>
            </g-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GTable from '../../Shared/Table.vue';

export default {
  components: {
    GTable,
  },
  data() {
    return {
      selectedItem: {},
      totalRows: 0,
      currentPage: 1,
      perPage: 15,
      items: [],
      title: "seasonUnitesPrices",
      description: "previewSeasonUnitesPrices",
    };
  },
  computed: {
    tableColumns() {
      return [
        { key: 'code', label: this.$t('code'), sortable: true },
        { key: 'arabicName', label: this.$t('arabicName'), sortable: true },
        { key: 'seasonStartDate', label: this.$t('seasonStartDate'), sortable: true },
        { key: 'seasonEndDate', label: this.$t('seasonEndDate'), sortable: true },
        { key: 'dailyPrice', label: this.$t('dailyPrice'), sortable: true },
        { key: 'weeklyPrice', label: this.$t('weeklyPrice'), sortable: true },
        { key: 'monthlyPrice', label: this.$t('monthlyPrice'), sortable: true },
        { key: 'seasonStatusName', label: this.$t('status'), sortable: true },
        { key: 'notes', label: this.$t('notes'), sortable: true },
        { key: 'actions' },
      ];
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.get({ url: 'SeasonUnitesPrices' }).then((data) => {
        this.items = data;
        this.items.forEach(item => {
          item.seasonStartDate = this.getDate(item.seasonStartDate);
          item.seasonEndDate = this.getDate(item.seasonEndDate);
          item.seasonStatusName = this.$t(item.seasonActivityStatus)
        });
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    edit(item) {
      this.$router.push({
        name: 'editSeasonUnitesPrices',
        params: { id: item.id },
      });
    },
    remove(item) {
      this.confirmAction(
        {
          text: this.$t('areYouSureYouWantToDelete'),
        },
        () => {
          // then delete
          this.delete({ url: 'SeasonUnitesPrices', id: item.id }).then(() => {
            this.doneAlert({ text: this.$t('deletedSuccessfully') });
            this.getItems();
          });
        }
      );
    },
  }
};
</script>

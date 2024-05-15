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
              ref="collectionVouchers-table"
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
                  $router.push({ name: 'addCollectionVoucher' });
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
                    ></vue-feather>
                  </b-button>
                  <!-- <b-button
                    data-action-type="print"
                    v-b-tooltip.hover.top="$t('print')"
                    variant="flat-success"
                    class="btn-icon"
                    size="sm"
                    @click="print(item)"
                  >
                    <vue-feather
                      type="printer"
                      stroke="green"
                      size="14"
                    ></vue-feather>
                  </b-button> -->
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
      title: "collectionVouchers",
      description: "previewCollectionVouchers",
    };
  },
  computed: {
    tableColumns() {
      return [
        { key: 'code', label: this.$t('code'), sortable: true },
        { key: 'transactionDate', label: this.$t('transactionDate'), sortable: true },
        { key: 'guestNameAr', label: this.$t('guest'), sortable: true },
        { key: 'paymentMethodNameAr', label: this.$t('paymentMethod'), sortable: true },
        { key: 'voucherValue', label: this.$t('voucherValue'), sortable: true },
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
      this.get({ url: 'CollectionVouchers' }).then((data) => {
        this.items = data;
        data.forEach(x => {
          x.transactionDate = this.getDate(x.transactionDate);
        });
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    edit(item) {
      this.$router.push({
        name: 'editCollectionVoucher',
        params: { id: item.id },
      });
    },
    remove(item) {
      this.confirmAction(
        {
          text: this.$t('areYouSureYouWantToDelete'),
        },
        () => {
          this.delete({ url: 'CollectionVouchers', id: item.id }).then(() => {
            this.doneAlert({ text: this.$t('deletedSuccessfully') });
            this.getItems();
          });
        }
      );
    },
    print(item) {
      const printedItem = { id: item.id };
      const reportName = 'CollectionVoucherById-ar'
      this.printReport(reportName, printedItem);
    }
  }
};
</script>

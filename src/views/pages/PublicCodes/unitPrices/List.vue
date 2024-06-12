<template>
    <div class="main-wrapper">
      <div class="page-wrapper">
        <div class="content">
          <!-- header  -->
          <pageheader 
          />
          <div class="card">
            <div class="card-body">
              <g-table
                ref="unitesPrices-table"
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
                    $router.push({ name: 'addUnitesPrices' });
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
      };
    },
    computed: {
      tableColumns() {
        return [
          { key: 'code', label: this.$t('code'), sortable: true },
          { key: 'unitType', label: this.$t('unitType'), sortable: true },
          { key: 'dailyPrice', label: this.$t('dailyPrice'), sortable: true },
          { key: 'weeklyPrice', label: this.$t('weeklyPrice'), sortable: true },
          { key: 'monthlyPrice', label: this.$t('monthlyPrice'), sortable: true },
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
        this.get({ url: 'UnitPrices' }).then((data) => {
          this.items = data;
        });
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      edit(item) {
        this.$router.push({
          name: 'editUnitesPrices',
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
            this.delete({ url: 'UnitPrices', id: item.id }).then(() => {
              this.doneAlert({ text: this.$t('deletedSuccessfully') });
              this.getItems();
            });
          }
        );
      },
    }
  };
  </script>
  
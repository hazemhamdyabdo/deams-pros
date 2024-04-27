<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <!-- header  -->
        <pageheader 
          :title="$t(title)" 
          :title1="$t(description)" 
        />
        
        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <g-table
              ref="paymentMethod-table"
              :items="items"
              :columns="tableColumns"
              :is-busy="isTableBusy"
              :noAction="true"
              perPage="25"
              :totalRows="totalRows"
              @filtered="onFiltered"
              :createButton="{ visiable: true }"
              :searchInput="{ visiable: true }"
              @on-create="
                (v) => {
                  $router.push({ name: 'addPaymentmethod' });
                }
              "
            >
              <template #actions="{ item }">
                <div class="text-nowrap">
                  <b-button
                    data-action-type="preview"
                    v-b-tooltip.hover.top="$t('preview')"
                    variant="custom"
                    class="btn-icon"
                    size="sm"
                    @click="editPaymentMethod(item)"
                  >
                    <feather-icon
                      icon="EyeIcon"
                      class="mx-1 clickable"
                      :hidden="true"
                      :id="`invoice-row-${item.id}-prev-icon`"
                    />
                  </b-button>
                  <b-button
                    data-action-type="edit"
                    v-b-tooltip.hover.top="$t('edit')"
                    variant="custom"
                    class="btn-icon"
                    size="sm"
                    @click="editPaymentMethod(item)"
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
                    v-permission="'deleteAreas'"
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
import GTable from "../../Shared/Table.vue";

export default {
  components: {
    GTable,
  },
  data() {
    return {
      selectedItem: {
      },
      totalRows: 0,
      currentPage: 1,
      perPage: 25,
      searchQuery: "",
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      items: [],
      title: "paymentMethods",
      description: "previewPaymentMethods",
    };
  },
  computed: {
    tableColumns() {
      return [
        { key: "code", label: this.$t("code"), sortable: true },
        { key: "arabicName", label: this.$t("paymentWay"), sortable: true },
        { key: "notes", label: this.$t("notes"), sortable: true },
        { key: "actions" },
      ];
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    remove(item) {
      this.confirmAction(
        {
          text: this.$t("areYouSureYouWantToDelete"),
        },
        () => {
          this.delete({ url: "PaymentMethods", id: item.id }).then(() => {
            this.doneAlert({ text: this.$t("deletedSuccessfully") });
            this.getItems();
          });
        }
      );
    },
    getItems() {
      this.get({ url: "PaymentMethods" }).then((data) => {
        this.items = data;
        console.log(this.items);
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    editPaymentMethod(item) {
      console.log(item);
      this.$router.push({
        name: "editPaymentMethod",
        params: { id: item.id },
      });
    },
    remove(item) {
      this.confirmAction(
        {
          text: this.$t("areYouSureYouWantToDelete"),
        },
        () => {
          this.delete({ url: "PaymentMethods", id: item.id }).then(() => {
            this.doneAlert({ text: this.$t("deletedSuccessfully") });
            this.getItems();
          });
        }
      );
    },
  },
};
</script>

<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <pageheader :title="title" :title1="title1" />
        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <!-- <HaTable
              :columns="tableColumns"
              :sortable-fields="sortOptions"
              :data="dummyData"
              :entries="10"
              :actions="true"
            /> -->
            <SecTable :columns="tableColumns" :data="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GTable from "../../Shared/Table.vue";
import HaTable from "@/views/pages/Shared/table/HaTable.vue";
import FormItem from "@/components/form/inputs/field.vue";
import SecTable from "../../Shared/table/SecTable.vue";

export default {
  components: {
    FormItem,
    GTable,
    HaTable,
    SecTable,
  },
  data() {
    return {
      selectedItem: {
        Code: "",
        test: "",
      },
      paymentMethods: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 25,
      searchQuery: "",
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      items: [],
      Category: ["Choose Category", "Computers"],
      SubCategory: ["Choose Sub Category", "Fruits"],
      Brand: ["Choose Brand", "Brand"],
      Unit: ["Choose Unit", "Unit"],
      Tax: ["Choose Tax", "2%"],
      Percentage: ["Percentage", "10%", "20%"],
      Closed: ["Closed", "Open"],
    };
  },
  computed: {
    tableColumns() {
      return [ this.$t('arabicName') ,this.$t('accountNumber'), this.$t('iban'), this.$t('notes')];
    },
    sortOptions() {
      return ["code", "accountNumber", "iban", "notes", "arabicName"];
    },
    dummyData() {
      return [
        {
          id: 1,
          code: 59,
          arabicName: "محمود",
          accountNumber: 999,
          iban: 12,
          notes: 5,
        },
        {
          id: 2,
          code: 69,
          arabicName: "ياسر",
          accountNumber: 888,
          iban: 11,
          notes: 4,
        },
        {
          id: 3,
          code: 79,
          arabicName: "احمد",
          accountNumber: 777,
          iban: 10,
          notes: 3,
        },
        {
          id: 4,
          code: 89,
          arabicName: "حازم",
          accountNumber: 666,
          iban: 9,
          notes: 2,
        },
      ];
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.get({ url: "Banks" }).then((data) => {
        // this.items = this.getItemsBasedOnCurrentBranch(data);
        this.items = data;
      });
      this.get({ url: "PaymentMethods" }).then((data) => {
        this.paymentMethods = data;
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    save() {
      this.create({
        url: "Banks",
        data: this.selectedItem,
      }).then(() => {
        this.doneAlert({ text: this.$t("savedSuccessfully") });
        this.$router.push({ name: "banks" });
      });
      this.create({
        url: "Banks",
        data: this.selectedItem,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    },
    editBank(item) {
      this.$router.push({
        name: "editBank",
        params: { id: item.id },
      });
    },
    isBankUsed(bankId) {
      const relatedPayMethod = this.paymentMethods.find(
        (val) => val.bankId === bankId
      );
      if (relatedPayMethod) {
        this.doneAlert({
          text: `${this.$t("bankRelatedToPaymentMethod")} ${
            relatedPayMethod.arabicName
          }`,
          type: "warning",
        });
        return true;
      }

      return false;
    },
    remove(item) {
      this.confirmAction(
        {
          text: this.$t("areYouSureYouWantToDelete"),
        },
        () => {
          // validate if bank used in payment method
          if (this.isBankUsed(item.id)) {
            return;
          }

          // then delete
          this.delete({ url: "Banks", id: item.id }).then(() => {
            this.doneAlert({ text: this.$t("deletedSuccessfully") });
            this.getItems();
          });
        }
      );
    },
  },
  name: "banks",
};
</script>
/*
<g-table
  ref="guardians-table"
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
      $router.push({ name: 'addBank' });
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
      v-permission="'editAreas'"
      @click="editBank(item)"
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
      v-permission="'editAreas'"
      @click="editBank(item)"
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
*/

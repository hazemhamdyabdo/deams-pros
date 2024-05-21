<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <pageheader :title="$t(title)" :title1="$t(description)" />

        <div class="card">
          <div class="card-body">
            <GTable
              ref="guests-table"
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
                  $router.push({ name: 'AddAccommodations' });
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
                    <vue-feather type="edit" size="14" class="mx-1 clickable" />
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
                    />
                  </b-button>
                </div>
              </template>
            </GTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { guestTypes, identityTypes } from "@/libs/acl/Lookups";
import GTable from "@/views/pages/Shared/Table.vue";
export default {
  components: {
    GTable,
  },
  data: () => ({
    title: "Accommodations",
    description: "previewAccommodations",
    items: [],
    totalRows: 0,
    perPage: 25,
  }),
  // computed section
  computed: {
    tableColumns() {
      return [
        { key: "code", label: this.$t("code"), sortable: true },
        { key: "bookingNumber", label: this.$t("bookingNumber") },
        { key: "bookingDate", label: this.$t("bookingDate") },
        { key: "bookingStatus", label: this.$t("bookingStatus") },
        { key: "bookingType", label: this.$t("bookingType") },
        { key: "actions" },
      ];
    },
  },

  // mounted section
  mounted() {
    this.getItems();
  },

  // methods section
  methods: {
    async getItems() {
      const data = await this.get({ url: "Accommodations" });
      this.items = data;

      // .then((data) => {
      //   this.items = data;
      //   this.items.forEach(element => {
      //     element.guestTypeName = guestTypes.find((gt) => gt.id === element.guestTypeId).arabicName
      //     element.identityTypeName = identityTypes.find((it) => it.id === element.identityTypeId).arabicName
      //   });
      // });
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
    },

    edit(item) {
      console.log(item);
      this.$router.push({
        name: "editAccommodations",
        params: { id: item.id },
      });
    },

    remove(item) {
      this.confirmAction(
        {
          text: this.$t("areYouSureYouWantToDelete"),
        },
        () => {
          // then delete
          this.delete({ url: "Accommodations", id: item.id }).then(() => {
            this.doneAlert({ text: this.$t("deletedSuccessfully") });
            this.getItems();
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>

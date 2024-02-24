<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        
        <!-- header  -->
        <pageheader 
          :title="$t(title)" 
          :title1="$t(description)" 
        />

        <!-- table -->
        <div class="card">
          <div class="card-body">
            <g-table
              ref="rooms-table"
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
                  $router.push({ name: 'addRoom' });
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
                    />
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
            </g-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// scripts section
import GTable from '@/views/pages/Shared/Table.vue'

export default {
  // components section
  components: {
    GTable,
  },

  // data section 
  data() {
    return {
      items: [],
      totalRows: 0,
      perPage: 25,   
      title: "rooms",
      description: "previewRooms",
    };
  },

  // computed section
  computed: {
    tableColumns() {
      return [
        { key: "code", label: this.$t("code"), sortable: true },
        { key: "roomNumber", label: this.$t("roomNumber") },
        { key: "buildingName", label: this.$t("building") },
        { key: "floorName", label: this.$t("floor") },
        { key: "roomType", label: this.$t("roomType") },
        { key: "roomCleanStatus", label: this.$t("roomStatus") },
        { key: "notes", label: this.$t("notes")},
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
    getItems() {
      this.get({ url: "Rooms" }).then((data) => {
        this.items = data;
        this.items.forEach(element => {
          element.roomCleanStatus = this.$t(element.roomCleanStatus);
        });
      });
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
    },

    edit(item) {
      this.$router.push({
        name: "editRoom",
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
          this.delete({ url: "Rooms", id: item.id }).then(() => {
            this.doneAlert({ text: this.$t("deletedSuccessfully") });
            this.getItems();
          });
        }
      );
    },
  },
};
</script>

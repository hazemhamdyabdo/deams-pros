<template>
  <div>
    <HaTable
      :columns="tableColumns"
      :data="tableData"
      :entries="5"
      :sortableFields="sortableFields"
      :totalItems="tableData.length"
    />
  </div>
</template>

<script>
import HaTable from "./HaTable.vue";

export default {
  components: { HaTable },
  data: () => ({
    tableData: [
      { id: 1, name: "Abou Obeida", age: 27, country: "Palestine" },
      { id: 3, name: "Hazem Hamdy", age: 24, country: "Egypt" },
      { id: 2, name: "Mohamed Salem", age: 30, country: "Saudia" },
    ],
    tableColumns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Age", field: "age" },
      { label: "Country", field: "country" },
    ],
    sortableFields: ["id", "name", "age"],
  }),
};
</script>

<style lang="scss" scoped></style>

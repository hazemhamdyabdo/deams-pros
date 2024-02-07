<template>
  <div class="data-table">
    <img src="@/assets/img/icons/filter.svg" alt="img" class="icon" />
    <div class="search-container">
      <a class="btn btn-searchset"
        ><img src="@/assets/img/icons/search-white.svg" alt="img"
      /></a>
      <input
        class="form-control form-control-sm search-btn"
        type="text"
        id="search"
        v-model="searchTerm"
        @input="filterData"
        placeholder="Search..."
      />
    </div>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.field"
            @click="sortField(column.field)"
          >
            {{ column.label }}
            <span v-if="sortColumn === column.field">
              {{ sortDirection === "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th>
            <span v-if="actions">{{ "Actions" }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row.id">
          <td v-for="column in columns" :key="column.field">
            {{ row[column.field] }}
          </td>
          <td>
            <router-link
              class="me-3"
              :to="{ name: 'product-details', params: { id: row.id } }"
            >
              <img src="@/assets/img/icons/eye.svg" alt="img" />
            </router-link>
            <router-link
              class="me-3"
              :to="{ name: 'editproduct', params: { id: row.id } }"
            >
              <img src="@/assets/img/icons/edit.svg" alt="img" />
            </router-link>
            <a
              class="confirm-text"
              href="javascript:void(0);"
              @click="showAlert"
            >
              <img src="@/assets/img/icons/delete.svg" alt="img" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <select
        v-model="itemsPerPage"
        @change="changeItemsPerPage"
        class="entreis"
      >
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <div>
        <div v-for="page in totalPages">
          <button @click="goToPage(page)" :key="page" class="page">
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    entries: {
      type: Number,
      default: 10,
    },
    sortableFields: {
      type: Array,
      default: () => [],
    },
    actions: {
      default: false,
      type: Boolean,
    },
    totalItems: {
      type: Number,
      default: 50,
    },
    initialItemsPerPage: {
      type: Number,
      default: 10,
    },
    perPageOptions: {
      type: Array,
      default: () => [10, 25, 50],
    },
  },
  data() {
    return {
      sortColumn: "",
      sortDirection: "asc",
      searchTerm: "",
      currentPage: 1,
      itemsPerPage: this.initialItemsPerPage,
    };
  },
  computed: {
    sortedData() {
      if (this.sortColumn && this.sortableFields.includes(this.sortColumn)) {
        return [...this.data].sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];
          if (this.sortDirection === "asc") {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      } else {
        return this.data;
      }
    },
    filteredData() {
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        return this.sortedData.filter((row) => {
          return this.columns.some((column) => {
            const cellValue = String(row[column.field]).toLowerCase();
            return cellValue.includes(searchTermLower);
          });
        });
      } else {
        return this.sortedData;
      }
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.entries);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.entries;
      const endIndex = startIndex + this.entries;
      return this.filteredData.slice(startIndex, endIndex);
    },
    pagesToShow() {
      const pages = [];
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(this.maxPagesToShow / 2)
      );
      const endPage = Math.min(
        this.totalPages,
        startPage + this.maxPagesToShow - 1
      );

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
    entryStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    entryEnd() {
      const end = this.currentPage * this.itemsPerPage;
      return end > this.totalItems ? this.totalItems : end;
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$emit("page-change", this.currentPage, this.itemsPerPage);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("page-change", this.currentPage, this.itemsPerPage);
      }
    },
    goToPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.$emit("page-change", this.currentPage, this.itemsPerPage);
      }
    },
    changeItemsPerPage() {
      this.currentPage = 1; // Reset to the first page when changing items per page
      this.$emit("page-change", this.currentPage, this.itemsPerPage);
    },
    sortField(field) {
      if (this.sortableFields.includes(field)) {
        if (this.sortColumn === field) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortColumn = field;
          this.sortDirection = "asc";
        }
      }
    },
    changePage(direction) {
      this.currentPage += direction;
    },
    showAlert() {
      // Use sweetalert2
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#FF9F43",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.");
        }
      });
    },
  },
};
</script>

<style scoped>
.entreis {
  border: none;
  border: 1px solid gainsboro;
}
.data-table {
  margin: 20px;
}

.search-container {
  margin-bottom: 10px;
  position: relative;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

tbody > tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.pagination button {
  cursor: pointer;
}

.search-btn {
  width: 20rem;
  margin-right: 2.7rem;
}

.btn-searchset {
  position: absolute;
  right: 30%;
}

.icon {
  background-color: orange;
  width: 2.2rem;
  border-radius: 8px;
  padding: 5px 5px;
  position: absolute;
  top: 2.3rem;
}
.page {
  border: none;
  background-color: rgb(252, 177, 37);
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  color: white;
  border: 1px solid blue;
}
</style>

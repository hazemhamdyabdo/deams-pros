<template>
  <div>
    <div class="search-sort">
      <a class="btn btn-searchset"
        ><img src="@/assets/img/icons/search-white.svg" alt="img"
      /></a>
      <input
        v-model="searchQuery"
        @input="updateSearch"
        placeholder="Search..."
      />
      <select v-model="selectedSort" @change="updateSort">
        <option value="">Sort by...</option>
        <option v-for="column in columns" :key="column" :value="column">
          {{ column }}
        </option>
      </select>
      <select v-model="sortOrder" @change="updateSortOrder">
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            <span @click="sortData(column)">{{ column }}</span>
          </th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            {{ item[column] }}
          </td>
          <td>
            <router-link
              class="me-3"
              :to="{ name: 'product-details', params: { id: index } }"
            >
              <img src="@/assets/img/icons/eye.svg" alt="img" />
            </router-link>
            <router-link
              class="me-3"
              :to="{ name: 'editproduct', params: { id: index } }"
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
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <template v-for="page in totalPages" :key="page">
        <button
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
      </template>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>

    <div class="entries">
      <select v-model="itemsPerPage" @change="changeItemsPerPage">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    initialItemsPerPage: {
      type: Number,
      default: 10,
    },
    perPageOptions: {
      type: Array,
      default: () => [5, 10, 25, 50],
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: this.initialItemsPerPage,
      sortBy: null,
      sortOrder: 1,
      searchQuery: "",
      selectedSort: "",
    };
  },
  computed: {
    sortedData() {
      if (this.sortBy) {
        return this.data.slice().sort((a, b) => {
          const aValue = a[this.sortBy];
          const bValue = b[this.sortBy];
          return (
            this.sortOrder * (aValue > bValue ? 1 : aValue < bValue ? -1 : 0)
          );
        });
      } else {
        return this.data;
      }
    },
    filteredData() {
      const query = this.searchQuery.toLowerCase();
      return this.sortedData.filter((item) =>
        this.columns.some((column) =>
          String(item[column]).toLowerCase().includes(query)
        )
      );
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredData.slice(startIndex, endIndex);
    },
  },
  methods: {
    sortData(column) {
      if (this.sortBy === column) {
        this.sortOrder *= -1;
      } else {
        this.sortBy = column;
        this.sortOrder = 1;
      }
      this.$emit("field-sort", this.sortBy, this.sortOrder);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.showRestOfData();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.showRestOfData();
      }
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
    goToPage(page) {
      if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.showRestOfData();
      }
    },
    changeItemsPerPage() {
      this.currentPage = 1;
      this.showRestOfData();
    },
    showRestOfData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const remainingData = this.filteredData.slice(startIndex);
      const extraPages = Math.ceil(remainingData.length / this.itemsPerPage);

      if (extraPages > 1) {
        // Show the remaining data in additional pages
        for (let i = 2; i <= extraPages; i++) {
          this.$emit(
            "page-change",
            i + this.currentPage - 1,
            this.itemsPerPage
          );
        }
      }
    },
    updateSearch() {
      this.currentPage = 1;
      this.showRestOfData();
      this.$emit("search-change", this.searchQuery);
    },
    updateSort() {
      this.sortBy = this.selectedSort;
      this.$emit("field-sort", this.sortBy, this.sortOrder);
    },
    updateSortOrder() {
      this.$emit("field-sort", this.sortBy, this.sortOrder);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
}

tbody > tr:nth-child(odd) {
  background-color: #f2f2f2;
}

th span {
  cursor: pointer;
}

.search-sort {
  margin-bottom: 10px;
}

.search-sort input,
.search-sort select {
  margin-right: 10px;
}

.pagination {
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}

.entries {
  margin-top: 10px;
}
.btn-searchset {
  position: absolute;
  right: 15%;
  top: 16px;
}
</style>

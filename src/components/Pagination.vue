<template>
  <ul class="pagination pagination-lg justify-content-center">
    <li
      v-for="pageCount in totalPages"
      :key="`${name}-${pageCount}`"
      class="page-item"
      :class="{ active: pageCount === currentPage }"
      @click="handlePageClick(pageCount)"
    >
      <button class="page-link">
        {{ pageCount }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: "pagination",
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      maximPageSize: 8,
    };
  },
  computed: {
    currentPageSize() {
      return this.pageSize >= this.maximPageSize
        ? this.maximPageSize
        : this.pageSize;
    },
    totalPages() {
      return Math.ceil(this.list.length / this.currentPageSize);
    },
    elementsPerPage() {
      const start = (this.currentPage - 1) * this.currentPageSize;
      const end = start + this.currentPageSize;
      return this.list.slice(start, end);
    },
  },
  watch: {
    currentPage() {
      this.handlePageClick(this.currentPage);
    },
    list() {
      this.handlePageClick(1);
    }
  },
  methods: {
    handlePageClick(pageToDisplay) {
      this.$emit("page", {
        currentPage: pageToDisplay,
        listToDisplay: this.elementsPerPage,
      });
    },
  }
};
</script>

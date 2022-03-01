<template>
  <table class="table table-striped user-table" cellspacing="0">
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          class="user-table_header"
          scope="col"
          :key="`${header}-${index}`"
          @click="handleSort(header)"
        >
          <span
            :class="{
              'user-table_header-sorting': sortingHeaders.includes(header.key),
              'user-table_header-descending':
                sortBy === header.key && sortDirection === directions.DOWN,
              'user-table_header-ascending':
                sortBy === header.key && sortDirection === directions.UP,
            }"
            >{{ header.text }}</span
          >
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td
          v-for="(rowProperty, name, index) in row"
          :key="`${rowProperty}-${row.id}-${index}`"
        >
          <slot :name="name" :row="row">
            {{ rowProperty }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { directions } from "@/data";

export default {
  name: "UserTable",
  props: {
    rows: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    sortingHeaders: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      sortDirection: null,
      sortBy: null,
      resetDirection: false,
      directions,
    };
  },
  methods: {
    resetSorting() {
      this.sortBy = null;
      this.sortDirection = null;
    },
    assignSortBy(header) {
      if (this.sortBy === header) {
        this.resetDirection = false;
      } else {
        this.resetDirection = true;
      }
      this.sortBy = header;
    },
    assignSortDirection() {
      if (this.resetDirection || this.sortDirection === null) {
        this.sortDirection = directions.UP;
      } else {
        this.sortDirection =
          this.sortDirection === directions.UP
            ? directions.DOWN
            : directions.UP;
      }
    },
    handleSort({ key }) {
      if (this.sortingHeaders.includes(key)) {
        this.assignSortBy(key);
        this.assignSortDirection();
        this.$emit("sort", {
          sortDirection: this.sortDirection,
          headerKey: key,
        });
      }
    },
  },
};
</script>

<style>
.user-table .user-table_header {
  position: relative;
  padding-right: 25px;
  border: 1px solid #ccc;
}
.user-table .user-table_header .user-table_header-sorting::after,
.user-table .user-table_header .user-table_header-sorting::before {
  content: "";
  position: absolute;
  bottom: 50%;
  right: 5px;
  transform: translateY(50%) rotate(45deg);
  width: 0;
  height: 0;
  border: 4px solid #cccccc;
}
.user-table .user-table_header .user-table_header-sorting::before {
  bottom: calc(50% - 1px);
  border-top-color: transparent;
  border-left-color: transparent;
}
.user-table .user-table_header .user-table_header-sorting::after {
  bottom: calc(50% + 1px);
  border-bottom-color: transparent;
  border-right-color: transparent;
}
.user-table
  .user-table_header
  .user-table_header-sorting.user-table_header-descending::before {
  border: 4px solid #000000;
  border-top-color: transparent;
  border-left-color: transparent;
}
.user-table
  .user-table_header
  .user-table_header-sorting.user-table_header-ascending::after {
  border: 4px solid #000000;
  border-bottom-color: transparent;
  border-right-color: transparent;
}
</style>

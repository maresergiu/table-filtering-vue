<template>
  <page-wrapper>
    <form @submit.prevent="handleFormSubmit" class="pt-4 pb-4 px-0 py-0">
      <div class="form-group">
        <input-text
          label="Search by full name"
          formId="fullName"
          placeholder="Enter full name"
          v-model="fullName"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-primary mt-2">Submit</button>
        <button class="btn btn-secondary mt-2 mx-2" @click="handleFormReset">
          Reset
        </button>
      </div>
    </form>
    <user-table
      ref="userTable"
      :rows="listToDisplay"
      :headers="userKeys"
      :sortingHeaders="[
        userTableMap.username,
        userTableMap.first_name,
        userTableMap.last_name,
      ]"
      @sort="handleSort"
    >
      <template v-slot:avatar="{ row }">
        <template v-if="row.avatar">
          <img :src="row.avatar" :alt="`${row.first_name} ${row.last_name}`" />
        </template>
        <template v-else> No image for this user. </template>
      </template>
    </user-table>
    <pagination
      :list="users"
      :currentPage="currentPage"
      :pageSize="9"
      @page="handlePagination"
    />
  </page-wrapper>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import Pagination from "@/components/Pagination.vue";
import InputText from "@/components/InputText.vue";
import { mapActions, mapState } from "vuex";
import { userTableHeaders, userTableMap } from "@/data";
import { pagination } from "@/mixins";
import { orderBy } from "lodash";

export default {
  name: "HomePage",
  components: {
    UserTable,
    PageWrapper,
    Pagination,
    InputText,
  },
  mixins: [pagination],
  data() {
    return {
      fullName: "",
      userTableMap,
    };
  },
  computed: {
    ...mapState("users", ["users"]),
    userKeys() {
      const condition = Array.isArray(this.users) && this.users[0];
      return condition
        ? Object.keys(this.users[0]).map((key) => ({
            text: userTableHeaders[key],
            key: userTableMap[key],
          }))
        : [];
    },
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "filterUsers", "resetUsers"]),
    handleSort({ sortDirection, headerKey }) {
      this.listToDisplay = orderBy(this.listToDisplay, [headerKey], [sortDirection]);
    },
    handleFormSubmit() {
      if (this.fullName) {
        this.$refs.userTable.resetSorting();
        const fullName = this.fullName.toLowerCase().trim().split(" ").join("");
        this.filterUsers(fullName);
      }
    },
    handleFormReset() {
      this.$refs.userTable.resetSorting();
      this.fullName = "";
      this.resetUsers();
    },
  },
  async created() {
    const allDataIsAvailable = await this.fetchUsers();

    if (!allDataIsAvailable) {
      this.$router.push("error");
    }
  },
};
</script>

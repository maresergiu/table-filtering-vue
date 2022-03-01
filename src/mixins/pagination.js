export const pagination = {
  data() {
    return {
      listToDisplay: [],
      currentPage: 1
    };
  },
  methods: {
    handlePagination({ currentPage, listToDisplay }) {
      this.currentPage = currentPage;
      this.listToDisplay = listToDisplay;
    }
  }
};

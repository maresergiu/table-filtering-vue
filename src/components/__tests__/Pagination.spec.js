import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";
import { userTableMap } from "@/data";

describe("Pagination.vue", () => {
  let wrapperOptions;
  let wrapper;
  let list = [];

  for (let i = 0; i < 30; i++) {
    list.push({
      [userTableMap.id]: i,
      [userTableMap.email]: `${i}a@a.com`,
      [userTableMap.username]: `${i}userName`,
      [userTableMap.first_name]: `${i}firstName`,
      [userTableMap.last_name]: `${i}lastName`,
      [userTableMap.avatar]:
        "https://robohash.org/siteadicta.png?size=50x50&set=set1",
      [userTableMap.job_title]: "none"
    });
  }

  beforeEach(() => {
    wrapperOptions = {
      propsData: {
        list,
        pageSize: 5,
        currentPage: 1
      }
    };
    wrapper = shallowMount(Pagination, wrapperOptions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe("life cycle", () => {
    describe("mounted", () => {
      it("should be define", () => {
        expect(wrapper).toBeDefined();
      });
    });
  });

  describe("computed", () => {
    describe("currentPageSize", () => {
      it("should retrn the props value if pageSize is smaller than maximPageSize", () => {
        expect(wrapper.vm.currentPageSize).toBe(5);
      });

      it("should retrn the props value if pageSize is smaller than maximPageSize", () => {
        wrapperOptions.propsData.pageSize = 9;
        wrapper = shallowMount(Pagination, wrapperOptions);
        expect(wrapper.vm.currentPageSize).toBe(8);
      });
    });

    describe("totalPages", () => {
      it("should return 6 when page 5 is and the list has a length of 30", () => {
        expect(wrapper.vm.totalPages).toBe(6);
      });
    });

    describe("elementsPerPage", () => {
      it("should return a part of the list", () => {
        expect(wrapper.vm.elementsPerPage).toEqual([
          {
            avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
            email: "0a@a.com",
            first_name: "0firstName",
            id: 0,
            job_title: "none",
            last_name: "0lastName",
            username: "0userName"
          },
          {
            avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
            email: "1a@a.com",
            first_name: "1firstName",
            id: 1,
            job_title: "none",
            last_name: "1lastName",
            username: "1userName"
          },
          {
            avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
            email: "2a@a.com",
            first_name: "2firstName",
            id: 2,
            job_title: "none",
            last_name: "2lastName",
            username: "2userName"
          },
          {
            avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
            email: "3a@a.com",
            first_name: "3firstName",
            id: 3,
            job_title: "none",
            last_name: "3lastName",
            username: "3userName"
          },
          {
            avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
            email: "4a@a.com",
            first_name: "4firstName",
            id: 4,
            job_title: "none",
            last_name: "4lastName",
            username: "4userName"
          }
        ]);
      });
    });
  });

  describe("watch", () => {
    describe("currentPage", () => {
      it("should call handlePageClick", async () => {
        const spyOnHandlePageClick = jest.spyOn(wrapper.vm, "handlePageClick");
        wrapper.setProps({
          list: [],
          currentPage: 2
        });
        await wrapper.vm.$nextTick();
        expect(spyOnHandlePageClick).toHaveBeenCalledWith(2);
      });
    });

    describe("list", () => {
      it("should call handlePageClick", async () => {
        const spyOnHandlePageClick = jest.spyOn(wrapper.vm, "handlePageClick");
        wrapper.setProps({
          list: []
        });
        await wrapper.vm.$nextTick();
        expect(spyOnHandlePageClick).toHaveBeenCalledWith(1);
      });
    });
  });

  describe("methods", () => {
    describe("handlePageClick", () => {
      it("should emit page event", async () => {
        wrapper.vm.handlePageClick(1);
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().page[0][0]).toMatchObject({
          currentPage: 1,
          listToDisplay: [
            {
              avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
              email: "0a@a.com",
              first_name: "0firstName",
              id: 0,
              job_title: "none",
              last_name: "0lastName",
              username: "0userName"
            },
            {
              avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
              email: "1a@a.com",
              first_name: "1firstName",
              id: 1,
              job_title: "none",
              last_name: "1lastName",
              username: "1userName"
            },
            {
              avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
              email: "2a@a.com",
              first_name: "2firstName",
              id: 2,
              job_title: "none",
              last_name: "2lastName",
              username: "2userName"
            },
            {
              avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
              email: "3a@a.com",
              first_name: "3firstName",
              id: 3,
              job_title: "none",
              last_name: "3lastName",
              username: "3userName"
            },
            {
              avatar: "https://robohash.org/siteadicta.png?size=50x50&set=set1",
              email: "4a@a.com",
              first_name: "4firstName",
              id: 4,
              job_title: "none",
              last_name: "4lastName",
              username: "4userName"
            }
          ]
        });
      });
    });
  });

  describe("template", () => {
    it("should add the class active to first button", () => {
      expect(
        wrapper.findAll(".page-item").at(0).classes("active")
      ).toBeTruthy();
    });

    it("should trigger handlePageClick", () => {
      const spyOnHandlePageClick = jest.spyOn(wrapper.vm, "handlePageClick");
      wrapper.find(".page-item").trigger("click");
      expect(spyOnHandlePageClick).toHaveBeenCalled();
    });
  });
});

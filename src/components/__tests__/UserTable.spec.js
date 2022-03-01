import { shallowMount } from "@vue/test-utils";
import UserTable from "@/components/UserTable.vue";
import { directions } from "@/data";

describe("UserTable.vue", () => {
  let wrapperOptions;
  let wrapper;

  beforeEach(() => {
    wrapperOptions = {
      propsData: {
        rows: [
          { firstName: "Jonh", lastName: "Doe" },
          { firstName: "Nick", lastName: "Smith" }
        ],
        headers: [
          {
            text: "First Name",
            key: "firstName"
          },
          {
            text: "Last Name",
            key: "lastName"
          }
        ],
        sortingHeaders: ["firstName"]
      }
    };
    wrapper = shallowMount(UserTable, wrapperOptions);
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

  describe("methods", () => {
    describe("resetSorting", () => {
      it("should reset sortBy", () => {
        wrapper.setData({
          sortBy: "firstName"
        });
        wrapper.vm.resetSorting();
        expect(wrapper.vm.sortBy).toBeNull();
      });

      it("should reset sortDirection", () => {
        wrapper.setData({
          sortDirection: "asc"
        });
        wrapper.vm.resetSorting();
        expect(wrapper.vm.sortDirection).toBeNull();
      });
    });

    describe("assignSortBy", () => {
      it("should assign the parameters value to sortBy", () => {
        wrapper.vm.assignSortBy("firstName");
        expect(wrapper.vm.sortBy).toBe("firstName");
      });

      it("should set resetDirection to true if header is not equal to sortBy", () => {
        wrapper.setData({
          sortBy: "lastName"
        });
        wrapper.vm.assignSortBy("firstName");
        expect(wrapper.vm.resetDirection).toBe(true);
      });

      it("should set resetDirection to false if header is equal to sortBy", () => {
        wrapper.setData({
          sortBy: "firstName"
        });
        wrapper.vm.assignSortBy("firstName");
        expect(wrapper.vm.resetDirection).toBe(false);
      });
    });

    describe("assignSortDirection", () => {
      describe("sortDirection is falsy", () => {
        it("should set sortDirection to asc if resetDirection is true", () => {
          wrapper.setData({
            resetDirection: true
          });
          wrapper.vm.assignSortDirection();
          expect(wrapper.vm.sortDirection).toBe(directions.UP);
        });

        it("should set sortDirection to asc if resetDirection is false", () => {
          wrapper.setData({
            resetDirection: false,
            sortDirection: null
          });
          wrapper.vm.assignSortDirection();
          expect(wrapper.vm.sortDirection).toBe(directions.UP);
        });
      });

      describe("sortDirection and resetDirection are truthy", () => {
        it("should set sortDirection to asc if sortDirection is equal to desc", () => {
          wrapper.setData({
            resetDirection: false,
            sortDirection: null
          });
          wrapper.vm.assignSortDirection();
          expect(wrapper.vm.sortDirection).toBe(directions.UP);
        });

        it("should set sortDirection to desc if sortDirection is equal to asc", () => {
          wrapper.setData({
            resetDirection: false,
            sortDirection: null,
            sortDirection: directions.UP
          });
          wrapper.vm.assignSortDirection();
          expect(wrapper.vm.sortDirection).toBe(directions.DOWN);
        });
      });
    });

    describe("handleSort", () => {
      it("should not emit sort event", () => {
        wrapper.vm.handleSort({ key: "lastName" });
        expect(wrapper.emitted().sort).toBeUndefined();
      });

      it("should emit sort event", () => {
        wrapper.vm.handleSort({ key: "firstName" });
        expect(wrapper.emitted().sort[0][0]).toMatchObject({
          headerKey: "firstName",
          sortDirection: "asc"
        });
      });

      it("should call assignSortBy", () => {
        const spyOnAssignSortBy = jest.spyOn(wrapper.vm, "assignSortBy");
        wrapper.vm.handleSort({ key: "firstName" });
        expect(spyOnAssignSortBy).toHaveBeenCalledWith("firstName");
      });

      it("should call assignSortDirection", () => {
        const spyOnAssignSortDirection = jest.spyOn(
          wrapper.vm,
          "assignSortDirection"
        );
        wrapper.vm.handleSort({ key: "firstName" });
        expect(spyOnAssignSortDirection).toHaveBeenCalled();
      });
    });
  });

  describe("template", () => {
    it("should not add user-table_header-sorting class if header doesn't allow sorting", () => {
      expect(
        wrapper
          .findAll(".user-table_header span")
          .at(1)
          .classes("user-table_header-sorting")
      ).toBeFalsy();
    });

    it("should add user-table_header-sorting class if header allows sorting", () => {
      expect(
        wrapper
          .findAll(".user-table_header span")
          .at(0)
          .classes("user-table_header-sorting")
      ).toBeTruthy();
    });
  });
});

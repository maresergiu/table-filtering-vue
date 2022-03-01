import { shallowMount, createLocalVue } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import Vuex from "vuex";
import UserTable from "@/components/UserTable.vue";
import { userTableMap } from "@/data";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HomePage.vue", () => {
  let wrapperOptions;
  let wrapper;
  let modules;

  let users = [];

  for (let i = 0; i < 30; i++) {
    users.push({
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
    modules = {
      users: {
        state: {
          users: users
        },
        actions: {
          fetchUsers: jest.fn(),
          filterUsers: jest.fn(),
          resetUsers: jest.fn()
        },
        namespaced: true
      }
    };
    wrapperOptions = {
      stubs: {
        "user-table": UserTable,
        "page-wrapper": true,
        pagination: true,
        "input-text": true
      },
      store: new Vuex.Store({
        modules
      }),
      mocks: {
        $router: {
          push: jest.fn(() => true)
        },
        $refs: {
          userTable: {
            resetSorting: jest.fn()
          }
        }
      },
      localVue
    };
    wrapper = shallowMount(HomePage, wrapperOptions);
  });

  describe("life cycle", () => {
    describe("mounted", () => {
      it("should be define", () => {
        expect(wrapper).toBeDefined();
        wrapper.destroy();
      });
    });

    describe("created", () => {
      it("should call fetchUsers, action store", () => {
        expect(modules.users.actions.fetchUsers).toHaveBeenCalled();
        wrapper.destroy();
      });

      it("should push to error screen if fetchUsers is falsy", () => {
        modules.users.actions.fetchUsers = jest.fn(() => false);
        wrapper = shallowMount(HomePage, {
          ...wrapperOptions,
          store: new Vuex.Store({
            modules
          })
        });
        expect(wrapperOptions.mocks.$router.push).toHaveBeenCalled();
        wrapper.destroy();
      });
    });
  });

  describe("computed", () => {
    describe("userKeys", () => {
      it("should match the returning object", () => {
        expect(wrapper.vm.userKeys).toMatchObject([
          { key: "id", text: "User ID" },
          { key: "email", text: "Email" },
          { key: "username", text: "Username" },
          { key: "first_name", text: "First Name" },
          { key: "last_name", text: "Last Name" },
          { key: "avatar", text: "Avatar" },
          { key: "job_title", text: "Job Title" }
        ]);
      });
    });
  });

  describe("methods", () => {
    describe("handleFormReset", () => {
      it("should call resetSorting", () => {
        const spyOnResetSorting = jest.spyOn(
          wrapper.vm.$refs.userTable,
          "resetSorting"
        );
        wrapper.vm.handleFormReset();
        expect(spyOnResetSorting).toHaveBeenCalled();
      });

      it("should set fullName to empty string", () => {
        wrapper.vm.handleFormReset();
        expect(wrapper.vm.fullName === "").toBe(true);
      });

      it("should call resetUsers", () => {
        wrapper.vm.handleFormReset();
        expect(modules.users.actions.resetUsers).toHaveBeenCalled();
      });
    });

    describe("handleFormSubmit", () => {
      describe("fullName is truthy", () => {
        beforeEach(() => {
          wrapper.setData({
            fullName: "firstName lastName"
          });
        });

        it("should call resetSorting", () => {
          const spyOnResetSorting = jest.spyOn(
            wrapper.vm.$refs.userTable,
            "resetSorting"
          );
          wrapper.vm.handleFormSubmit();
          expect(spyOnResetSorting).toHaveBeenCalled();
        });

        it("should call filterUsers", () => {
          wrapper.vm.handleFormSubmit();
          expect(modules.users.actions.filterUsers).toHaveBeenCalled();
        });
      });
    });

    describe("handleSort", () => {
      const listToDisplay = [
        { firstName: "C" },
        { firstName: "B" },
        { firstName: "A" }
      ];

      it("should assign am ascending array to listToDisplay", () => {
        wrapper.setData({
          listToDisplay
        });
        wrapper.vm.handleSort({
          sortDirection: "asc",
          headerKey: "firstName"
        });
        expect(wrapper.vm.listToDisplay).toEqual([
          { firstName: "A" },
          { firstName: "B" },
          { firstName: "C" }
        ]);
      });

      it("should assign am descending array to listToDisplay", () => {
        wrapper.setData({
          listToDisplay
        });
        wrapper.vm.handleSort({
          sortDirection: "desc",
          headerKey: "firstName"
        });
        expect(wrapper.vm.listToDisplay).toEqual([
          { firstName: "C" },
          { firstName: "B" },
          { firstName: "A" }
        ]);
      });
    });
  });
});

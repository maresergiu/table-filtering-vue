import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  let wrapperOptions;

  wrapperOptions = {
    stubs: ["router-view"]
  };

  describe("life cycle", () => {
    describe("mounted", () => {
      it("should be define", () => {
        const wrapper = shallowMount(App, wrapperOptions);
        expect(wrapper).toBeDefined();
        wrapper.destroy();
      });
    });
  });
});

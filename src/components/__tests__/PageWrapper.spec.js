import { shallowMount } from "@vue/test-utils";
import PageWrapper from "@/components/PageWrapper.vue";

describe("PageWrapper.vue", () => {
  let wrapperOptions;
  let wrapper;

  beforeEach(() => {
    wrapperOptions = {
      slots: {
        default: "<h1>Title</h1>"
      }
    };
    wrapper = shallowMount(PageWrapper, wrapperOptions);
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

  describe("slots", () => {
    it("should render page content", () => {
      expect(wrapper.find("h1").exists()).toBe(true);
    });
  });
});

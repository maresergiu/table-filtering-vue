import { shallowMount } from "@vue/test-utils";
import InputText from "@/components/InputText.vue";

describe("InputText.vue", () => {
  let wrapperOptions;
  let wrapper;

  beforeEach(() => {
    wrapperOptions = {
      propsData: {
        label: "mockLabel",
        formId: "mockId",
        placeholder: "mockPlaceholder",
        value: "mockValue"
      },
      listeners: {
        click: jest.fn(),
        input: jest.fn()
      },
      attrs: {
        mockattribute: "mockValue"
      }
    };
    wrapper = shallowMount(InputText, wrapperOptions);
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
    describe("listeners", () => {
      it("should match the return object", () => {
        expect(wrapper.vm.listeners).toMatchObject({
          events: { click: expect.any(Function) },
          input: expect.any(Function)
        });
      });
    });
  });

  describe("template", () => {
    it("should find the value of the label in the text label tag", () => {
      const { label } = wrapperOptions.propsData;
      expect(wrapper.find("label").text()).toBe(label);
    });

    it("should pass the formId value to the id attribut", () => {
      const { formId } = wrapperOptions.propsData;
      expect(wrapper.find("input").attributes("id")).toBe(formId);
    });

    it("should populate te input with the value", () => {
      const { value } = wrapperOptions.propsData;
      expect(wrapper.find("input").element.value).toBe(value);
    });

    it("should populate te input with the placeholder", () => {
      const { placeholder } = wrapperOptions.propsData;
      expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
    });

    it("should bind any attribute which is passed down", () => {
      expect(wrapper.find("input").attributes("mockattribute")).toBe(
        "mockValue"
      );
    });

    it("should bind any events which is passed down", () => {
      wrapper.find("input").trigger("click");
      expect(wrapperOptions.listeners.click).toHaveBeenCalled();
    });

    it("should emit event as value changes", () => {
      const input = wrapper.find("input");
      input.element.value = "Sergiu Mare";
      input.trigger("input");
      expect(wrapper.emitted().input[0][0]).toBe(input.element.value);
    });
  });
});

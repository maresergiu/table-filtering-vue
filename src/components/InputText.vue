<template>
  <div>
    <label :for="formId">{{ label }}</label>
    <input
      type="text"
      class="form-control"
      :id="formId"
      :value="value"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="listeners.events"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    label: {
      type: String,
      required: true,
    },
    formId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return {
        events: listeners,
        input,
      };
    },
  }
};
</script>

<template>
  <page-wrapper>
    <p class="mt-4">
      Something went wrong and we couldn't get the data. This is the end of the
      journey.
    </p>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";

export default {
  name: "ErrorPage",
  components: {
    PageWrapper,
  },
};
</script>

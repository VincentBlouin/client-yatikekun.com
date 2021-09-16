<template>
  <Page>
    <Privacy></Privacy>
  </Page>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {
    Page: () => import('@/components/Page'),
    Privacy: () => import('@/components/Privacy')
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  data: function () {
    I18n.i18next.addResources("fr", "private", {
    });
    I18n.i18next.addResources("en", "private", {
    });
    return {}
  }
}
</script>

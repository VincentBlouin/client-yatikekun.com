<template>
  <PageWrap>
    <PrivacyContent></PrivacyContent>
  </PageWrap>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {
    PageWrap: () => import('@/components/PageWrap'),
    PrivacyContent: () => import('@/components/PrivacyContent')
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  data: function () {
    I18n.i18next.addResources("fr", "private", {});
    I18n.i18next.addResources("en", "private", {});
    return {}
  }
}
</script>

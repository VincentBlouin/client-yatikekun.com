<template>
  <PageWrap>
    <v-card flat>
      <v-card-title class="vh-center text-h4">
        <v-icon left large class="font-weight-bold">bar_chart</v-icon>
        Stats
      </v-card-title>
      <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
      >
        <v-tab>
          Résumé
        </v-tab>
        <v-tab>
          Détails
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <StatsInBrief></StatsInBrief>
        </v-tab-item>
        <v-tab-item>
          <RelevantTransactions></RelevantTransactions>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </PageWrap>
</template>
<script>
import StatsInBrief from "@/components/admin/StatsInBrief.vue";
import RelevantTransactions from "@/components/admin/RelevantTransactions.vue";

export default {
  name: "StatsPage",
  components: {
    RelevantTransactions,
    StatsInBrief,
    PageWrap: () => import('@/components/PageWrap.vue')
  },
  data: function () {
    return {
      tab: null
    }
  }
}
</script>

<style scoped>

</style>

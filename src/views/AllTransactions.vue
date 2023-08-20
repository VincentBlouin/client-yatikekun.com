<template>
  <PageWrap>
    <v-card flat class="">
      <v-card-title>

      </v-card-title>
      <v-card-text>
        <TransactionsComponent :isAllFlow="true"></TransactionsComponent>
      </v-card-text>
    </v-card>
  </PageWrap>
</template>

<script>
export default {
  name: "AllTransactions",
  components: {
    PageWrap: () => import('@/components/PageWrap'),
    TransactionsComponent: () => import('@/components/TransactionsComponent'),
  },
}
</script>

<style scoped>

</style>

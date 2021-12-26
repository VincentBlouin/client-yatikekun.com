<template>
  <Page>
    <v-card flat class="">
      <v-card-title>

      </v-card-title>
      <v-card-text>
        <Transactions :isAllFlow="true"></Transactions>
      </v-card-text>
    </v-card>
  </Page>
</template>

<script>
export default {
  name: "AllTransactions",
  components: {
    Page: () => import('@/components/Page'),
    Transactions: () => import('@/components/Transactions'),
  },
}
</script>

<style scoped>

</style>

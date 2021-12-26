<template>
  <Page>
    <Transactions></Transactions>
  </Page>
</template>

<script>
export default {
  name: "MemberTransactions",
  components: {
    Page: () => import('@/components/Page'),
    Transactions: () => import('@/components/Transactions'),
  }
}
</script>

<style scoped>

</style>

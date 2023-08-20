<template>
  <PageWrap>
    <TransactionsComponent></TransactionsComponent>
  </PageWrap>
</template>

<script>
export default {
  name: "MemberTransactions",
  components: {
    PageWrap: () => import('@/components/PageWrap'),
    TransactionsComponent: () => import('@/components/TransactionsComponent'),
  }
}
</script>

<style scoped>

</style>

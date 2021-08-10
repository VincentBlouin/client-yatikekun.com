<template>
  <Page v-if="transaction !== null">
    <v-card class="mt-8">
      <v-card-title class="text-h6 vh-center primary-color-background white--text"
                    v-html="transaction.details"
      ></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <Transaction
            :quantity="transaction.amount"
            :giver="transaction.giver"
            :receiver="transaction.receiver"
            :initiator="transaction.initiator"
            :transactionId="transaction.id"
            :flatCard="true"
            @close="$router.push('/transactions')"
        ></Transaction>
      </v-card-text>
    </v-card>
  </Page>
</template>

<script>
import TransactionService from "@/service/TransactionService";

export default {
  name: "TransactionPage",
  components: {
    Page: () => import('@/components/Page'),
    Transaction: () => import("@/components/Transaction")
  },
  data: function () {
    return {
      transaction: null
    };
  },
  mounted: async function () {
    const response = await TransactionService.getForId(
        this.$route.params.transactionId
    );
    this.transaction = response.data;
  }
}
</script>

<style scoped>

</style>

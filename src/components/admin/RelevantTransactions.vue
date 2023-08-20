<template>
    <v-card flat class="">
        <v-card-text>
            <TransactionsComponent :isAllFlow="true" :isRelevantOnly="true"></TransactionsComponent>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "RelevantTransactions",
    components: {
      TransactionsComponent: ()=> import('@/components/TransactionsComponent.vue')
    }
}
</script>

<style scoped>

</style>

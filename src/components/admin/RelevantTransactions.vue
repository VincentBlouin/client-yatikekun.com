<template>
    <v-card flat class="">
        <v-card-text>
            <Transactions :isAllFlow="true" :isRelevantOnly="true"></Transactions>
        </v-card-text>
    </v-card>
</template>

<script>
import Transactions from "@/components/Transactions.vue";

export default {
    name: "RelevantTransactions",
    components: {Transactions}
}
</script>

<style scoped>

</style>

<template>
    <v-card flat>
        <v-card-text class="vh-center">
            <v-row class="vh-center">
                <v-col cols="12" sm="6" md="4">
                    <v-card max-width="300" height="150">
                        <v-card-title class="vh-center">
                            {{ $t('stats:nbTransactions') }}
                        </v-card-title>
                        <v-card-subtitle class="vh-center">
                            {{ $t('stats:betweenMembers') }}
                        </v-card-subtitle>
                        <v-card-text class="font-weight-bold text-h5">
                            {{ nbTransactionsBetweenMembers }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-card max-width="300" height="150" class="ml-4">
                        <v-card-title class="vh-center">
                            {{ $t('stats:nbMembers') }}
                        </v-card-title>
                        <v-card-text class="font-weight-bold text-h5">
                            {{ nbMembers }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-card max-width="300" height="150" class="ml-4">
                        <v-card-title class="vh-center">
                            {{ $t('stats:nbMembers') }}
                        </v-card-title>
                        <v-card-subtitle class="vh-center">
                            {{ $t('stats:involvedInTransactions') }}
                        </v-card-subtitle>
                        <v-card-text class="font-weight-bold text-h5">
                            {{ nbMembersInvolvedInTransactions }}
                            <span class="pl-2 pr-2">|</span>
                            {{ percentageInvolvedInTransaction }}%
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>

<script>
import I18n from "@/i18n";
import TransactionService from "@/service/TransactionService";
import MemberService from "@/service/MemberService";

export default {
    name: "StatsInBrief",
    data: function () {
        I18n.i18next.addResources("fr", "stats", {
            nbTransactions: "Nombre de transactions",
            betweenMembers: "Entre membres",
            nbMembers: "Nombre de membres",
            involvedInTransactions: "Impliqués dans des transactions entre membres"
        });
        I18n.i18next.addResources("en", "stats", {
            nbTransactions: "Nombre de transactions",
            betweenMembers: "Entre membres",
            nbMembers: "Nombre de membres",
            involvedInTransactions: "Impliqués dans des transactions entre membres"
        });
        return {
            nbTransactionsBetweenMembers: null,
            nbMembers: null,
            nbMembersInvolvedInTransactions: null
        };
    },
    mounted: async function () {
        let response = await TransactionService.getNbTransactionsBetweenMembers();
        this.nbTransactionsBetweenMembers = response.data.nbTransactions;
        response = await MemberService.getNbMembers();
        this.nbMembers = response.data.nbMembers;
        response = await TransactionService.getNbMembersInvolvedInTransactions();
        this.nbMembersInvolvedInTransactions = response.data.nbMembersInvolvedInTransactions;
    },
    computed: {
        percentageInvolvedInTransaction: function () {
            return (this.nbMembersInvolvedInTransactions / this.nbMembers * 100).toFixed(2);
        }
    }
}
</script>

<style scoped>

</style>

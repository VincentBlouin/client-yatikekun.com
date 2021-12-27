<template>
  <Page>
    <v-card flat>
      <v-card-title class="vh-center text-h4">
        <v-icon left large class="font-weight-bold">bar_chart</v-icon>
        Stats
      </v-card-title>
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
        </v-row>
      </v-card-text>
    </v-card>
  </Page>
</template>

<script>
import I18n from "@/i18n";
import TransactionService from "@/service/TransactionService";
import MemberService from "@/service/MemberService";

export default {
  name: "Stats",
  components: {
    Page: () => import('@/components/Page')
  },
  data: function () {
    I18n.i18next.addResources("fr", "stats", {
      nbTransactions: "Nombre de transactions",
      betweenMembers: "Entre membres",
      nbMembers: "Nombre de membres"
    });
    I18n.i18next.addResources("en", "stats", {
      nbTransactions: "Nombre de transactions",
      betweenMembers: "Entre membres",
      nbMembers: "Nombre de membres"
    });
    return {
      nbTransactionsBetweenMembers: null,
      nbMembers: null
    };
  },
  mounted: async function () {
    let response = await TransactionService.getNbTransactionsBetweenMembers();
    this.nbTransactionsBetweenMembers = response.data.nbTransactions;
    response = await MemberService.getNbMembers();
    this.nbMembers = response.data.nbMembers;
  }
}
</script>

<style scoped>

</style>

<template>
  <PageWrap v-if="transaction !== null">
    <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="loading"
        class="mt-8"
    ></v-progress-circular>
    <v-alert type="success" color="primary" v-if="confirmSuccess" class="text-h6 mt-8" prominent outlined>
      {{ $t("confirmTransaction:message") }}
    </v-alert>
    <v-card class="mt-8">
      <v-card-title class="text-h6 vh-center primary-color-background white--text">
        {{ transaction.details }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <TransactionComponent
            :quantity="transaction.amount"
            :serviceDuration="transaction.serviceDuration"
            :nbParticipants="transaction.nbParticipants"
            :giver="giver"
            :receiver="receiver"
            :initiator="transaction.initiator"
            :transactionId="transaction.id"
            :giverDonationOrgId="transaction.giverDonationOrgId"
            :receiverDonationOrgId="transaction.receiverDonationOrgId"
            :flatCard="true"
            @close="$router.push('/transactions')"
            :status="transaction.status"
            @statusUpdate="updateStatus"
        ></TransactionComponent>
      </v-card-text>
    </v-card>
  </PageWrap>
</template>
<script>
import TransactionService from "@/service/TransactionService";
import I18n from "@/i18n";
import TransactionComponent from "@/components/TransactionComponent.vue";

export default {
  name: "TransactionPageWrap",
  components: {
    TransactionComponent,
    PageWrap: () => import('@/components/PageWrap')
  },
  data: function () {
    I18n.i18next.addResources("fr", "confirmTransaction", {
      message: "Merci d'avoir confirmé la transaction",
    });
    I18n.i18next.addResources("en", "confirmTransaction", {
      message: "Merci d'avoir confirmé la transaction",
    });
    return {
      transaction: null,
      confirmSuccess: false,
      loading: false
    };
  },
  mounted: async function () {
    this.confirmSuccess = false;
    this.loading = true;
    if (this.$route.params.token) {
      await TransactionService.confirmWithToken(this.$route.params.token);
      this.confirmSuccess = true;
    }
    const response = await TransactionService.getForId(
        this.$route.params.transactionId
    );
    this.transaction = response.data;
    this.loading = false;
  },
  methods: {
    updateStatus: function (status) {
      this.transaction.status = status;
    }
  },
  computed: {
    giver: function () {
      return this.transaction.giver === null ?
          this.transaction.giverOrg :
          this.transaction.giver;
    },
    receiver: function () {
      return this.transaction.receiver === null ?
          this.transaction.receiverOrg :
          this.transaction.receiver;
    }
  }
}
</script>

<style scoped>

</style>

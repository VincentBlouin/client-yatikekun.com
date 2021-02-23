<template>
  <v-row justify="center" class="pt-16 pb-16">
    <v-col cols="12" class="col-md-6 pt-16 text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="loading"
      ></v-progress-circular>
      <v-alert type="success" color="primary" v-else>
        {{ $t("confirmTransaction:message") }}
      </v-alert>
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import TransactionService from "@/service/TransactionService";
export default {
  data: function () {
    I18n.i18next.addResources("fr", "confirmTransaction", {
      message: "Merci d'avoir confirmé la transaction",
    });
    I18n.i18next.addResources("en", "confirmTransaction", {
      message: "Merci d'avoir confirmé la transaction",
    });
    return {
      loading: true,
    };
  },
  mounted: async function () {
    this.loading = true;
    await TransactionService.confirmWithToken(this.$route.params.token);
    this.loading = false;
  },
};
</script>
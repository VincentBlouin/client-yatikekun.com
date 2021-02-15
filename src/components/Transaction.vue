<template>
  <v-card>
    <v-card-text>
      <v-card width="100%">
        <v-card-text class="text-h6 font-weight-regular">
          <p>
            <span class="font-weight-bold">
              <span v-if="isOwner && !giver"> ... </span>
              <span v-if="isOwner && giver">
                {{ userOfTransaction.firstname }}
                {{ userOfTransaction.lastname }}
              </span>
              <span v-if="!isOwner">
                {{ $store.state.user.firstname }}
                {{ $store.state.user.lastname }}
              </span>
            </span>
            {{ $t("consult:receivedService") }}
            {{ $t("consult:performedService") }}
            <span class="font-weight-bold">
              {{ receiver.firstname }}
              {{ receiver.lastname }} </span
            >.
          </p>
          <p>
            {{ $t("consult:billedQuantity") }}
            <span class="font-weight-bold">
              {{ quantityFormatted }}
            </span>
          </p>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Transaction from "@/Transaction";
export default {
  components: {},
  props: ["giver", "receiver", "quantity"],
  async mounted() {},
  data: function () {
    I18n.i18next.addResources("fr", "transaction", {
      chooseUser: "L'autre usager dans la transaction",
      receivedService: "as reçu le service",
      performedService: "rendu par",
      billedQuantity: "La quantité de temps facturé est de",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      pendingTransaction: "Transaction en attente",
    });
    I18n.i18next.addResources("en", "transaction", {
      chooseUser: "L'autre usager dans la transaction",
      receivedService: "as reçu le service",
      performedService: "rendu par",
      billedQuantity: "La quantité de temps facturé est de",
      durationTitle: "Durée du service en heures et minutes",
      durationSubtitle: "En heures et minutes",
      pendingTransaction: "Transaction en attente",
    });
    return {};
  },
  methods: {},
  computed: {
    quantityFormatted: function () {
      return Transaction.quantityToFormatted(this.quantity);
    },
    isOwner: function () {
      return this.giver.uuid === this.$store.state.user.id;
    },
  },
};
</script>
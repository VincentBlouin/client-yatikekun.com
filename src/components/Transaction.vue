<template>
  <v-card :flat="flatCard">
    <v-card-text class="">
      <v-card width="100%" :flat="flatCard">
        <v-card-text class="text-h6 font-weight-regular">
          <p>
            <span class="font-weight-bold">
              <span class="font-weight-bold">
                {{ giver.firstname }}
                {{ giver.lastname }}
              </span>
            </span>
            {{ $t("transaction:performedService") }}
            <span class="font-weight-bold">
              <span v-if="receiver.uuid === giver.uuid"> ... </span>
              <span v-else>
                {{ receiver.firstname }}
                {{ receiver.lastname }}
              </span>
            </span>
          </p>
          <p>
            {{ $t("transaction:billedQuantity") }}
            <span class="font-weight-bold">
              {{ quantityFormatted }}
            </span>
          </p>
        </v-card-text>
        <v-card-actions class="pb-4 pt-0" v-if="!preventShowActions">
          <v-spacer></v-spacer>
          <v-btn
            class="ml-4"
            disabled
            v-if="initiator.uuid === $store.state.user.uuid"
          >
            {{ $t("transaction:pendingTransaction") }}
          </v-btn>
          <v-btn @click="confirm" color="primary" class="ml-4" v-else>
            {{ $t("confirm") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('close')"
            right
            class="mr-4"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            {{ $t("close") }}
          </v-btn>
          <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
        </v-card-actions>
        <v-card-actions v-if="$vuetify.breakpoint.smAndDown && !preventShowActions">
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" right class="mr-4">
            {{ $t("close") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Transaction from "@/Transaction";
export default {
  components: {},
  props: [
    "quantity",
    "giver",
    "receiver",
    "initiator",
    "flatCard",
    "preventShowActions",
  ],
  async mounted() {},
  data: function () {
    I18n.i18next.addResources("fr", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      pendingTransaction: "En attente de confirmation",
    });
    I18n.i18next.addResources("en", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      durationTitle: "Durée du service en heures et minutes",
      durationSubtitle: "En heures et minutes",
      pendingTransaction: "En attente de confirmation",
    });
    return {};
  },
  methods: {
    confirm: function () {},
  },
  computed: {
    quantityFormatted: function () {
      return Transaction.quantityToFormatted(this.quantity);
    },
  },
};
</script>
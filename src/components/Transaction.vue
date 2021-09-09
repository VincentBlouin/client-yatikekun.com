<template>
  <v-card :flat="flatCard">
    <v-card-text :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }"
    >
      <v-card width="100%" :flat="flatCard">
        <v-card-text class="text-h6 font-weight-regular">
          <p>
            <span class="font-weight-bold">
              <span class="font-weight-bold">
                <span v-if="giver === null">
                  ...
                </span>
                <span v-else>
                  {{ giver.firstname }}
                  {{ giver.lastname }}
                </span>
              </span>
            </span>
            {{ $t("transaction:performedService") }}
            <span class="font-weight-bold" v-if="!canAddManyUsers">
              <span v-if="receiver === null"> ... </span>
              <span v-else>
                {{ receiver.firstname }}
                {{ receiver.lastname }}
              </span>
            </span>
          </p>
          <p v-if="nbParticipants > 1">
            <span class="font-weight-bold">
              {{ nbParticipants }}
            </span>
            participants
          </p>
          <p v-if="nbParticipants > 1">
            {{ $t("transaction:serviceDuration") }}
            <span class="font-weight-bold">
              {{ serviceDurationFormatted }}
            </span>
            <br>
            <small class="font-italic">{{ $t("transaction:multiplied") }}</small>
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
              v-if="status === 'PENDING' && initiator.uuid === $store.state.user.uuid"
          >
            {{ $t("transaction:pendingTransaction") }}
          </v-btn>
          <v-btn
              @click="confirm"
              color="primary"
              class="ml-4"
              v-if="status === 'PENDING' && initiator.uuid !== $store.state.user.uuid"
              :loading="confirmLoading"
              :disabled="confirmLoading || hasConfirmed"
          >
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
        <v-card-actions
            v-if="$vuetify.breakpoint.smAndDown && !preventShowActions"
        >
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" right class="mr-4">
            {{ $t("close") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <v-snackbar v-model="confirmSuccess" color="primary" dark :timeout="7000">
      {{ $t("transaction:confirmed") }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            icon
            v-bind="attrs"
            @click="confirmSuccess = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Transaction from "@/Transaction";
import TransactionService from "@/service/TransactionService";

export default {
  components: {},
  props: [
    "quantity",
    "serviceDuration",
    "nbParticipants",
    "giver",
    "receiver",
    "initiator",
    "transactionId",
    "flatCard",
    "preventShowActions",
    "status",
    "canAddManyUsers"
  ],
  async mounted() {
  },
  data: function () {
    I18n.i18next.addResources("fr", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      serviceDuration: "La durée du service est de",
      nbParticipants: "Le nombre de participants est de",
      pendingTransaction: "En attente de confirmation",
      confirmed: "Merci d'avoir confirmé la transaction",
      multiplied: "Pour une activité de groupe, la durée du service est multiplié par 2"
    });
    I18n.i18next.addResources("en", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      serviceDuration: "La durée du service est de",
      nbParticipants: "Le nombre de participants est de",
      pendingTransaction: "En attente de confirmation",
      confirmed: "Merci d'avoir confirmé la transaction",
      multiplied: "Pour une activité de groupe, la durée du service est multiplié par 2"
    });
    return {
      hasConfirmed: false,
      confirmLoading: false,
      confirmSuccess: false,
    };
  },
  methods: {
    confirm: async function () {
      this.confirmLoading = true;
      await TransactionService.confirm(this.transactionId);
      this.confirmLoading = false;
      this.hasConfirmed = true;
      this.confirmSuccess = true;
    },
  },
  computed: {
    quantityFormatted: function () {
      return Transaction.quantityToFormatted(this.quantity);
    },
    serviceDurationFormatted: function () {
      return Transaction.quantityToFormatted(this.serviceDuration * 2);
    }
  },
};
</script>

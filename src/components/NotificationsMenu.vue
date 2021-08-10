<template>
  <v-menu
      bottom
      left
      nudge-bottom="50"
      v-if="$store.state.user !== null"
      max-width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="blueTitle" v-on="on" v-bind="attrs" @click="nbUnreadNotifications = ''">
        <v-badge
            :color="notificationsColor"
            :content="nbUnreadNotifications"
            :value="nbUnreadNotifications !== ''"
        >
          <v-icon :color="bellColor">
            notifications
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list subheader>
      <v-subheader class="vh-center">
        {{ $t('notification:pendingTransaction') }}
      </v-subheader>
      <div v-if="pendingTransactions.length === 0" class="vh-center grey--text">
        {{ $t('nones') }}
      </div>
      <v-list-item v-for="pendingTransaction in pendingTransactions" :key="pendingTransaction.id"
                   :to="'/transaction/' + pendingTransaction.id">
        <v-list-item-content>
          <v-list-item-title v-html="pendingTransaction.details">
          </v-list-item-title>
          <v-list-item-subtitle>
            <span v-if="pendingTransaction.GiverId !== $store.state.user.id">
              {{ pendingTransaction.giverFullname }}
            </span>
            <span v-if="pendingTransaction.ReceiverId !== $store.state.user.id">
              {{ pendingTransaction.receiverFullname }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import TransactionService from "@/service/TransactionService";
import I18n from "@/i18n";

export default {
  name: "NotificationsMenu",
  data: function () {
    I18n.i18next.addResources("en", "notification", {
      pendingTransaction: "Pending transactions"
    });
    I18n.i18next.addResources("fr", "notification", {
      pendingTransaction: "Transactions en attente"
    });
    return {
      pendingTransactions: [],
      showNotificationsMenu: false,
      notificationsColor: "blueTitle",
      nbUnreadNotifications: ""
    }
  },
  mounted: async function () {
    const pendingOffers = await TransactionService.getAllPendingOffers(
        this.$store.state.user.id
    );
    this.pendingTransactions = pendingOffers.map((transaction) => {
      if (transaction.giver) {
        transaction.giverFullname =
            transaction.giver.firstname + " " + transaction.giver.lastname;
      }
      transaction.receiverFullname = "";
      if (transaction.receiver) {
        transaction.receiverFullname =
            transaction.receiver.firstname +
            " " +
            transaction.receiver.lastname;
      }
      return transaction;
    });
    this.nbUnreadNotifications = this.pendingTransactions.length || "";
  },
  computed: {
    bellColor: function () {
      return this.nbUnreadNotifications === '' ? "blueTitle" : "blueTitle";
    }
  }

}
</script>

<style scoped>

</style>

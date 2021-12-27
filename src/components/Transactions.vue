<template>
  <div>
    <v-card flat class="pt-8">
      <v-card-title class="logo-font text-h4">
        {{ $t("transactions:title") }}
      </v-card-title>
      <v-btn
          v-if="isOrgFlow"
          fixed
          bottom
          fab
          :style="addStyle"
          color="primary"
          dark
          right
          x-large
          @click="newTransactionAsReceiver()"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-speed-dial
          v-else
          fixed
          bottom
          :style="addStyle"
          transition="scale-transition"
          direction="top"
          v-model="addBtn"
      >
        <template v-slot:activator>
          <v-btn
              color="primary"
              fab
              dark
              right
              x-large
          >
            <v-icon v-if="addBtn">close</v-icon>
            <v-icon v-else>add</v-icon>
          </v-btn>
        </template>
        <v-btn color="primary" rounded @click="newTransactionAsGiver()">
          {{ $t('transactions:serviceGiven1') }}
          <strong class="ml-1 mr-1">
            {{ $t('transactions:serviceGiven2') }}
          </strong>
          {{ $t('transactions:serviceGiven3') }}
        </v-btn>
        <v-btn color="primary" rounded class="mb-4" @click="newTransactionAsReceiver()">
          {{ $t('transactions:serviceReceived1') }}
          <strong class="ml-1 mr-1">
            {{ $t('transactions:serviceReceived2') }}
          </strong>
          {{ $t('transactions:serviceReceived3') }}
        </v-btn>
      </v-speed-dial>
      <v-simple-table v-if="transactions.length > 0">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              {{ $t("transactions:details") }}
            </th>
            <th class="text-left">{{ $t("transactions:gave") }}</th>
            <th class="text-left">{{ $t("transactions:received") }}</th>
            <th class="text-left">{{ $t("transactions:amount") }}</th>
            <th class="text-left">
              {{ $t("transactions:status") }}
            </th>
            <th class="text-left">{{ $t("transactions:balance") }}</th>
            <th class="text-left" v-if="$store.state.user.status === 'admin'"></th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(transaction, index) in transactions"
              :key="transaction.id"
              class="text-left cursor-hand"
              @click="$router.push('/transaction/' + transaction.id)"
          >
            <td>
              {{ transaction.formattedDate }}
            </td>
            <td v-html="transaction.details">
            </td>
            <td
                :class="{
                    'font-weight-bold':
                      transaction.GiverId === entityId,
                  }"
            >
              {{ transaction.giverFullname }}
            </td>
            <td
                :class="{
                    'font-weight-bold':
                      transaction.ReceiverId === entityId,
                  }"
            >
              {{ transaction.receiverFullname }}
            </td>
            <td>{{ transaction.amountFormatted }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" :color="transaction.statusIconColor">
                    {{ transaction.statusIcon }}
                  </v-icon>
                </template>
                <span>{{ transaction.statusName }}</span>
              </v-tooltip>
            </td>
            <td>
              <span v-if="transaction.status === 'CONFIRMED'">
                {{ transaction.balanceFormatted }}
              </span>
            </td>
            <td v-if="$store.state.user.status === 'admin' && index !== transactions.length - 1">
              <v-icon @click.stop="removeTransaction(transaction.id)">delete</v-icon>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-title v-else class="text-center font-italic vh-center">
        {{ $t("transactions:noTransactions") }}
      </v-card-title>
    </v-card>
    <NewTransaction ref="newTransaction"
                    :giverInit="isGiverFlow ? this.$store.state.user: null"
                    :receiverInit="isGiverFlow ? null : this.$store.state.user"
                    :receiverOrgInit="isOrgFlow ? organisation : null"
                    :hideNbParticipants="isOrgFlow"
                    :hideBonus="isOrgFlow"
                    @transactionAdded="setupData"
                    v-if="!isAllFlow"
    ></NewTransaction>
    <v-dialog v-model="confirmRemoveTransactionDialog" width="650">
      <v-card>
        <v-card-title>
          {{ $t('transactions:confirmDelete') }}
          <v-spacer></v-spacer>
          <v-icon @click="confirmRemoveTransactionDialog = false">close</v-icon>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="confirmRemoveTransaction">
            <v-icon left>delete</v-icon>
            {{ $t('confirm') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="confirmRemoveTransactionDialog = false">{{ $t('close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import I18n from "@/i18n";
import TransactionService from "@/service/TransactionService";
import {format} from 'date-fns'
import {fr} from 'date-fns/locale'
import Transaction from "@/Transaction";

export default {
  components: {
    NewTransaction: () => import("@/components/NewTransaction"),
  },
  props: {
    organisation: {
      type: Object,
      default: null
    },
    isAllFlow: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.addStyle = this.$vuetify.breakpoint.mdAndUp ? "left:72%" : "left:40%";
    await this.setupData();
  },
  data: function () {
    I18n.i18next.addResources("fr", "transactions", {
      title: "Transactions",
      details: "Détails",
      initial: "Montant initial",
      gave: "A rendu",
      received: "A reçu",
      amount: "Montant",
      balance: "Balance",
      status: "Statut",
      confirmed: "Confirmée",
      pending: "En attente",
      refused: "Annulée",
      serviceReceived1: "Vous avez",
      serviceReceived2: "reçu",
      serviceReceived3: "un service",
      serviceGiven1: "Vous avez ",
      serviceGiven2: "rendu",
      serviceGiven3: "un service",
      confirmDelete: "Voulez-vous vraiment supprimer cette transaction ?",
      noTransactions: "Pas de transactions"
    });
    I18n.i18next.addResources("en", "transactions", {
      title: "Transactions",
      details: "Détails",
      initial: "Montant initial",
      gave: "A rendu",
      received: "A reçu",
      amount: "Montant",
      balance: "Balance",
      status: "Statut",
      confirmed: "Confirmée",
      pending: "En attente",
      refused: "Annulée",
      serviceReceived1: "You",
      serviceReceived2: "received",
      serviceReceived3: "a service",
      serviceGiven1: "You",
      serviceGiven2: "gave",
      serviceGiven3: "a service",
      confirmDelete: "Voulez-vous vraiment supprimer cette transaction ?",
      noTransactions: "Pas de transactions"
    });
    return {
      transactions: [],
      newTransactionOffer: {},
      addStyle: "",
      addBtn: false,
      receiverCustom: null,
      isGiverFlow: false,
      confirmRemoveTransactionDialog: false,
      transactionIdToRemove: null
    };
  },
  methods: {
    newTransactionAsGiver: function () {
      this.isGiverFlow = true;
      this.$refs.newTransaction.enter();
    },
    newTransactionAsReceiver: function () {
      this.isGiverFlow = false;
      this.$refs.newTransaction.enter();
    },
    setupData: async function () {
      this.isLoading = true;
      let response;
      if (this.isAllFlow) {
        response = await TransactionService.listAll();
      } else if (this.isOrgFlow) {
        response = await TransactionService.listForOrgId(
            this.organisation.id
        )
      } else {
        response = await TransactionService.listForUserId(
            this.$store.state.user.id
        );
      }
      this.transactions = response.data
          .map((transaction) => {
            if (transaction.details === "initial") {
              transaction.details = this.$t("transactions:initial");
            }
            transaction.formattedDate = format(
                new Date(transaction.createdAt),
                'd MMMM yyyy',
                {
                  locale: fr
                } // Pass the locale as an option
            )
            ;
            transaction.statusName = this.$t(
                "transactions:" + transaction.status.toLowerCase()
            );
            if (transaction.status.toLowerCase() === "confirmed") {
              transaction.statusIcon = "done";
              transaction.statusIconColor = "primary";
            } else if (transaction.status.toLowerCase() === "pending") {
              transaction.statusIcon = "pending";
              transaction.statusIconColor = "primary";
            } else if (transaction.status.toLowerCase() === "refused") {
              transaction.statusIcon = "do_not_disturb_on";
              transaction.statusIconColor = "error";
            }
            transaction.balance = Transaction.balance(transaction, this.entityId, this.isOrgFlow);
            transaction.giverFullname = Transaction.giverFullname(transaction);
            transaction.receiverFullname = Transaction.receiverFullname(transaction);
            transaction.amountFormatted = Transaction.quantityToFormatted(transaction.amount);
            transaction.balanceFormatted = Transaction.quantityToFormatted(transaction.balance);
            return transaction;
          })
          .sort((a, b) => {
            // console.log("a " + a.details + " " + a.createdAt + " " + new Date(a.createdAt).getTime() + " " + a.confirmDate);
            // console.log("b " + b.details + " " + b.createdAt + " " + new Date(b.createdAt).getTime() + " " + b.confirmDate);
            let aConfirmDate;
            if (a.confirmDate !== null) {
              aConfirmDate = new Date(a.confirmDate).getTime();
            }
            const aDate =
                aConfirmDate === undefined
                    ? new Date(a.createdAt).getTime()
                    : aConfirmDate;
            let bConfirmDate;
            if (b.confirmDate !== null) {
              bConfirmDate = new Date(b.confirmDate).getTime();
            }
            const bDate =
                bConfirmDate === undefined
                    ? new Date(b.createdAt).getTime()
                    : bConfirmDate;
            return bDate - aDate;
          });
      this.isLoading = false;
    },
    removeTransaction: function (transactionId) {
      this.confirmRemoveTransactionDialog = true;
      this.transactionIdToRemove = transactionId;
    },
    confirmRemoveTransaction: async function () {
      await TransactionService.removeTransaction(this.transactionIdToRemove);
      this.confirmRemoveTransactionDialog = false;
      await this.setupData();
    }
  },
  computed: {
    isOrgFlow: function () {
      return this.organisation !== null;
    },
    entityId: function () {
      return this.isOrgFlow ? this.organisation.id : this.$store.state.user.id;
    }
  }
};
</script>

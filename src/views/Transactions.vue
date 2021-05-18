<template>
  <Page>
    <v-card flat class="pt-8">
      <v-card-title>
        {{ $t("transactions:title") }}
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              {{ $t("transactions:details") }}
            </th>
            <th class="text-left">
              Date
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
              class="text-left"
          >
            <td>
              {{ transaction.details }}
            </td>
            <td>
              {{ transaction.formattedDate }}
            </td>
            <td
                :class="{
                    'font-weight-bold':
                      transaction.GiverId === $store.state.user.id,
                  }"
            >
              {{ transaction.giverFullname }}
            </td>
            <td
                :class="{
                    'font-weight-bold':
                      transaction.ReceiverId === $store.state.user.id,
                  }"
            >
              {{ transaction.receiverFullname }}
            </td>
            <td>{{ transaction.amount }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="primary">
                    {{ transaction.statusIcon }}
                  </v-icon>
                </template>
                <span>{{ transaction.statusName }}</span>
              </v-tooltip>
            </td>
            <td>{{ transaction.balance }}</td>
            <td v-if="$store.state.user.status === 'admin' && index !== transactions.length - 1">
              <v-icon @click="removeTransaction(transaction.id)">delete</v-icon>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </Page>
</template>
<script>
import I18n from "@/i18n";
import TransactionService from "@/service/TransactionService";
import {format} from 'date-fns'
import {fr} from 'date-fns/locale'

export default {
  components: {
    Page: () => import('@/components/Page')
  },
  async mounted() {
    window.scrollTo(0, 0);
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
    });
    return {
      transactions: [],
    };
  },
  methods: {
    setupData: async function () {
      this.isLoading = true;
      let response = await TransactionService.listForUserId(
          this.$store.state.user.id
      );
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
            } else if (transaction.status.toLowerCase() === "pending") {
              transaction.statusIcon = "pending";
            }
            transaction.balance =
                transaction.GiverId !== null &&
                transaction.GiverId === this.$store.state.user.id
                    ? transaction.balanceGiver
                    : transaction.balanceReceiver;
            transaction.giverFullname = "";
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
    removeTransaction: async function (transactionId) {
      await TransactionService.removeTransaction(transactionId);
      await this.setupData();
    }
  }
};
</script>

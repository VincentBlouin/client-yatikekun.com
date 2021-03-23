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
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="transaction in transactions"
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
              'dd MMMM yyyy',
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
          const aDate =
              a.confirmDate === null
                  ? new Date(a.createdAt).getTime()
                  : a.confirmDate;
          const bDate =
              b.confirmDate === null
                  ? new Date(b.createdAt).getTime()
                  : b.confirmDate;
          return bDate - aDate;
        });
    this.isLoading = false;
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
};
</script>

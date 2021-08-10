<template>
  <v-dialog
      v-model="dialog"
      v-if="dialog"
      width="700"
      :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-form ref="newTransactionForm">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="!hasConfirmed">
          <v-text-field v-model="details"
                        :placeholder="$t('newTransaction:detailsPlaceholder')"
                        :rules="[Rules.required]"
                        required
          ></v-text-field>
        </v-card-text>
        <v-card-text
            class="text-body-1 vh-center"
            v-if="isChooseAnotherUserFlow && !hasConfirmed"
        >
          <v-autocomplete
              :items="members"
              :filter="membersFilter"
              item-text="fullname"
              v-model="userOfTransaction"
              :label="$t('newTransaction:chooseUser')"
              class="members-autocomplete"
              :menu-props="membersAutocompleteMenuProps"
              return-object
              :no-data-text="$t('noSearchResults')"
          ></v-autocomplete>
        </v-card-text>
        <v-card-text v-if="!hasConfirmed">
          <v-card>
            <v-card-title class="vh-center">
              {{ $t("newTransaction:durationTitle") }}
            </v-card-title>
            <v-card-subtitle>
              {{ $t("newTransaction:durationSubtitle") }}
            </v-card-subtitle>
            <v-card-text>
              <v-time-picker
                  format="24hr"
                  :allowed-minutes="allowedMinutes"
                  v-model="timePickerQuantity"
              ></v-time-picker>
            </v-card-text>
          </v-card>
        </v-card-text>
        <Transaction
            :quantity="quantity"
            :giver="giver"
            :receiver="receiver"
            :initiator="$store.state.user"
            :preventShowActions="true"
            status="PENDING"
        ></Transaction>
        <v-scale-transition>
          <v-alert
              v-if="showConfirmMessage"
              type="success"
              icon="email"
              color="primary"
              class="body-1"
          >
            {{ $t("newTransaction:confirmed1") }}
            {{ otherUser.firstname }} {{ otherUser.lastname }}
            {{ $t("newTransaction:confirmed2") }}.
            {{ otherUser.firstname }}
            {{ $t("newTransaction:confirmed3") }}.
          </v-alert>
        </v-scale-transition>
        <v-card-actions>
          <v-btn
              color="primary"
              @click="addTransaction"
              :disabled="
            (isChooseAnotherUserFlow && userOfTransaction === null) ||
            timePickerQuantity === '00:00' ||
            confirmLoading ||
            hasConfirmed
          "
              :loading="confirmLoading"
          >
            {{ $t("confirm") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
          <span v-if="hasConfirmed">
            {{ $t("finish") }}
          </span>
            <span v-else>
            {{ $t("cancel") }}
          </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import I18n from "@/i18n";
import MemberService from "@/service/MemberService";
import Transaction from "@/Transaction";
import TransactionService from "@/service/TransactionService";
import Rules from "@/Rules";

export default {
  components: {
    Transaction: () => import("@/components/Transaction"),
  },
  props: {
    offerId: Number,
    detailsInit: {
      type: String,
      default: ""
    },
    receiverInit: {
      type: Object,
      default: null
    },
    giverInit: {
      type: Object,
      default: null
    }
  },
  async mounted() {
  },
  data: function () {
    I18n.i18next.addResources("fr", "newTransaction", {
      chooseUser: "L'autre usager dans la transaction",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      confirmed1: "Un courriel a été envoyé à",
      confirmed2: "pour qu'il/elle confirme la transaction",
      confirmed3: "peut aussi confirmer la transaction en visitant l'offre",
      detailsPlaceholder: "Détails"
    });
    I18n.i18next.addResources("en", "newTransaction", {
      chooseUser: "L'autre usager dans la transaction",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      confirmed1: "Un courriel a été envoyé à",
      confirmed2: "pour qu'il/elle confirme la transaction",
      confirmed3: "peut aussi confirmer la transaction en visitant l'offre",
      detailsPlaceholder: "Details"
    });
    return {
      Rules: Rules,
      dialog: false,
      userOfTransaction: null,
      confirmLoading: false,
      hasConfirmed: false,
      isChooseAnotherUserFlow: false,
      showConfirmMessage: false,
      members: [],
      details: "",
      timePickerQuantity: "00:00",
      allowedMinutes: [0, 15, 30, 45],
      allowedHours: [0, 1, 2, 3, 4, 5, 6],
      membersAutocompleteMenuProps: {
        "content-class": "text-left",
      },
    };
  },
  methods: {
    enter: async function () {
      this.timePickerQuantity = "00:00";
      this.userOfTransaction = null;
      this.confirmLoading = false;
      this.hasConfirmed = false;
      this.showConfirmMessage = false;
      this.details = this.detailsInit;
      this.isChooseAnotherUserFlow = this.giverInit === null || this.receiverInit === null;
      if (this.isChooseAnotherUserFlow) {
        const response = await MemberService.list();
        this.members = response.data.filter((member) => {
          return member.status !== 'disabled' && member.uuid !== "30b2c42a-96b2-48b2-b21c-534ab5e613aa";
        }).map((member) => {
          member.fullname = member.firstname + " " + member.lastname;
          member.disabled = member.uuid === this.$store.state.user.uuid;
          return member;
        });
      }
      this.dialog = true;
    },
    addTransaction: async function () {
      if (!this.$refs.newTransactionForm.validate()) {
        this.$refs.newTransactionForm.$el.scrollIntoView({behavior: 'smooth'})
        return;
      }
      this.confirmLoading = true;
      await TransactionService.add({
        amount: this.quantity,
        details: this.details,
        InitiatorId: this.$store.state.user.id,
        GiverUuid: this.giver.uuid,
        ReceiverUuid: this.receiver.uuid,
        OfferId: this.offerId,
      });
      this.confirmLoading = false;
      this.hasConfirmed = true;
      await this.$nextTick();
      this.showConfirmMessage = true;
      this.$emit('transactionAdded');
    },
    membersFilter: function (member, queryText) {
      const firstname = member.firstname.toLowerCase();
      const lastname = member.lastname.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
          firstname.indexOf(searchText) > -1 || lastname.indexOf(searchText) > -1
      );
    },
  },
  computed: {
    quantity: function () {
      return Transaction.timePickerToQuantity(this.timePickerQuantity);
    },
    giver: function () {
      return this.giverInit === null ? this.userOfTransaction : this.giverInit;
    },
    receiver: function () {
      return this.receiverInit === null ? this.userOfTransaction : this.receiverInit;
    },
    otherUser: function () {
      if (this.giver === null) {
        return this.receiver;
      }
      if (this.receiver === null) {
        return this.giver;
      }
      return this.receiver.uuid === this.$store.state.user.uuid
          ? this.giver
          : this.receiver;
    },
  },
};
</script>
<style>
.v-menu__content {
  text-align: left;
}

.v-time-picker-title__ampm {
  visibility: hidden;
}

.v-time-picker-clock__ampm .v-picker__title__btn {
  visibility: hidden;
}

.v-time-picker-clock__inner :nth-child(n + 14) {
  display: none;
}
</style>

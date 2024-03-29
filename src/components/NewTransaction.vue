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
        <v-card-text v-if="!hasConfirmed && !hideNbParticipants">
          <v-card>
            <v-card-title class="subtitle-2 grey--text font-weight-regular">
              {{ $t('newTransaction:groupActivity') }}
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="nbParticipants"
                            :label="$t('newTransaction:nbParticipants')"
                            :hint="$t('newTransaction:nbParticipantsHint')"
                            :rules="[Rules.required, Rules.min1]"
                            required
                            type="number"
                            min="1"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-text
            class="text-body-1 vh-center"
            v-if="isChooseAnotherUserFlow && !hasConfirmed"
        >
          <v-autocomplete
              :items="members"
              :filter="membersFilter"
              item-text="fullname"
              v-model="usersOfTransaction"
              :label="$t('newTransaction:chooseManyUsers')"
              class="members-autocomplete"
              :menu-props="membersAutocompleteMenuProps"
              return-object
              :no-data-text="$t('noSearchResults')"
              v-if="canAddManyUsers"
              chips
              multiple
          ></v-autocomplete>
          <v-autocomplete
              v-else
              :items="members"
              :filter="membersFilter"
              item-text="fullname"
              v-model="userOfTransaction"
              :label="$t('newTransaction:chooseUser')"
              class="members-autocomplete"
              :menu-props="membersAutocompleteMenuProps"
              return-object
              :no-data-text="$t('noSearchResults')"
              @change="changeOtherUser()"
          ></v-autocomplete>
        </v-card-text>
        <v-card-text v-if="suggestedOffers.length > 0 && !isSpecificOfferFlow" :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }">
          <v-slide-group
              show-arrows
              v-model="selectedOffer"
          >
            <v-slide-item
                v-for="(suggestedOffer) in suggestedOffers"
                :key="suggestedOffer.id"
            >
              <OfferCard :offer="suggestedOffer" width="300" :dense="true" :customAction="true"
                         @customAction="chooseOffer(suggestedOffer)"></OfferCard>
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
        <v-card-text v-if="!hasConfirmed">
          <v-text-field v-model="details"
                        :label="$t('newTransaction:detailsPlaceholder')"
                        :rules="[Rules.required]"
                        required
          ></v-text-field>
        </v-card-text>
        <v-card-text v-if="!hasConfirmed" :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }">

          <v-card>
            <v-card-title class="vh-center">
              {{ $t("newTransaction:durationTitle") }}
            </v-card-title>
            <v-card-subtitle>
              {{ $t("newTransaction:durationSubtitle") }}
            </v-card-subtitle>
            <v-card-text class="vh-center">
              <v-time-picker
                  format="24hr"
                  :allowed-minutes="allowedMinutes"
                  v-model="timePickerQuantity"
              ></v-time-picker>
            </v-card-text>
          </v-card>
        </v-card-text>
        <TransactionComponent
            :quantity="billedQuantity"
            :nbParticipants="nbParticipants"
            :serviceDuration="quantity"
            :giver="giver"
            :receiver="receiver"
            :initiator="$store.state.user"
            :canAddManyUsers="canAddManyUsers"
            :preventShowActions="true"
            :giverOrganisationId="giverOrganisationId"
            :receiverDonationOrgId="receiverOrganisationId"
            status="PENDING"
            @selectOrganisation="chooseOrganisation"
        ></TransactionComponent>
        <v-scale-transition>
          <v-alert
              v-if="showConfirmMessage && !canAddManyUsers"
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
          <v-alert
              v-if="showConfirmMessage && canAddManyUsers"
              type="success"
              icon="email"
              color="primary"
              class="body-1"
          >
            {{ $t("newTransaction:emailSentToMany") }}
          </v-alert>
        </v-scale-transition>
        <v-card-actions>
          <v-btn
              color="primary"
              @click="confirm"
              :disabled="
            (isChooseAnotherUserFlow && userOfTransaction === null && !canAddManyUsers) ||
            (isChooseAnotherUserFlow && usersOfTransaction.length === 0 && canAddManyUsers) ||
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
import OfferService from "@/offer/OfferService";
import OfferCard from "@/views/OfferCard";
import Offer from "@/offer/Offer"

const FACEBOOK_TEST_USER_UUID = "30b2c42a-96b2-48b2-b21c-534ab5e613aa";

export default {
  components: {
    OfferCard,
    TransactionComponent: () => import("@/components/TransactionComponent"),
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
    receiverOrgInit: {
      type: Object,
      default: null
    },
    giverInit: {
      type: Object,
      default: null
    },
    hideNbParticipants: {
      type: Boolean,
      default: false
    },
    hideBonus: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
  },
  data: function () {
    I18n.i18next.addResources("fr", "newTransaction", {
      chooseUser: "L'autre usager dans la transaction",
      chooseManyUsers: "Les autres usagers dans la transaction",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      confirmed1: "Un courriel a été envoyé à",
      confirmed2: "pour qu'il/elle confirme la transaction",
      confirmed3: "peut aussi confirmer la transaction en visitant l'offre",
      detailsPlaceholder: "Détails",
      groupActivity: "Pour une activité de groupe",
      nbParticipants: "Nombre de participants total",
      nbParticipantsHint: "",
      emailSentToMany: "Un courriel a été envoyé aux participants pour qu'ils puissent confirmer la transaction"
    });
    I18n.i18next.addResources("en", "newTransaction", {
      chooseUser: "L'autre usager dans la transaction",
      chooseManyUsers: "Les autres usagers dans la transaction",
      durationTitle: "Durée du service",
      durationSubtitle: "En heures et minutes",
      confirmed1: "Un courriel a été envoyé à",
      confirmed2: "pour qu'il/elle confirme la transaction",
      confirmed3: "peut aussi confirmer la transaction en visitant l'offre",
      detailsPlaceholder: "Details",
      groupActivity: "Pour une activité de groupe",
      nbParticipants: "Nombre de participants total",
      nbParticipantsHint: "",
      emailSentToMany: "Un courriel a été envoyé aux participants pour qu'ils puissent confirmer la transaction",
      organisation: "Organisation pour don bonus de 10 min/heure",
      organisationHint: "Don bonus de 10 min/heure"
    });
    return {
      Rules: Rules,
      dialog: false,
      userOfTransaction: null,
      usersOfTransaction: [],
      confirmLoading: false,
      hasConfirmed: false,
      isChooseAnotherUserFlow: false,
      showConfirmMessage: false,
      members: [],
      details: "",
      timePickerQuantity: "00:00",
      allowedMinutes: [0, 15, 30, 45],
      allowedHours: [0, 1, 2, 3, 4, 5, 6],
      suggestedOffers: [],
      selectedOffer: null,
      selectedOrganisation: {},
      isGiverFlow: null,
      isSpecificOfferFlow: false,
      isGroupActivity: false,
      nbParticipants: 1,
      membersAutocompleteMenuProps: {
        "content-class": "text-left",
      },
      giverOrganisationId: null,
      receiverOrganisationId: null
    };
  },
  methods: {
    chooseOrganisation: function (organisation) {
      this.selectedOrganisation = organisation;
    },
    chooseOffer: function (offer) {
      this.details = offer.title_fr;
    },
    changeOtherUser: function () {
      if (this.isGiverFlow) {
        return;
      }
      this.updateSuggestedDetails(this.userOfTransaction);
    },
    updateSuggestedDetails: async function (user) {
      const response = await OfferService.listAvailableForUserUuid(user.uuid);
      this.suggestedOffers = response.data.map((offer) => {
        offer.User = user
        Offer.format(offer);
        return offer;
      })
    },
    enter: async function () {
      this.nbParticipants = 1;
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
          return member.status !== 'disabled' && member.uuid !== FACEBOOK_TEST_USER_UUID;
        }).map((member) => {
          member.fullname = member.firstname + " " + member.lastname;
          member.disabled = member.uuid === this.$store.state.user.uuid;
          return member;
        });
      }
      this.isGiverFlow = this.giverInit !== null && this.giverInit.uuid === this.$store.state.user.uuid;
      if (this.isGiverFlow) {
        await this.updateSuggestedDetails(this.$store.state.user);
      } else {
        this.suggestedOffers = [];
      }
      this.isSpecificOfferFlow = this.offerId !== undefined && this.offerId !== null;
      this.dialog = true;
    },
    confirm: async function () {
      if (!this.$refs.newTransactionForm.validate()) {
        this.$refs.newTransactionForm.$el.scrollIntoView({behavior: 'smooth'})
        return;
      }
      this.confirmLoading = true;
      if (this.canAddManyUsers) {
        await this.addTransactions();
      } else {
        await this.addTransaction();
      }
      this.confirmLoading = false;
      this.hasConfirmed = true;
      await this.$nextTick();
      if (this.isGiverFlow) {
        this.giverOrganisationId = this.selectedOrganisation.id;
      } else {
        this.receiverOrganisationId = this.selectedOrganisation.id;
      }
      if (this.receiverOrgInit === null) {
        this.showConfirmMessage = true;
      }
      await this.$emit('transactionAdded');
      if (this.receiverOrgInit !== null) {
        this.dialog = false;
      }
    },
    addTransaction: async function () {
      await TransactionService.add({
        amount: this.billedQuantity,
        serviceDuration: this.quantity,
        nbParticipants: this.nbParticipants,
        details: this.details,
        InitiatorId: this.$store.state.user.id,
        InitiatorOrgId: this.receiverOrgInit === null ? null : this.receiverOrgInit.id,
        GiverUuid: this.giver.uuid,
        ReceiverUuid: this.receiverOrgInit === null ? this.receiver.uuid : null,
        ReceiverOrgId: this.receiverOrgInit === null ? null : this.receiverOrgInit.id,
        OfferId: this.offerId,
        organisationId: this.selectedOrganisation.id
      });
    },
    addTransactions: function () {
      return Promise.all(this.usersOfTransaction.map((userOfTransaction) => {
        return TransactionService.add({
          amount: this.billedQuantity,
          serviceDuration: this.quantity,
          nbParticipants: this.nbParticipants,
          details: this.details,
          InitiatorId: this.$store.state.user.id,
          GiverUuid: this.$store.state.user.uuid,
          ReceiverUuid: userOfTransaction.uuid,
          OfferId: this.offerId,
        });
      }));
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
    canAddManyUsers: function () {
      return this.isGiverFlow && this.nbParticipants > 1;
    },
    quantity: function () {
      return Transaction.timePickerToQuantity(this.timePickerQuantity);
    },
    billedQuantity: function () {
      const quantity = this.nbParticipants > 1 ? this.quantity * 2 : this.quantity;
      const quantityByParticipant = quantity / this.nbParticipants;
      return quantityByParticipant === 0 ? 0 : parseFloat(quantityByParticipant.toFixed(2));
    },
    giver: function () {
      return this.giverInit === null ? this.userOfTransaction : this.giverInit;
    },
    receiver: function () {
      if (this.receiverOrgInit === null) {
        return this.receiverInit === null ? this.userOfTransaction : this.receiverInit;
      }
      return this.receiverOrgInit;
    },
    otherUser: function () {
      if (this.giver === null) {
        return this.receiver;
      }
      if (this.receiver === null) {
        return this.giver;
      }
      if (this.receiverOrgInit) {
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

<template>
  <v-card :flat="flatCard" v-if="!isLoading">
    <v-card-text :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }"
    >
      <v-card width="100%" :flat="flatCard">
        <v-card-text class="text-h6 font-weight-regular pb-0">
          <p>
            <span class="font-weight-bold">
              <span class="font-weight-bold">
                <span v-if="giver === null">
                  ...
                </span>
                <span v-else>
                  {{ giverName }}
                </span>
              </span>
            </span>
            {{ $t("transaction:performedService") }}
            <span class="font-weight-bold" v-if="!canAddManyUsers">
              <span v-if="receiver === null"> ... </span>
              <span v-else>
                {{ receiverName }}
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
        <v-card-text class="pt-0" v-if="!hasConfirmed && !doesTransactionInvolveOrg">
          <v-select
              :loading="isSelectOrgLoading"
              v-model="selectedOrganisation.id"
              :items="organisations"
              item-text="name"
              item-value="id"
              :label="$t('transaction:organisation')"
              persistent-hint
              :hint="$t('transaction:organisationHint')"
              clearable
              @change="selectOrganisation"
              :disabled="(this.isGiver && this.giverDonationOrgId !== null) || (this.isReceiver && this.receiverDonationOrgId !== null)"
          >
            <template v-slot:item="{item}">
              <img :src="item.customImageUrl" v-if="item.customImage" width="100" class="mr-6">
              <v-list-item-content>
                <v-list-item-title class="text-h6 font-weight-regular">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions class="pb-4 mt-4" v-if="!preventShowActions">
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
              :disabled="confirmLoading || hasConfirmed || isSelectOrgLoading"
          >
            {{ $t("confirm") }}
          </v-btn>
          <v-btn v-if="status === 'CONFIRMED'" outlined color="primary" style="cursor: default;" active-class="">
            <v-icon left>done</v-icon>
            {{ $t("transaction:confirmed") }}
          </v-btn>
          <!--          <v-alert v-if="status === 'REFUSED'" dense outlined class="body-1">-->
          <!--            <v-icon left>do_not_disturb_on</v-icon>-->
          <!--              {{ $t("transaction:refused") }}-->
          <!--          </v-alert>-->
          <v-btn v-if="status === 'REFUSED'" outlined color="error" style="cursor: default;" active-class="">
            <v-icon left>do_not_disturb_on</v-icon>
            {{ $t("transaction:refused") }}
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
          <v-btn @click="$emit('close')" right class="">
            {{ $t("close") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions v-if="!hasConfirmed && !preventShowActions && status === 'PENDING'" class="mt-2">
          <v-spacer></v-spacer>
          <v-btn error class="error" @click="refuseConfirmDialog=true" small :disabled="isSelectOrgLoading">
            {{ $t('transaction:cancelTransaction') }}
          </v-btn>
          <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <v-snackbar v-model="confirmSuccess" color="primary" dark :timeout="7000">
      {{ $t("transaction:confirmedThanks") }}
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
    <v-dialog v-model="refuseConfirmDialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ $t('transaction:refuseOffer') }}
          <v-spacer></v-spacer>
          <v-btn icon @click="refuseConfirmDialog=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="refuseConfirm()">
            {{ $t('transaction:cancelTransaction') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="refuseConfirmDialog=false">
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Transaction from "@/Transaction";
import TransactionService from "@/service/TransactionService";
import OrganisationService from "@/service/OrganisationService";
import Images from "@/Images";

export default {
  components: {},
  props: {
    quantity: Number,
    serviceDuration: Number,
    nbParticipants: Number,
    giver: Object,
    receiver: Object,
    initiator: Object,
    transactionId: Number,
    flatCard: Boolean,
    preventShowActions: Boolean,
    status: String,
    canAddManyUsers: Boolean,
    giverDonationOrgId: {
      type: Number,
      default: null
    },
    receiverDonationOrgId: {
      type: Number,
      default: null
    }
  },
  async mounted() {
    this.isLoading = true;
    let response = await OrganisationService.listActiveForTransactions();
    this.organisations = response.data.map((organisation) => {
      organisation.customImageUrl = Images.getCustomBase64Url(organisation.customImage);
      return organisation;
    });
    let selectedOrganisationId;
    if (this.isGiver && this.giverDonationOrgId) {
      selectedOrganisationId = this.giverDonationOrgId;
    }
    if (this.isReceiver && this.receiverDonationOrgId) {
      selectedOrganisationId = this.receiverDonationOrgId;
    }
    if (selectedOrganisationId) {
      this.selectedOrganisation = this.organisations.filter((organisation) => {
        return organisation.id === selectedOrganisationId;
      })[0];
    }
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      serviceDuration: "La durée du service est de",
      nbParticipants: "Le nombre de participants est de",
      pendingTransaction: "En attente de confirmation",
      confirmedThanks: "Merci d'avoir confirmé la transaction",
      confirmed: "Confirmé",
      multiplied: "Pour une activité de groupe, la durée du service est multiplié par 2",
      cancelTransaction: "Refuser",
      refused: "Refusé",
      refuseOffer: "Refuser la transaction",
      organisation: "Organisation",
      organisationHint: "Obtenez un bonus de 10 minutes par heure à donner à l'organisation de votre choix"
    });
    I18n.i18next.addResources("en", "transaction", {
      performedService: "a rendu le service à",
      billedQuantity: "La quantité de temps facturé est de",
      serviceDuration: "La durée du service est de",
      nbParticipants: "Le nombre de participants est de",
      pendingTransaction: "En attente de confirmation",
      confirmedThanks: "Merci d'avoir confirmé la transaction",
      confirmed: "Confirmé",
      multiplied: "Pour une activité de groupe, la durée du service est multiplié par 2",
      cancelTransaction: "Refuser",
      refused: "Refusé",
      refuseOffer: "Refuser la transaction",
      organisation: "Organisation",
      organisationHint: "Obtenez un bonus de 10 minutes par heure à donner à l'organisation de votre choix"
    });
    return {
      hasConfirmed: false,
      confirmLoading: false,
      confirmSuccess: false,
      isSelectOrgLoading: false,
      refuseConfirmDialog: false,
      refuseLoading: false,
      organisations: true,
      selectedOrganisation: {},
      isLoading: true
    };
  },
  methods: {
    selectOrganisation: async function () {
      this.isSelectOrgLoading = true;
      if (this.initiator.uuid !== this.$store.state.user.uuid) {
        if (this.isGiver) {
          await TransactionService.setGiverOrgId(
              this.transactionId,
              this.selectedOrganisation.id
          );
        } else if (this.isReceiver) {
          await TransactionService.setReceiverOrgId(
              this.transactionId,
              this.selectedOrganisation.id
          );
        }
      }
      await this.$emit('selectOrganisation', this.selectedOrganisation);
      this.isSelectOrgLoading = false;
    },
    refuseConfirm: async function () {
      this.refuseLoading = true;
      await TransactionService.refuse(this.transactionId);
      this.refuseLoading = false;
      this.refuseConfirmDialog = false;
      this.status = "REFUSED";
    },
    confirm: async function () {
      this.confirmLoading = true;
      await TransactionService.confirm(this.transactionId);
      this.confirmLoading = false;
      this.hasConfirmed = true;
      this.confirmSuccess = true;
    },
    entityName: function (entity) {
      return entity.name ?
          entity.name :
          entity.firstname + " " + entity.lastname;
    }
  },
  computed: {
    quantityFormatted: function () {
      return Transaction.quantityToFormatted(this.quantity);
    },
    serviceDurationFormatted: function () {
      return Transaction.quantityToFormatted(this.serviceDuration * 2);
    },
    isGiver: function () {
      return this.$store.state.user !== null && this.giver !== null && this.$store.state.user.uuid === this.giver.uuid;
    },
    isReceiver: function () {
      return this.$store.state.user !== null && this.receiver !== null && this.$store.state.user.uuid === this.receiver.uuid;
    },
    giverName: function () {
      return this.entityName(this.giver);
    },
    receiverName: function () {
      return this.entityName(this.receiver);
    },
    doesTransactionInvolveOrg: function () {
      return (this.giver && this.giver.name !== undefined) || (this.receiver && this.receiver.name !== undefined)
    }
  },
};
</script>

<template>
  <div class="mt-16">
    <div class="mt-16 vh-center" v-if="$store.state.user === null">
      <v-card flat>
        <v-card-title>

        </v-card-title>
        <v-img
            max-width="500"
            v-if="offer.image"
            :src="getCustomImageUrl(offer.image)"
        ></v-img>
        <v-img
            max-width="500"
            v-if="offer.customImage"
            :src="getCustomImageUrl(offer.customImage)"
        ></v-img>
      </v-card>
    </div>
    <v-card flat class="vh-center" v-else>
      <v-card-actions
          class="vh-center"
          :class="{
        'pt-8': $vuetify.breakpoint.smAndDown,
        'pt-16': $vuetify.breakpoint.mdAndUp,
      }"
      >
        <v-btn
            color="primary"
            large
            class="white--text subtitle-1 pl-4 pr-4"
            :class="{
          'pb-7 pt-7': $vuetify.breakpoint.smAndDown,
        }"
            @click="contactDialog = true"
        >
          <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col cols="12" class="pa-0 pb-0">
              <v-icon>person</v-icon>
            </v-col>
            <v-col cols="12" class="pa-0 pt-1">
              {{ $t("consult:contact") }}
            </v-col>
          </v-row>
          <v-icon class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">person</v-icon>
          <span v-if="$vuetify.breakpoint.mdAndUp">{{
              $t("consult:contact")
            }}</span>
        </v-btn>
        <v-divider
            vertical
            class=""
            :class="{
          'ml-5 mr-5': $vuetify.breakpoint.smAndDown,
          'ml-4 mr-4': $vuetify.breakpoint.mdAndUp,
        }"
        ></v-divider>
        <v-btn
            color="primary"
            large
            class="white--text subtitle-1 pl-4 pr-4"
            :class="{
          'pb-7 pt-7': $vuetify.breakpoint.smAndDown,
        }"
            @click="$refs.newTransaction.enter()"
        >
          <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col cols="12" class="pa-0 pb-0">
              <v-icon>attach_money</v-icon>
            </v-col>
            <v-col cols="12" class="pa-0 pt-1">
              {{ $t("consult:transaction") }}
            </v-col>
          </v-row>
          <v-icon class="mr-2" v-if="$vuetify.breakpoint.mdAndUp"
          >attach_money
          </v-icon
          >
          <span v-if="$vuetify.breakpoint.mdAndUp">{{
              $t("consult:transaction")
            }}</span>
        </v-btn>
      </v-card-actions>
      <v-card-actions class="vh-center" v-if="isOwner">
        <v-btn color="primary" :to="'/offre/' + offer.id">
          <v-icon class="mr-2">edit</v-icon>
          {{ $t("modify") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="isOwner" class="vh-center">
        <PublishOfferToFacebook
            :skipConfirmation="false"
            @publishedToFacebook="successPublishFacebook = true;"
            @errorPublishedToFacebook="errorPublishFacebook = true;"
            :offerDescription="offer.description"
            :userSubRegion="$store.state.user.subRegion"
            :offerId="offer.id"
            :offerImage="offer.image"
            :offerCustomImage="offer.customImage"
        ></PublishOfferToFacebook>
      </v-card-actions>
      <v-card-text class="">
        <v-row justify="center" class="h-center">
          <v-col cols="12"
                 md="6"
                 lg="4"
                 v-if="isLoading"
                 :class="{
            'h-right': $vuetify.breakpoint.mdAndUp,
            'vh-center': $vuetify.breakpoint.smAndDown,
          }"
          >
            <v-skeleton-loader
                width="250"
                type="image, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
          <v-col
              cols="12"
              md="6"
              lg="4"
              v-if="!isLoading"
              :class="{
            'h-right': $vuetify.breakpoint.mdAndUp,
            'vh-center': $vuetify.breakpoint.smAndDown,
          }"
          >
            <v-card
                flat
                class="text-center pt-0"
                max-width="300"
                min-width="250"
                :class="{
              'h-right mr-8': $vuetify.breakpoint.mdAndUp,
              'vh-center': $vuetify.breakpoint.smAndDown,
            }"
            >
              <v-img
                  height="200"
                  v-if="offer.image"
                  :src="getCustomImageUrl(offer.image)"
                  :alt="offer.image.name"
                  class="mt-6"
              ></v-img>
              <v-img
                  height="200"
                  v-if="offer.customImage"
                  :src="getCustomImageUrl(offer.customImage)"
                  class="mt-6"
              ></v-img>
              <v-card-text
                  class="subtitle-1 text-right pl-0 pr-0 pb-0 pt-0 font-italic"
              >
                {{ $t(offer.User.subRegion) }}
              </v-card-text>
              <v-card-text class="subtitle-1 text-left pl-0 pr-0 pt-0" v-html="offer.description">
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" class="col-md-6 col-lg-3">
            <v-card flat class="" min-height="150">
              <v-card-title class="">
                {{ $t("consult:fees") }}
              </v-card-title>
              <v-card-text
                  class="text-left subtitle-1"
                  v-if="
                !offer.additionalFees ||
                offer.additionalFees.trim() === ''
              "
              >
                {{ $t("consult:notMentioned") }}
              </v-card-text>
              <v-card-text class="text-left subtitle-1" v-else v-html="offer.additionalFees">
              </v-card-text>
            </v-card>
            <v-card flat min-height="150">
              <v-card-title>
                {{ $t("consult:experience") }}
              </v-card-title>
              <v-card-text
                  class="text-left subtitle-1"
                  v-if="!offer.experience || offer.experience.trim() === ''"
              >
                {{ $t("consult:notMentioned") }}
              </v-card-text>
              <v-card-text class="text-left subtitle-1" v-html="offer.experience">
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog v-model="contactDialog" v-if="contactDialog" width="400">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="contactDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-body-1 vh-center mb-0 pb-0">
            <v-list class="text-left">
              <v-list-item class="font-weight-bold text-h5">
                <v-list-item-action>
                  <v-icon>account_circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ offer.User.firstname }}
                    {{ offer.User.lastname }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card>
          <v-card-text class="body-1 pb-0">
            <strong>
              {{ $t('consult:pronoun') }}
            </strong>
          </v-card-text>
          <v-card-text class="body-1 pb-0">
            <em>
              {{ offer.User.pronoun }}
            </em>
          </v-card-text>
          <v-card-text class="body-1 pb-0">
            <strong>
              {{ $t('consult:gender') }}
            </strong>
          </v-card-text>
          <v-card-text class="body-1">
            {{ $t(offer.User.gender) }}
          </v-card-text>
          </v-card>
          <v-card-text class="vh-center">
            <v-list class="vh-center">
              <v-subheader class="body-1 mb-4">
                Moyen de communiquer en ordre de préférence
              </v-subheader>
              <v-list-item v-for="(communicationTool) in preferredCommunication"
                           :key="communicationTool.value" :href="communicationToolValues[communicationTool.value].href"
                           target="_blank"
                           :disabled="!communicationToolValues[communicationTool.value].shouldDisplay"
                           class="text-center"
              >
                <v-list-item-action>
                  <v-icon>
                    {{ communicationIcon[communicationTool.value] }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-title class="text-left">
                  <span v-if="communicationToolValues[communicationTool.value].shouldDisplay">
                    {{ communicationToolValues[communicationTool.value].value }}
                  </span>
                  <span v-else>
                    * {{ communicationToolValues[communicationTool.value].noDisplayText }}
                  </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions
              v-if="!offer.User.contactByMessenger || !offer.User.contactByEmail || !offer.User.contactByPhone"
              class="subtitle-1 grey--text"
          >
            {{ $t('consult:preferNoContact') }}
          </v-card-actions>
        </v-card>
      </v-dialog>
      <NewTransaction :offerId="offer.id" :giverInit="isOwner ? $store.state.user : offer.User"
                      :receiverInit="isOwner ? null : $store.state.user" :detailsInit="offer.title_fr"
                      ref="newTransaction"></NewTransaction>
      <v-bottom-sheet
          v-model="pendingTransactionSheet"
          v-if="pendingTransaction !== null && pendingTransaction.length"
          inset
          scrollable
      >
        <v-sheet class="text-center">
          <div>
            <Transaction
                :quantity="pendingTransaction[0].amount"
                :giver="pendingTransaction[0].giver"
                :receiver="pendingTransaction[0].receiver"
                :initiator="pendingTransaction[0].initiator"
                :transactionId="pendingTransaction[0].id"
                :flatCard="true"
                @close="pendingTransactionSheet = false"
            ></Transaction>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </v-card>
    <v-snackbar
        v-model="successPublishFacebook"
        bottom
        color="primary"
        dark
        :timeout="14000"
    >
      <v-icon left color="white">facebook</v-icon>
      {{ $t("consult:publishToFacebookSuccess") }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            icon
            v-bind="attrs"
            @click="successPublishFacebook = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="errorPublishFacebook"
        bottom
        outlined
        color="error"
        :timeout="14000"
    >
      <v-icon left color="error">error</v-icon>
      {{ $t("consult:publishToFacebookError") }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="black"
            text
            icon
            v-bind="attrs"
            @click="errorPublishFacebook = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import I18n from "@/i18n";
import Images from "@/Images";
import OfferService from "@/offer/OfferService";
import Rules from "@/Rules";
import Offer from "@/offer/Offer";
import TransactionService from "@/service/TransactionService";
import PreferredCommunication from "@/PreferredCommunication";

export default {
  components: {
    Transaction: () => import("@/components/Transaction"),
    NewTransaction: () => import("@/components/NewTransaction"),
    PublishOfferToFacebook: () => import('@/components/PublishOfferToFacebook'),
  },
  async mounted() {
    this.offer.UserId = this.$store.state.user.id;
    this.offer.id = parseInt(this.$route.params.offerId);
    this.isLoading = true;
    const response = await OfferService.get(this.offer);
    this.offer = Offer.format(response.data);
    this.preferredCommunication = PreferredCommunication.reviewForMember(this.offer.User);
    this.communicationToolValues = {
      Email: {
        shouldDisplay: this.shouldDisplayValueOfCommunicationTool("Email"),
        href: 'mailto:' + this.offer.User.email,
        value: this.offer.User.email,
        noDisplayText: this.$t('consult:email')
      },
      Phone: {
        shouldDisplay: this.shouldDisplayValueOfCommunicationTool("Phone"),
        href: 'phone:' + this.offer.User.phone1,
        value: this.offer.User.phone1,
        noDisplayText: this.$t('consult:phone')
      },
      Messenger: {
        shouldDisplay: this.shouldDisplayValueOfCommunicationTool("Messenger") && this.offer.User.facebookUsername !== undefined,
        href: 'https://m.me/' + this.offer.User.facebookUsername,
        value: "Messenger",
        noDisplayText: "Messenger"
      }
    }
    this.isLoading = false;
    this.pendingTransaction = await TransactionService.getPendingForOfferAndUserId(
        this.offer.id,
        this.$store.state.user.id
    );
    if (this.pendingTransaction !== null) {
      this.pendingTransactionSheet = true;
    }
    this.isOwner = this.offer.UserId === this.$store.state.user.id;
  },
  data: function () {
    I18n.i18next.addResources("fr", "consult", {
      contact: "Contacter",
      transaction: "Transaction",
      experience: "Expérience",
      fees: "Frais additionels",
      notMentioned: "Pas mentionné",
      billedQuantity: "La quantité de temps facturé est de",
      pendingTransaction: "Transaction en attente",
      publishToFacebookSuccess: "Votre offre a été publié dans le groupe des membres",
      publishToFacebookError: "Il y a eu une erreur dans la publication de votre offre dans le groupe facebook",
      email: "Courriel",
      phone: "Téléphone",
      preferNoContact: "* Préfère ne pas être contacter par ce moyen de communication",
      pronoun: "Utilisez le pronom",
      gender: "Genre"
    });
    I18n.i18next.addResources("en", "consult", {
      contact: "Contacter",
      transaction: "Transaction",
      experience: "Expérience",
      fees: "Frais additionels",
      notMentioned: "Pas mentionné",
      billedQuantity: "La quantité de temps facturé est de",
      pendingTransaction: "Transaction en attente",
      publishToFacebookSuccess: "Votre offre a été publié dans le groupe des membres",
      publishToFacebookError: "Il y a eu une erreur dans la publication de votre offre dans le groupe facebook",
      email: "Courriel",
      phone: "Téléphone",
      preferNoContact: "* Préfère ne pas être contacter par ce moyen de communication",
      pronoun: "Utilisez le pronom",
      gender: "Genre"
    });
    /*
      concat is to avoid re-adding uploadImage
    */
    const images = [].concat(Images.get());
    images.unshift({
      name: "uploadImage",
    });
    return {
      offer: {
        description: "",
        isAvailable: true,
      },
      imageCarousel: 0,
      images: images,
      rules: Rules,
      isLoading: true,
      contactDialog: false,
      isOwner: false,
      pendingTransaction: null,
      pendingTransactionSheet: false,
      successPublishFacebook: false,
      errorPublishFacebook: false,
      communicationIcon: PreferredCommunication.getCommunicationIcons(),
      preferredCommunication: {},
      communicationToolValues: {}
    };
  },
  methods: {
    shouldDisplayValueOfCommunicationTool: function (communicationToolValue) {
      const preferenceIndex = this.offer.User.preferredCommunication[communicationToolValue];
      return preferenceIndex !== -1 && this.offer.User['contactBy' + communicationToolValue] === true;
    },
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    },
  },
};
</script>
<style>
.offer-margin-top {
  margin-top: -40px;
}
</style>

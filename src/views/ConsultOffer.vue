<template>
  <v-card flat class="mt-16 vh-center">
    <v-card-actions class="vh-center" :class="{
      'pt-8': $vuetify.breakpoint.smAndDown,
      'pt-16': $vuetify.breakpoint.mdAndUp
    }">
      <v-btn
          color="primary"
          large
          class="white--text subtitle-1 pl-4 pr-4"
          :class="{
            'pb-7 pt-7': $vuetify.breakpoint.smAndDown
          }"
          @click="contactDialog=true;"
      >
        <v-row v-if="$vuetify.breakpoint.smAndDown">
          <v-col cols="12" class="pa-0 pb-0">
            <v-icon>person</v-icon>
          </v-col>
          <v-col cols="12" class="pa-0 pt-1">
            {{ $t('consult:contact') }}
          </v-col>
        </v-row>
        <v-icon class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">person</v-icon>
        <span v-if="$vuetify.breakpoint.mdAndUp">{{ $t('consult:contact') }}</span>
      </v-btn>
      <v-divider vertical class="" :class="{
        'ml-5 mr-5' : $vuetify.breakpoint.smAndDown,
        'ml-4 mr-4': $vuetify.breakpoint.mdAndUp
      }"></v-divider>
      <v-btn
          color="primary"
          large
          class="white--text subtitle-1 pl-4 pr-4"
          :class="{
            'pb-7 pt-7': $vuetify.breakpoint.smAndDown
          }"
          @click="enterTransactionFlow"
      >
        <v-row v-if="$vuetify.breakpoint.smAndDown">
          <v-col cols="12" class="pa-0 pb-0">
            <v-icon>attach_money</v-icon>
          </v-col>
          <v-col cols="12" class="pa-0 pt-1">
            {{ $t('consult:transaction') }}
          </v-col>
        </v-row>
        <v-icon class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">attach_money</v-icon>
        <span v-if="$vuetify.breakpoint.mdAndUp">{{ $t('consult:transaction') }}</span>
      </v-btn>
    </v-card-actions>
    <v-card-actions class="vh-center" v-if="isOwner">
      <v-btn color="primary" :to="'/offre/' + offer.id">
        <v-icon class="mr-2">edit</v-icon>
        {{ $t('modify') }}
      </v-btn>
    </v-card-actions>
    <v-card-text class="">
      <v-row
          align="center"
          justify="center"
          class="h-center"
      >
        <v-col cols="12" class="col-md-6 col-lg-4 text-center vh-center" v-if="isLoading">
          <v-skeleton-loader
              width="250"
              type="image, list-item-two-line"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="col-md-6 col-lg-3" v-if="!isLoading" :class="{
          'h-right': $vuetify.breakpoint.mdAndUp,
          'vh-center' : $vuetify.breakpoint.smAndDown
        }">
          <v-card flat class="text-center pt-0" max-width="300" :class="{
            'h-right mr-8' : $vuetify.breakpoint.mdAndUp,
            'vh-center' : $vuetify.breakpoint.smAndDown
          }">
            <v-img
                height="200"
                v-if="offer.image"
                :src="getCustomImageUrl(offer.image)"
                :alt="offer.image.name"
                class="pt-0"
            ></v-img>
            <v-img
                height="200"
                v-if="offer.customImage"
                :src="getCustomImageUrl(offer.customImage)"
                class="pt-0"
            ></v-img>
            <v-card-text class="subtitle-1 text-right pl-0 pr-0 pb-0 pt-0 font-italic">
              {{ $t(offer.User.subRegion) }}
            </v-card-text>
            <v-card-text class="subtitle-1 text-left pl-0 pr-0 pt-0">
              {{ offer.description }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-6 col-lg-3">
          <v-card flat class="" min-height="150">
            <v-card-title class="">
              {{ $t('consult:fees') }}
            </v-card-title>
            <v-card-text class="text-left subtitle-1"
                         v-if="!offer.additionalFees_fr || offer.additionalFees_fr.trim() === ''">
              {{ $t('consult:notMentioned') }}
            </v-card-text>
            <v-card-text class="text-left subtitle-1" v-else>
              {{ offer.additionalFees_fr }}
            </v-card-text>
          </v-card>
          <v-card flat min-height="150">
            <v-card-title>
              {{ $t('consult:experience') }}
            </v-card-title>
            <v-card-text class="text-left subtitle-1"
                         v-if="!offer.experience_fr || offer.experience_fr.trim() === ''">
              {{ $t('consult:notMentioned') }}
            </v-card-text>
            <v-card-text class="text-left subtitle-1">
              {{ offer.experience_fr }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="contactDialog" v-if="contactDialog" width="400">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="contactDialog=false;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-body-1 vh-center">
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
            <v-list-item :href="'https://m.me/' + offer.User.facebookId" target="_blank">
              <v-list-item-action>
                <v-icon>messenger</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Messenger
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :href="'mailto:'+offer.User.email">
              <v-list-item-action>
                <v-icon>email</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ offer.User.email }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :href="'phone:'+offer.User.phone1">
              <v-list-item-action>
                <v-icon>phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ offer.User.phone1 }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="transactionDialog" v-if="transactionDialog" width="900">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="transactionDialog=false;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-body-1 vh-center" v-if="isOwner">
          <v-autocomplete
              :items="members"
              :filter="membersFilter"
              item-text="fullname"
              v-model="userOfTransaction"
              :label="$t('consult:chooseUser')"
              class="members-autocomplete"
              :menu-props="membersAutocompleteMenuProps"
              return-object
          ></v-autocomplete>
        </v-card-text>
        <v-card-text>
          <v-card width="100%">
            <v-card-title class="vh-center">
              <span class="font-weight-bold mr-2">
                <span v-if="isOwner && !userOfTransaction">
                  ...
                </span>
                <span v-if="isOwner && userOfTransaction">
                  {{ userOfTransaction.firstname }}
                  {{ userOfTransaction.lastname }}
                </span>
                <span v-if="!isOwner">
                  {{ $store.state.user.firstname }}
                {{ $store.state.user.lastname }}
                </span>
              </span>
              {{ $t('consult:receivedService') }}
              {{ $t('consult:performedService') }}
              <span class="font-weight-bold ml-2">
                  {{ offer.User.firstname }}
                  {{ offer.User.lastname }}
              </span>
            </v-card-title>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="isOwner && userOfTransaction === null">
            {{ $t('confirm') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="transactionDialog=false;">
            {{ $t('cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Images from '@/Images'
import OfferService from "@/offer/OfferService";
import Rules from "@/Rules";
import Offer from '@/offer/Offer'
import MemberService from "@/service/MemberService";

export default {
  components: {},
  async mounted() {
    this.isLoading = true;
    this.userOfTransaction = null;
    this.offer.id = this.$route.params.offerId;
    const response = await OfferService.get(this.offer);
    this.offer = Offer.format(response.data);
    this.isLoading = false;
    this.isOwner = this.offer.UserId === this.$store.state.user.id;
    if (this.isOwner) {
      const response = await MemberService.list();
      this.members = response.data.map((member) => {
        member.fullname = member.firstname + " " + member.lastname;
        member.disabled = member.uuid === this.$store.state.user.uuid;
        return member;
      });
    }
  },
  data: function () {
    I18n.i18next.addResources("fr", "consult", {
      contact: "Contacter",
      transaction: "Transaction",
      experience: "Expérience",
      fees: "Frais additionels",
      notMentioned: "Pas mentionné",
      chooseUser: "L'autre usager dans la transaction",
      receivedService: "as reçu le service",
      performedService: "rendu par"
    });
    I18n.i18next.addResources("en", "offer", {
      contact: "Contacter",
      transaction: "Transaction",
      experience: "Expérience",
      fees: "Frais additionels",
      notMentioned: "Pas mentionné",
      chooseUser: "L'autre usager dans la transaction",
      receivedService: "as reçu le service",
      performedService: "rendu par"
    });
    /*
      concat is to avoid re-adding uploadImage
    */
    const images = [].concat(Images.get());
    images.unshift({
      name: "uploadImage"
    });
    return {
      offer: {
        UserId: this.$store.state.user.id,
        description: "",
        isAvailable: true
      },
      imageCarousel: 0,
      images: images,
      rules: Rules,
      isLoading: true,
      contactDialog: false,
      isOwner: false,
      transactionDialog: false,
      transactionStepper: null,
      members: [],
      userOfTransaction: null,
      membersAutocompleteMenuProps: {
        'content-class': 'text-left'
      }
    }
  },
  methods: {
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    },
    cancel: function () {
      this.transactionStepper = null;
      this.transactionDialog = false;
    },
    membersFilter: function (member, queryText) {
      const firstname = member.firstname.toLowerCase()
      const lastname = member.lastname.toLowerCase()
      const searchText = queryText.toLowerCase()

      return firstname.indexOf(searchText) > -1 ||
          lastname.indexOf(searchText) > -1
    },
    enterTransactionFlow: function () {

      this.transactionDialog = true;
    }
  }
}
</script>
<style>
.v-menu__content {
  text-align: left;
}

.offer-margin-top {
  margin-top: -40px;
}
</style>

<template>
  <v-card flat class="mt-16">
    <v-card-actions class="vh-center pt-8">
      <v-btn
          color="primary"
          large
          class="white--text subtitle-1 pl-4 pr-4"
      >
        <v-icon class="mr-2">phone</v-icon>
        {{ $t('consult:contact') }}
      </v-btn>
      <v-divider vertical class="ml-4 mr-4"></v-divider>
      <v-btn
          color="primary"
          large
          class="white--text subtitle-1 pl-4 pr-4"
      >
        <v-icon class="mr-2">attach_money</v-icon>
        {{ $t('consult:transaction') }}
      </v-btn>
    </v-card-actions>
    <v-card-text class="pt-8">
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
        <v-col cols="12" class="col-md-6 col-lg-3 h-right" v-if="!isLoading">
          <v-card flat class="text-center h-right mr-8" max-width="300">
            <v-img
                height="200"
                v-if="offer.image"
                :src="getCustomImageUrl(offer.image)"
                :alt="offer.image.name"
            ></v-img>
            <v-img
                height="200"
                v-if="offer.customImage"
                :src="getCustomImageUrl(offer.customImage)"
            ></v-img>
            <v-card-text class="subtitle-1 text-right pl-0 pr-0 pb-0 pt-0 font-italic">
              {{ $t(offer.User.subRegion) }}
            </v-card-text>
            <v-card-text class="subtitle-1 text-left pl-0 pr-0 pt-0">
              {{ offer.description }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-6 col-lg-3 text-center">
          <v-card flat class="pt-0">
            <v-card-title class="pt-0">
              {{$t('consult:fees')}}
            </v-card-title>
            <v-card-text class="text-left">
              {{offer.additionalFees_fr}}
            </v-card-text>
          </v-card>
          <v-card flat>
            <v-card-title>
              {{$t('consult:experience')}}
            </v-card-title>
            <v-card-text class="text-left">
              {{offer.experience_fr}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import I18n from "@/i18n";
import Images from '@/Images'
import OfferService from "@/offer/OfferService";
import Rules from "@/Rules";
import Offer from '@/offer/Offer'

export default {
  components: {},
  async mounted() {
    this.isLoading = true;
    this.offer.id = this.$route.params.offerId;
    const response = await OfferService.get(this.offer);
    this.offer = Offer.format(response.data);
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "consult", {
      contact: "Contacter le membre",
      transaction: "Inscrire une transaction",
      experience: "Expérience",
      fees: "Frais additionels"
    });
    I18n.i18next.addResources("en", "offer", {
      contact: "Contacter le membre",
      transaction: "Inscrire une transaction",
      experience: "Expérience",
      fees: "Frais additionels"
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
      isLoading: true
    }
  },
  methods: {
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    }
  },
  computed: {}
}
</script>
<style>
</style>

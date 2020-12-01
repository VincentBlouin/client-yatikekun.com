<template>
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
    <v-col cols="12" class="col-md-6 col-lg-4 text-center" v-else>
      <v-card :flat="!isAskService">
        <v-card-actions class="vh-center">
          <v-btn
              color="primary"
              x-large
              class="pa-8 font-weight-bold pr-16 pl-16 text-h6 font-weight-regular text-md-h6"
              @click="isAskService=!isAskService"
          >
            {{ $t('consult:askService') }}
            <v-spacer></v-spacer>
            <v-icon right v-if="isAskService" large class="pl-4">expand_less</v-icon>
            <v-icon right v-else large class="pl-4">expand_more</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <v-row align="center" v-if="isAskService">
            <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
            <v-col cols="12" class="col-md-8">
              <v-list class="text-left">
              </v-list>
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>
    </v-col>
    <v-col cols="12" class="col-md-6 col-lg-4 text-center" v-if="!isLoading">
      <v-card flat class="text-center pl-8 pr-8" :to="'/consulter-offre/' + offer.id" max-width="350">
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
    <v-col cols="12" class="col-md-6 col-lg-4 text-center">
    </v-col>
  </v-row>
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
      askService: "Demander le service"
    });
    I18n.i18next.addResources("en", "offer", {
      askService: "Demander le service"
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
      isAskService: false
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

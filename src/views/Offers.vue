<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center pt-16 pb-16"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="pt-8">
        <v-card-title>
          {{ $t('offers:title') }}
        </v-card-title>
        <v-row v-if="isLoading">
          <v-col cols="12" class="col-md-6 col-lg-4 text-center vh-center" v-for="n in 20" :key="n">
            <v-skeleton-loader
                width="250"
                type="image, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="col-md-6 col-lg-4 text-center" v-for="offer in offers" :key="offer.id">
            <v-card flat class="text-center pl-8 pr-8">
              <v-img
                  height="175"
                  v-if="offer.image"
                  :src="getCustomImageUrl(offer.image)"
                  :alt="offer.image.name"
              ></v-img>
              <v-img
                  height="175"
                  v-if="offer.customImage"
                  :src="getCustomImageUrl(offer.customImage)"
              ></v-img>
              <v-card-text class="subtitle-1 text-left pl-0 pr-0">
                {{ offer.title_fr }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-fab-transition>
      <v-btn
          color="primary"
          fab
          dark
          fixed
          bottom
          right
          to="offre"
          style="left:72%;"
          x-large
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import OfferService from "@/service/OfferService";
import Images from "@/Images";

export default {
  components: {},
  async mounted() {
    window.scrollTo(0, 0)
    this.isLoading = true;
    let response = await OfferService.list();
    this.offers = response.data.map((offer) => {
      offer.userFullname = offer.User.firstname + " " + offer.User.lastname;
      if (offer.image) {
        offer.image = Images.getImageWithName(offer.image);
      }
      offer.title_fr = offer.title_fr[0].toUpperCase() + offer.title_fr.substr(1);
      return offer;
    });
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "offers", {
      title: "Offres",
      offer: "Offre",
      member: "Membre"
    });
    I18n.i18next.addResources("en", "offers", {
      title: "Offers",
      offer: "Offre",
      member: "Membre"
    });
    return {
      offers: null,
      isLoading: false
    }
  },
  methods: {
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    }
  }
}
</script>

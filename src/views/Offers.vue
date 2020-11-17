<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center pt-16 pb-16"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="pt-8">
        <v-fab-transition>
          <v-btn
              color="primary"
              fab
              dark
              fixed
              bottom
              right
              to="offre"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-card-title>
          {{ $t('offers:title') }}
        </v-card-title>
        <v-row>
          <v-col cols="12" class="col-md-6 col-lg-4 text-center" v-for="offer in offers" :key="offer.id">
            <v-card flat class="text-center">
              <img
                  width="150"
                  v-if="offer.image"
                  :src="getCustomImageUrl(offer.image)"
                  :alt="offer.image.name"
              >
              <img
                  width="150"
                  v-if="offer.customImage"
                  :src="getCustomImageUrl(offer.customImage)"
              >
              <v-card-text class="subtitle-1 text-center">
                {{ offer.title_fr }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!--        <v-row >-->
        <!--          <v-col cols="12">-->

        <!--          </v-col>-->
        <!--        </v-row>-->
        <!--        <v-card-text v-if="offers !== null">-->
        <!--&lt;!&ndash;          {{ offers }}&ndash;&gt;-->
        <!--                    <v-data-table-->
        <!--                        :headers="headers"-->
        <!--                        :items="offers"-->
        <!--                        :items-per-page="10"-->
        <!--                        class="elevation-1"-->
        <!--                    ></v-data-table>-->
        <!--        </v-card-text>-->
      </v-card>
    </v-col>
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
    let response = await OfferService.list();
    this.offers = response.data.map((offer) => {
      offer.userFullname = offer.User.firstname + " " + offer.User.lastname;
      if (offer.image) {
        offer.image = Images.getImageWithName(offer.image);
      }
      return offer;
    });
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
      offers: null
    }
  },
  methods: {
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    }
  }
}
</script>

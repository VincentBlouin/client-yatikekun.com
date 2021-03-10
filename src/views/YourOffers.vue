<template>
  <v-row
      justify="center"
      class="mt-16 pt-16 pb-16"
  >
    <v-col cols="12" md="10" xl="8" class="text-center">
      <h2 class="text-center">
        {{$t('yourOffer:title')}}
      </h2>
      <v-row class="">
        <v-col cols="12" md="6" lg="4" v-for="offer in offers" :key="offer.id">
          <OfferCard :offer="offer" :isAvailableSwitch="true"></OfferCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import OfferService from "@/offer/OfferService";
import Offer from "@/offer/Offer";
import I18n from "@/i18n";

export default {
  name: "YourOffers",
  components: {
    OfferCard: () => import('@/views/OfferCard')
  },
  data: function () {
    I18n.i18next.addResources("fr", "yourOffer", {
      title: "Vos offres",
      isAvailable: "Est disponible"
    });
    I18n.i18next.addResources("en", "yourOffer", {
      title: "Vos offres",
      isAvailable: "Est disponible"
    });
    return {
      offers: [],
      selectedOffers: []
    }
  },
  mounted: async function () {
    let response = await OfferService.listForUserId(this.$store.state.user.id);
    this.offers = response.data.map((offer) => {
      offer.User = this.$store.state.user;
      return Offer.format(offer);
    });
  }
}
</script>

<style scoped>

</style>
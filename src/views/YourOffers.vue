<template>
  <div>
    <Page>
      <h2 class="text-center logo-font text-h4">
        {{ $t('yourOffer:title') }}
      </h2>
      <v-row class="">
        <v-col cols="12" md="6" lg="4" v-for="offer in offers" :key="offer.id">
          <OfferCard :offer="offer" :isAvailableSwitch="true" @remove="removeOffer"></OfferCard>
        </v-col>
      </v-row>
    </Page>
    <v-row>
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
  </div>
</template>

<script>
import OfferService from "@/offer/OfferService";
import Offer from "@/offer/Offer";
import I18n from "@/i18n";

export default {
  name: "YourOffers",
  components: {
    OfferCard: () => import('@/views/OfferCard'),
    Page: () => import('@/components/Page')
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
    let response = await OfferService.listForUserUuid(this.$store.state.user.uuid);
    this.offers = response.data.map((offer) => {
      offer.User = this.$store.state.user;
      return Offer.format(offer);
    });
  },
  methods: {
    removeOffer: function (offerId) {
      let l = this.offers.length;
      while (l--) {
        let offer = this.offers[l];
        if (this.offers[l].id === offerId) {
          this.offers.splice(offer, 1);
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

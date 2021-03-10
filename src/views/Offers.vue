<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center pt-16 pb-16"
  >
    <v-col cols="12" md="10" xl="8" class="text-center">
      <v-card flat class="pt-8">
        <v-card-title>
          {{ $t('offers:title') }}
        </v-card-title>
        <v-card-actions>
          <v-text-field v-model="filterInput" :label="$t('offers:search')" prepend-icon="search"></v-text-field>
        </v-card-actions>
        <v-row v-if="isLoading">
          <v-col cols="12" class="col-md-6 col-lg-4 text-center vh-center" v-for="n in 20" :key="n">
            <v-skeleton-loader
                width="250"
                type="image, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="offersFiltered.length === 0" cols="12" class="text-h6">
            <v-sheet height="400" class="grey--text">
              {{ $t('offers:noResults') }}
            </v-sheet>
          </v-col>
          <v-col v-else cols="12" class="col-md-6 col-lg-4 text-center" v-for="offer in offersFiltered" :key="offer.id">
            <OfferCard :offer="offer"></OfferCard>
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
import OfferService from "@/offer/OfferService";
import Offer from '@/offer/Offer'

export default {
  components: {
    OfferCard: () => import('@/views/OfferCard')
  },
  async mounted() {
    window.scrollTo(0, 0)
    this.isLoading = true;
    let response = await OfferService.list();
    this.offers = response.data.map((offer) => {
      return Offer.format(offer);
    });
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "offers", {
      title: "Offres",
      offer: "Offre",
      member: "Membre",
      search: "Chercher",
      noResults: "Pas de résultats"
    });
    I18n.i18next.addResources("en", "offers", {
      title: "Offers",
      offer: "Offre",
      member: "Membre",
      search: "Chercher",
      noResults: "Pas de résultats"
    });
    return {
      offers: [],
      isLoading: false,
      filterInput: ""
    }
  },
  computed: {
    offersFiltered: function () {
      return this.offers.filter((offer) => {
        const descriptionSearch = offer.description.noAccents().toLowerCase().indexOf(this.filterInput.noAccents().toLowerCase()) > -1;
        const subRegionSearch = offer.User.subRegion.noAccents().toLowerCase().indexOf(this.filterInput.noAccents().toLowerCase()) > -1;
        return descriptionSearch || subRegionSearch;
      });
    }
  }
}
</script>

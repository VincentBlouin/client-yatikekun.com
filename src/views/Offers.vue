<template>
  <div>
    <Page>
      <v-card flat class="pt-8" color="transparent">
        <v-card-title class="logo-font text-h4">
          {{ $t('offers:title') }}
        </v-card-title>
        <v-card-actions :class="{
          'pl-0 pr-0': $vuetify.breakpoint.smAndDown
        }">
          <v-text-field v-model="filterInput" :label="$t('offers:searchPlaceHolder')"
                        prepend-icon="search" @blur="searchOffers" @keydown="searchKeydown"
                        clearable
                        @click:clear="resetOffers"
          ></v-text-field>
        </v-card-actions>
        <v-card-actions :class="{
          'pl-0 pr-0': $vuetify.breakpoint.smAndDown
        }"
                        class="mb-8 pt-0"
        >
          <v-btn prepend-icon="search" color="primary" class="ml-8" @click="searchOffers">
            <v-icon left>search</v-icon>
            {{ $t('search') }}
          </v-btn>
        </v-card-actions>
        <v-row v-if="isLoading">
          <v-col cols="12" md="4" class="text-center vh-center" v-for="n in 20" :key="n">
            <v-skeleton-loader
                width="250"
                type="image, list-item-two-line"
                color="transparent"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="offersFiltered.length === 0" cols="12" class="text-h6">
            <v-sheet height="400" class="grey--text">
              {{ $t('offers:noResults') }}
            </v-sheet>
          </v-col>
          <v-col v-else cols="12" md="4" class="text-center" v-for="offer in offersFiltered"
                 :key="offer.id">
            <OfferCard :offer="offer"></OfferCard>
          </v-col>
        </v-row>
      </v-card>
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
import I18n from "@/i18n";
import OfferService from "@/offer/OfferService";
import Offer from '@/offer/Offer'

const ENTER_KEY_CODE = 13;

export default {
  components: {
    OfferCard: () => import('@/views/OfferCard'),
    Page: () => import('@/components/Page')
  },
  async mounted() {
    window.scrollTo(0, 0)
    this.isLoading = true;
    await this.resetOffers();
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "offers", {
      title: "Offres",
      offer: "Offre",
      member: "Membre",
      searchPlaceHolder: "Titre, région de l'offre ou nom de la personne",
      noResults: "Pas de résultats"
    });
    I18n.i18next.addResources("en", "offers", {
      title: "Offers",
      offer: "Offre",
      member: "Membre",
      searchPlaceHolder: "Titre et région de l'offre. Nom de la personne",
      noResults: "Pas de résultats"
    });
    return {
      offers: [],
      offersFiltered: [],
      isLoading: false,
      filterInput: ""
    }
  },
  methods: {
    searchOffers: async function () {
      this.isLoading = true;
      if (this.filterInput.trim() === "") {
        await this.resetOffers();
        this.isLoading = false;
        return;
      }
      const response = await OfferService.search(this.filterInput);
      this.offersFiltered = response.data.hits.hits.map((result) => {
        return Offer.format(result._source);
      })
      this.isLoading = false;
    },
    searchKeydown: function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        this.searchOffers();
      }
    },
    resetOffers: async function () {
      let response = await OfferService.list();
      this.offers = response.data.map(Offer.format);
      this.offersFiltered = this.offers;
    }
  },
  computed: {
    // offersFiltered: function () {
    // return this.offers.filter((offer) => {
    //   const descriptionSearch = offer.description.noAccents().toLowerCase().indexOf(this.filterInput.noAccents().toLowerCase()) > -1;
    //   const subRegionSearch = offer.User.subRegion.noAccents().toLowerCase().indexOf(this.filterInput.noAccents().toLowerCase()) > -1;
    //   return descriptionSearch || subRegionSearch;
    // });
    // }
  }
}
</script>

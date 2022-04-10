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
                        prepend-icon="search" @keydown="searchKeydown"
                        clearable
                        @blur="searchBlur"
                        @click:clear="clearSearch"
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
      <infinite-loading @infinite="infiniteHandler" v-if="shouldUseInfiniteLoading">
        <div slot="no-more">
          <v-divider class="mb-8 mt-2"></v-divider>
          <span class="text-h6 mt-8 mb-2 grey--text">{{ $t('offers:endOfOffers') }}</span>
        </div>
        <div slot="no-results">
          <v-divider class="mb-8 mt-2"></v-divider>
          <span class="text-h6 mt-8 mb-2 grey--text">{{ $t('offers:endOfOffers') }}</span>
        </div>
      </infinite-loading>
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
import InfiniteLoading from "vue-infinite-loading";

const ENTER_KEY_CODE = 13;

export default {
  components: {
    OfferCard: () => import('@/views/OfferCard'),
    Page: () => import('@/components/Page'),
    InfiniteLoading
  },
  async mounted() {
    window.scrollTo(0, 0)
    await this.clearSearch();
  },
  data: function () {
    I18n.i18next.addResources("fr", "offers", {
      title: "Offres",
      offer: "Offre",
      member: "Membre",
      searchPlaceHolder: "Titre, région de l'offre ou nom de la personne",
      noResults: "Pas de résultats",
      endOfOffers: "Fin des offres"
    });
    I18n.i18next.addResources("en", "offers", {
      title: "Offers",
      offer: "Offre",
      member: "Membre",
      searchPlaceHolder: "Titre et région de l'offre. Nom de la personne",
      noResults: "Pas de résultats",
      endOfOffers: "Fin des offres"
    });
    return {
      offers: [],
      offersFiltered: [],
      offersPage: 0,
      isLoading: false,
      filterInput: "",
      shouldUseInfiniteLoading: false
    }
  },
  methods: {
    clearSearch: async function () {
      this.isLoading = true;
      await this.resetOffers();
      this.isLoading = false;
      await this.$nextTick();
      this.shouldUseInfiniteLoading = true;
    },
    searchBlur: async function () {
      if (this.filterInput.trim() === "") {
        await this.clearSearch();
      }
    },
    searchOffers: async function () {
      if (this.filterInput.trim() === "") {
        return;
      }
      this.isLoading = true;
      const response = await OfferService.search(this.filterInput);
      this.offersFiltered = response.data.hits.hits.map((result) => {
        return Offer.format(result._source);
      })
      this.isLoading = false;
      await this.$nextTick();
      this.shouldUseInfiniteLoading = false;
    },
    searchKeydown: function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        this.searchOffers();
      }
    },
    resetOffers: async function () {
      let response = await OfferService.list(0);
      this.offers = response.data.map(Offer.format);
      this.offersPage = 1;
      this.offersFiltered = this.offers;
    },
    infiniteHandler: async function ($state) {
      const response = await OfferService.list(this.offersPage * 9);
      const offers = response.data.map(Offer.format);
      if (offers.length) {
        this.offersPage += 1;
        this.offers.push(...offers);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
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

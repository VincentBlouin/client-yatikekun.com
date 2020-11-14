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
              absolute
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
        <v-list>
          <v-list-item v-for="offer in offers" :key="offer.id">
            <v-list-item-avatar>
              <v-avatar>
                <img
                    :src="require('@/assets/categories/' + offer.image)"
                >
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content class="text-left">
              <v-list-item-title>
                {{ offer.title_fr }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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

export default {
  components: {},
  async mounted() {
    window.scrollTo(0, 0)
    let response = await OfferService.list();
    this.offers = response.data.map((offer) => {
      offer.userFullname = offer.User.firstname + " " + offer.User.lastname;
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
      offers: null,
      headers: [
        {
          text: this.$t('offers:offer'),
          align: 'start',
          sortable: false,
          value: 'title_fr',
        },
        {
          text: this.$t('offers:member'),
          align: 'start',
          sortable: false,
          value: 'userFullname'
        }
      ],
    }
  }
}
</script>

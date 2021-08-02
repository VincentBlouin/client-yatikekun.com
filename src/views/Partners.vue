<template>
  <Page>
    <v-card flat class="mt-8 mb-8">
      <v-card-title class="vh-center primary-color">
        <h3 class="text-center">{{ $t('partner:title') }}</h3>
      </v-card-title>
    </v-card>
    <v-row class="vh-center">
      <v-col xs="12" sm="5">
        <v-card flat href="https://mrcbonaventure.com/" width="">
          <v-card style="background-color: #002c51;" class="pa-4" flat outlined>
            <v-img :src="require('@/assets/logo_mrcbona.png')" alt="MRC de Bonaventure"></v-img>
          </v-card>
        </v-card>
      </v-col>
      <v-col sm="1" md="2" v-if="$vuetify.breakpoint.mdAndUp">
      </v-col>
      <v-col xs="12" md="5">
        <v-card flat href="https://horizonsgaspesiens.net">
          <v-card class="pa-4 vh-center" flat>
            <v-img :src="require('@/assets/logo-horizontal.11efeb66.png')" class="mt-4"
                   alt="Horizons Gaspésiens"></v-img>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="5">
        <v-card flat href="https://www.innergex.com/fr/">
          <v-card flat>
            <v-img :src="require('@/assets/logo INNERGEX_png.png')" alt="Innergex énergie renouvelable inc"></v-img>
          </v-card>
        </v-card>
      </v-col>
      <v-col sm="1" md="2" v-if="$vuetify.breakpoint.smAndUp">
      </v-col>
      <v-col xs="12" sm="5" class="">
        <v-card class="vh-center" flat href="https://www.mrcavignon.com/">
          <v-img :src="require('@/assets/LOGO-MRC-AVIGNON-Couleurs_RVB.png')" alt="MRC d'Avignon"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </Page>
</template>

<script>
import I18n from "@/i18n";

export default {
  name: "Partners",
  components: {
    Page: () => import('@/components/Page')
  },
  data: function () {
    I18n.i18next.addResources("fr", "partner", {
      title: "Partenaires"
    });
    I18n.i18next.addResources("en", "partner", {
      title: "Partners"
    });
    return {};
  }
}
</script>

<style scoped>

</style>

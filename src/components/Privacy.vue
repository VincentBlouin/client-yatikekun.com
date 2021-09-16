<template>
  <v-card flat>
    <v-card-title class="primary-color font-weight-bold">
      {{ $t('privacy:title') }}
    </v-card-title>
    <v-card-text>
      <p class="text-h6 font-weight-regular text-left">
        {{ $t('privacy:visibility') }}
      </p>
      <p class="text-h6 font-weight-regular text-left">
        {{ $t('privacy:passwords') }}
      </p>
      <p class="text-h6 font-weight-regular text-left">
        {{ $t('privacy:facebook') }}
      </p>
      <p class="text-h6 font-weight-regular text-left">
        {{ $t('privacy:location') }}
      </p>
    </v-card-text>
  </v-card>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {},
  data: function () {
    I18n.i18next.addResources("fr", "privacy", {
      title: "Vie privée",
      visibility: "Les courriels, adresses, genres, url messenger, téléphones et transactions sont visibles par tous les membres.",
      passwords: "Les mots de passe ne sont jamais partagés.",
      facebook: "Les offres de services sont publiées automatique sur le groupe Facebook privé réservé aux membres",
      location: "Les données sauvergardées se trouvent dans des serveurs à Paspébiac QC Canada. Des backups se trouvent également à Bonaventure QC Canada."
    });
    I18n.i18next.addResources("en", "privacy", {
      title: "Vie privée",
      visibility: "Les courriels, adresses, genres, url messenger, téléphones et transactions sont visibles par tous les membres.",
      passwords: "Les mots de passe ne sont jamais partagés.",
      facebook: "Les offres de services sont publiées automatique sur le groupe Facebook privé réservé aux membres",
      location: "Les données sauvergardées se trouvent dans des serveurs à Paspébiac QC Canada. Des backups se trouvent également à Bonaventure QC Canada."
    });
    return {}
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>

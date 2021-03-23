<template>
  <v-card flat>
    <v-card-title class="primary-color font-weight-bold">
      {{ $t('privacy:title') }}
    </v-card-title>
    <v-card-text>
      <p class="text-h6 font-weight-regular text-left">
        Les courriels, adresses, messenger, téléphones et transactions sont visibles par les autres membres.
      </p>
      <p class="text-h6 font-weight-regular text-left">
        Les courriels, adresses, genres, url messenger et téléphones sont visibles par tous les membres.
      </p>
      <p class="text-h6 font-weight-regular text-left">
        Les mots de passe ne sont jamais partagés.
      </p>
      <p class="text-h6 font-weight-regular text-left">
        Les données sauvergardées se trouvent dans des serveurs à Paspébiac.
        Des backups se trouvent également à Bonaventure.
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
      title: "Vie privée"
    });
    I18n.i18next.addResources("en", "privacy", {
      title: "Vie privée"
    });
    return {}
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<template>
  <div class="about">
    <v-parallax
        :src="require('@/assets/network-1246209_1920_black.jpg')"
    >
      <v-row
          align="center"
          justify="center"
          class="vh-center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="text-h1">{{ $t('about:vision') }}</h1>
          <h4 class="text-h5 subheading">{{ $t('about:vision2') }}</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <!--    <Login></Login>-->
    <v-row align="center" class="vh-center pt-6">
      <v-col class="text-center" cols="12" md="8">
        <v-img
            :src="require('@/assets/banner.png')"
        >
        </v-img>
      </v-col>
    </v-row>
    <v-row align="center" class="vh-center">
      <v-col class="text-center" cols="12" md="6">
        <v-card flat>
          <v-card-title class="text-center text-h5">
            <v-spacer></v-spacer>
            {{ $t('about:general1') }}
            <a class="pl-2" @click="whatIsTimeBank = true;">
              <v-badge
                  icon="mdi-help"
              >
                {{ $t('about:general2') }}
              </v-badge>
            </a>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-subtitle-1">
            <p>
              {{ $t('about:general3') }}
              <!--              Consultez la charte pour mieux comprendre quelle est l'intention-->
              <!--              du site internet, la vision du SEL de mer, ainsi que les principes qui guident le tout.-->
            </p>
            <p>
              {{ $t('about:general4') }}
              <a href="https://loco-local.net">{{$t('about:general5')}}</a>,
              {{ $t('about:general6') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="whatIsTimeBank"
        width="900"
    >
      <v-card>
        <v-card-title>
          {{ $t('') }}
        </v-card-title>
        <v-card-text>
          {{ $t('') }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {},
  data: function () {
    I18n.i18next.addResources("fr", "about", {
      vision: "S'entraider",
      vision2: "Avec une liste d'offres et demandes de services dans la Baie des Chaleurs",
      vision3: "Avec une monnaie locale pour offrir et reçevoir des services avec le principe 1 heure vaut 1 heure",
      general1: "Le SEL de mer est un",
      general2: "système d'échange de services",
      general3: "Ce site internet est un espace qui permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le groupe facebook privé.",
      general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et le",
      general5: "Loco Local",
      general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide."
    });
    I18n.i18next.addResources("en", "about", {
      vision: "S'entraider",
      vision2: "Avec une liste d'offres et demandes de services dans la Baie des Chaleurs",
      vision3: "Avec une monnaie locale pour offrir et reçevoir des services avec le principe 1 heure vaut 1 heure",
      general1: "Le SEL de mer est un",
      general2: "système d'échange de services",
      general3: "Ce site internet est un espace qui permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le groupe facebook privé.",
      general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et le",
      general5: "Loco Local",
      general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide."
    });
    return {
      whatIsTimeBank: false
    }
  }
}
</script>

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
              <a href="https://www.facebook.com/seldemer.gratis">
                <v-badge color="transparent">
                  <template v-slot:badge>
                    <img :src="require('@/assets/f_logo_RGB-Blue_58.png')" height="20">
                  </template>
                  {{ $t('about:general3A') }}
                </v-badge>
              </a>
            </p>
            <p>
              {{ $t('about:general4') }}
              <a href="https://loco-local.net">{{ $t('about:general5') }}</a>,
              {{ $t('about:general6') }}
            </p>
          </v-card-text>
        </v-card>
        <v-card>
          <v-tabs fixed-tabs v-model="aboutMembershipTabs"    icons-and-text>
            <v-tab>
              {{ $t('about:member1') }}
              <v-icon>how_to_reg</v-icon>
            </v-tab>
            <v-tab>
              {{ $t('about:plus1') }}
              <v-icon>star</v-icon>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="aboutMembershipTabs">
            <v-tab-item>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-badge>
                      <template v-slot:badge>
                        1
                      </template>
                      <v-icon>supervisor_account</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member2') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-badge>
                      <template v-slot:badge>
                        2
                      </template>
                      <v-icon>assignment</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member3') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-badge>
                      <template v-slot:badge>
                        3
                      </template>
                      <v-icon>card_membership</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member4') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-tab-item>
            <v-tab-item>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>people</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member2') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>assignment</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member3') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>card_membership</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>
                      {{ $t('about:member4') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="whatIsTimeBank"
        width="900"
    >
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-help_emoji_people</v-icon>
          {{ $t('about:member1') }}
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
      general3: "Ce site permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le",
      general3A: "groupe facebook privé",
      general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et",
      general5: "Horizons Gaspésiens",
      general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide.",
      member1: "Comment devenir membre",
      member2: "Prendre rendez-vous avec un administrateur",
      member3: "Lire et accepter la charte",
      member4: "Devenir membre de la coopérative de solidarité Horizons Gaspésiens",
      plus1: "Avantage d'être membre"
    });
    I18n.i18next.addResources("en", "about", {
      vision: "S'entraider",
      vision2: "Avec une liste d'offres et demandes de services dans la Baie des Chaleurs",
      vision3: "Avec une monnaie locale pour offrir et reçevoir des services avec le principe 1 heure vaut 1 heure",
      general1: "Le SEL de mer est un",
      general2: "système d'échange de services",
      general3: "Ce site permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le groupe facebook privé.",
      general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et",
      general5: "Horizons Gaspésiens",
      general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide.",
      member1: "Comment devenir membre",
      member2: "Rencontrer un administrateur",
      member3: "Lire et accepter la charte",
      member4: "Devenir membre de la coopérative de solidarité Horizons Gaspésiens",
      plus1: "Avantage d'être membre"
    });
    return {
      whatIsTimeBank: false,
      aboutMembershipTabs: null
    }
  }
}
</script>

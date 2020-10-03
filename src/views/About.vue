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
    <!--    <v-subheader class="text-subtitle-1">-->
    <!--      <v-spacer></v-spacer>-->
    <!--      <v-icon class="mr-2">star</v-icon>-->
    <!--      {{ $t('about:plus1') }}-->
    <!--      <v-spacer></v-spacer>-->
    <!--    </v-subheader>-->

    <!--    <v-card-title class="text-center text-h3">-->
    <!--      <v-spacer></v-spacer>-->
    <!--      {{ $t('about:general1') }}-->
    <!--      <v-spacer></v-spacer>-->
    <!--    </v-card-title>-->
    <!--    <v-card-subtitle class="text-h6 font-weight-regular">-->
    <!--      {{ $t('about:generalSubtitle') }}-->
    <!--    </v-card-subtitle>-->
    <v-row align="center" class="vh-center">
      <v-col class="text-center" cols="12">
        <v-card-text class="text-h6 font-weight-regular vh-center">
          <v-list>
            <v-list-item v-if="$vuetify.breakpoint.mdAndUp">
              <v-list-item-icon>
                <v-icon large>list</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-md-h6 font-weight-regular">
                  {{ $t('about:plusOffers') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$vuetify.breakpoint.smAndDown">
              <v-list-item-icon>
                <v-icon large>list</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-sm-body-1 font-weight-regular">
                  {{ $t('about:plusOffersMobile') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('about:plusOffersSubtitleMobile') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon large>hourglass_bottom</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
                  {{ $t('about:plusTransactions') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-badge overlap>
                  <template slot="badge">
                    5
                  </template>
                  <v-icon large>money</v-icon>
                </v-badge>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
                  {{ $t('about:plus5Hours') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$vuetify.breakpoint.mdAndUp">
              <v-list-item-icon>
                <v-icon large>emoji_people</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
                  {{ $t('about:plusRequests') }}
                  <a href="https://www.facebook.com/seldemer.gratis">
                    <v-badge color="transparent" inline>
                      <template v-slot:badge>
                        <img :src="require('@/assets/f_logo_RGB-Blue_58.png')" height="20">
                      </template>
                      {{ $t('about:plusRequestsFacebook') }}
                    </v-badge>
                  </a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!--            <p>-->
          <!--              {{ $t('about:general3') }}-->
          <!--              <a href="https://www.facebook.com/seldemer.gratis">-->
          <!--                <v-badge color="transparent">-->
          <!--                  <template v-slot:badge>-->
          <!--                    <img :src="require('@/assets/f_logo_RGB-Blue_58.png')" height="20">-->
          <!--                  </template>-->
          <!--                  {{ $t('about:general3A') }}-->
          <!--                </v-badge>-->
          <!--              </a>-->
          <!--            </p>-->
          <!--            <p>-->
          <!--              {{ $t('about:general4') }}-->
          <!--              <a href="https://loco-local.net">{{ $t('about:general5') }}</a>,-->
          <!--              {{ $t('about:general6') }}-->
          <!--            </p>-->
        </v-card-text>
        <v-card class="pb-0" flat>
          <v-card-actions class="vh-center">
            <v-btn
                color="primary"
                x-large
                class="pa-8 font-weight-bold pl-16 pr-16"
            >
              <v-icon class="mr-4 how_to_reg" x-large></v-icon>
              {{$t('about:becomeMember')}}
            </v-btn>
          </v-card-actions>
          <v-row align="center" class="vh-center">
            <v-col class="text-center" cols="12" md="8">
              <v-img
                  :src="require('@/assets/banner.png')"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" class="vh-center">
      <v-col class="text-center" cols="6">
        <v-card>
          <v-card-text class="vh-center">
            <v-list subheader>
              <v-subheader class="text-md-h5 text-sm-subtitle-1 font-weight-regular mb-7">
                <v-spacer></v-spacer>
                <v-icon x-large>how_to_reg</v-icon>
                {{ $t('about:member1') }}
                <v-spacer></v-spacer>
              </v-subheader>
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
                  <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
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
                  <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
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
                  <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">
                    {{ $t('about:member4') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
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
      becomeMember: "Devenez membre !",
      general1: "SEL de Mer",
      generalSubtitle: "Échanges de services avec le principe une heure vaut une heure",
      general2: "système d'échange de services",
      // general3: "Ce site permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le",
      plusOffers: "Consultez les offres de la Baie des Chaleurs et ajouter la votre",
      plusOffersMobile: "Consultez les offres de la BDC",
      plusOffersSubtitleMobile: "Et ajouter la votre",
      plusTransactions: "Enregistrez des transactions d'heures",
      plus5Hours: "Obtenez 5 heures de service à l'enregistrement",
      plusRequests: "Consultez les demandes de services sur le",
      plusRequestsFacebook: "groupe facebook privé",
      // general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et",
      // general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide.",
      member1: "Pour devenir membre",
      member2: "Prendre rendez-vous avec un administrateur",
      member3: "Lire et accepter la charte",
      member4: "Devenir membre de la coopérative de solidarité Horizons Gaspésiens",
      plus1: "Le SEL de mer vous permet de"
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

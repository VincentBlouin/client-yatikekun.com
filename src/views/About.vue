<template>
  <div class="about">
    <!--    image src =https://pixabay.com/photos/ant-ants-insect-nature-animal-5849574-->
    <v-parallax
        :src="require('@/assets/ant-5849574_1920-miroir.jpg')"
        height="800"
    >
      <v-row
          align="center"
          justify="center"
          class="vh-center"
      >
        <v-col class="text-left" cols="12" :class="{
          'ml-16 pl-12': $vuetify.breakpoint.mdAndUp
        }">
          <h1 class="vision-font" :class="{
            'vision-small-font' : $vuetify.breakpoint.smAndDown,
            'vision-bigger-font' : $vuetify.breakpoint.mdAndUp
          }">{{ $t('about:vision') }}</h1>
          <h4 class="vision-sub-font">{{ $t('about:vision2') }}</h4>
          <!--          <h4 class="vision-sub-font">{{ $t('about:vision3') }}</h4>-->
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
    <v-row align="center">
      <v-col cols="4" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
      <v-col cols="12" class="col-md-8 text-center">
        <v-card-text class="text-h6 font-weight-regular vh-center">
          <v-list three-line :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }" color="transparent">
            <v-list-item :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }">
              <v-list-item-icon>
                <v-icon :large="$vuetify.breakpoint.smAndDown" :x-large="$vuetify.breakpoint.mdAndUp">support</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('about:plusHelp') }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plusHelpOffer') }}<br>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plusHelpRequest') }}
                  <a href="https://www.facebook.com/groups/578440053119292">
                    <span class="mr-2">{{ $t('about:plusHelpRequestFacebook') }}</span>
                    <img :src="require('@/assets/f_logo_RGB-Blue_58.png')" height="20" style="margin-bottom:-3px;">
                  </a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }">
              <v-list-item-icon>
                <v-icon :large="$vuetify.breakpoint.smAndDown" :x-large="$vuetify.breakpoint.mdAndUp">emoji_emotions
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('about:plusUseful') }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plusUsefulHelp') }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plusUsefulSkills') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }">
              <v-list-item-icon>
                <v-icon :large="$vuetify.breakpoint.smAndDown" :x-large="$vuetify.breakpoint.mdAndUp">money</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('about:plusMoney') }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plusLocalCurrency') }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">
                  {{ $t('about:plus5SEL') }}
                </v-list-item-subtitle>
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
      </v-col>
    </v-row>
    <v-row align="center" class="vh-center" id="becomeMember">
      <v-col cols="12" class="col-md-6 text-center">
        <v-card :flat="!isShowHowToBecomeMember" color="transparent">
          <v-card-actions class="vh-center">
            <v-btn
                color="primary"
                x-large
                class="pa-8 font-weight-bold pr-16 pl-16 text-h6 font-weight-regular text-md-h6"
                @click="toggleEnterBecomeMemberFlow()"
            >
              <v-icon class="mr-4" x-large>how_to_reg</v-icon>
              {{ $t('about:becomeMember') }}
              <v-spacer></v-spacer>
              <v-icon right v-if="isShowHowToBecomeMember" large class="pl-4">expand_less</v-icon>
              <v-icon right v-else large class="pl-4">expand_more</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <v-row align="center" v-if="isShowHowToBecomeMember">
              <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
              <v-col cols="12" class="col-md-8">
                <v-list class="text-left" subheader>
                  <v-list-item :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }" href="https://docs.google.com/forms/d/e/1FAIpQLSf0Z1IH1lYZ8sL-4umROhOXSJ83NIAzIbIAWAlMvGaE7mM7eg/viewform?vc=0&c=0&w=1&flr=0">
                    <v-list-item-icon>
                      <v-badge>
                        <template v-slot:badge>
                          1
                        </template>
                        <v-icon large>card_membership</v-icon>
                      </v-badge>
                    </v-list-item-icon>
                    <v-list-item-content class="text-left">
                      <v-list-item-title class="text-h6 text-md-h5 font-weight-regular">
                        {{ $t('about:member4') }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item :class="{
            'pl-0 pr-0': $vuetify.breakpoint.smAndDown
          }" to="/charte">
                    <v-list-item-icon>
                      <v-badge>
                        <template v-slot:badge>
                          2
                        </template>
                        <v-icon large>assignment</v-icon>
                      </v-badge>
                    </v-list-item-icon>
                    <v-list-item-content class="text-left">
                      <v-list-item-title class="text-h6 text-md-h5 font-weight-regular">
                        {{ $t('about:member3') }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-subheader class="text-h6 text-md-h5 font-weight-regular black--text">
                    <v-badge>
                      <template v-slot:badge>
                        3
                      </template>
                      <v-icon large>supervisor_account</v-icon>
                    </v-badge>
                    <span class="ml-4">
                      {{ $t('about:member2') }}
                    </span>
                  </v-subheader>
                  <v-list-group
                      :value="true"
                  >
                    <template v-slot:activator>
                      <v-list-item-avatar>
                        <v-avatar>
                          <img
                              :src="require('@/assets/arielle-petit-carre.jpg')"
                              alt="Arielle Paiement"
                          >
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-subtitle-1 text-md-h6 font-weight-regular">
                          Arielle Paiement
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item href="mailto:partageheurebdc@gmail.com" :class="{
                      'ml-12' : $vuetify.breakpoint.mdAndUp
                    }">
                      <v-list-item-icon>
                        <v-icon>email</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="text-subtitle-1 text-md-h6 font-weight-regular">
                        partageheurebdc@gmail.com
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item href="tel:581-886-1691" :class="{
                      'ml-12' : $vuetify.breakpoint.mdAndUp
                    }">
                      <v-list-item-icon>
                        <v-icon>phone</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="text-subtitle-1 text-md-h6 font-weight-regular">
                        581-886-1691
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                  <!--                  <v-list-item class="ml-8" href="tel:555-555-5555">-->
                  <!--                    <v-list-item-avatar>-->
                  <!--                      <v-avatar color="primary" dark>-->
                  <!--                        <span class="white&#45;&#45;text headline">DO</span>-->
                  <!--                      </v-avatar>-->
                  <!--                    </v-list-item-avatar>-->
                  <!--                    <v-list-item-content>-->
                  <!--                      <v-list-item-title class="text-h6 font-weight-regular">-->
                  <!--                        Donna Lévesque-->
                  <!--                      </v-list-item-title>-->
                  <!--                      <v-list-item-subtitle class="text-subtitle-1">-->
                  <!--                        555-555-5555-->
                  <!--                      </v-list-item-subtitle>-->
                  <!--                    </v-list-item-content>-->
                  <!--                  </v-list-item>-->
                  <!--                  <v-list-item class="ml-8" href="tel:581-886-4000">-->
                  <!--                    <v-list-item-avatar>-->
                  <!--                      <v-avatar color="primary" dark>-->
                  <!--                        <span class="white&#45;&#45;text headline">FA</span>-->
                  <!--                      </v-avatar>-->
                  <!--                    </v-list-item-avatar>-->
                  <!--                    <v-list-item-content>-->
                  <!--                      <v-list-item-title class="text-h6 font-weight-regular">-->
                  <!--                        Fatou Minot-->
                  <!--                      </v-list-item-title>-->
                  <!--                      <v-list-item-subtitle class="text-subtitle-1">-->
                  <!--                        581-886-4000-->
                  <!--                      </v-list-item-subtitle>-->
                  <!--                    </v-list-item-content>-->
                  <!--                  </v-list-item>-->
                  <!--                  <v-list-item class="ml-8" href="tel:418-751-3103">-->
                  <!--                    <v-list-item-avatar>-->
                  <!--                      <v-avatar>-->
                  <!--                        <img-->
                  <!--                            :src="require('@/assets/gaby-petit-carre.jpg')"-->
                  <!--                            alt="Gabrielle Margineanu"-->
                  <!--                        >-->
                  <!--                      </v-avatar>-->
                  <!--                    </v-list-item-avatar>-->
                  <!--                    <v-list-item-content>-->
                  <!--                      <v-list-item-title class="text-subtitle-1 text-md-h6 font-weight-regular">-->
                  <!--                        Gabrielle Margineanu-->
                  <!--                      </v-list-item-title>-->
                  <!--                      <v-list-item-subtitle class="text-subtitle-1 text-md-h6 font-weight-regular">-->
                  <!--                        418-751-3103-->
                  <!--                      </v-list-item-subtitle>-->
                  <!--                    </v-list-item-content>-->
                  <!--                  </v-list-item>-->
                  <!--                  <v-list-item class="ml-8" href="tel:581-233-9481">-->
                  <!--                    <v-list-item-avatar>-->
                  <!--                      <v-avatar>-->
                  <!--                        <img-->
                  <!--                            :src="require('@/assets/chenzo2-petit-carre.jpg')"-->
                  <!--                            alt="Vincent Blouin"-->
                  <!--                        >-->
                  <!--                      </v-avatar>-->
                  <!--                    </v-list-item-avatar>-->
                  <!--                    <v-list-item-content>-->
                  <!--                      <v-list-item-title class="text-h6 font-weight-regular">-->
                  <!--                        Vincent Blouin-->
                  <!--                      </v-list-item-title>-->
                  <!--                      <v-list-item-subtitle class="text-subtitle-1">-->
                  <!--                        581-233-9481-->
                  <!--                      </v-list-item-subtitle>-->
                  <!--                    </v-list-item-content>-->
                  <!--                  </v-list-item>-->
                </v-list>
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" class="vh-center pb-16">
      <v-col class="text-center" cols="12" md="8">
        <v-img
            :src="require('@/assets/banner-transparent.png')"
        >
        </v-img>
      </v-col>
    </v-row>
    <!--    <v-list-item v-if="$vuetify.breakpoint.mdAndUp">-->
    <!--      <v-list-item-icon>-->
    <!--        <v-icon large>emoji_people</v-icon>-->
    <!--      </v-list-item-icon>-->
    <!--      <v-list-item-content class="text-left">-->
    <!--        <v-list-item-title class="text-md-h6 text-sm-body-1 font-weight-regular">-->
    <!--          {{ $t('about:plusRequests') }}-->
    <!--          <a href="https://www.facebook.com/seldemer.gratis">-->
    <!--            <v-badge color="transparent" inline>-->
    <!--              <template v-slot:badge>-->
    <!--                <img :src="require('@/assets/f_logo_RGB-Blue_58.png')" height="20">-->
    <!--              </template>-->
    <!--              {{ $t('about:plusRequestsFacebook') }}-->
    <!--            </v-badge>-->
    <!--          </a>-->
    <!--        </v-list-item-title>-->
    <!--      </v-list-item-content>-->
    <!--    </v-list-item>-->
  </div>
</template>
<script>
import I18n from "@/i18n";
import VueScrollTo from 'vue-scrollto'

export default {
  components: {},
  data: function () {
    I18n.i18next.addResources("fr", "about", {
      vision: "S'entraider",
      vision2: "Avec une liste d'offres et demandes de services",
      vision3: "dans la Baie des Chaleurs",
      // vision3: "Avec une monnaie locale pour offrir et reçevoir des services avec le principe 1 heure vaut 1 heure",
      becomeMember: "Devenez membre !",
      general1: "SEL de Mer",
      generalSubtitle: "Échanges de services avec le principe une heure vaut une heure",
      general2: "système d'échange de services",
      // general3: "Ce site permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le",
      plusHelp: "Obtenez de l'aide",
      plusHelpOffer: "Accédez à une liste d'offres de services dans la Baie des Chaleurs.",
      plusHelpRequest: "Faites des demandes de service sur le",
      plusHelpRequestFacebook: "groupe Facebook privé",
      plusOffers: "Consultez les offres de la Baie des Chaleurs et ajouter la votre",
      plusUseful: "Sentez-vous utile",
      plusUsefulHelp: "Aidez des gens dans la Baie des Chaleurs.",
      plusUsefulSkills: "Faites aussi valoir vos compétences.",
      plusMoney: "Créez de la richesse",
      plusLocalCurrency: "Contribuez à l'économie locale avec une monnaie locale.",
      plus5SEL: "Obtenez 5 heures de services à l'enregistrement.",
      plusOffersMobile: "Consultez les offres de la BDC",
      plusOffersSubtitleMobile: "Et ajouter la votre",
      plusTransactions: "Enregistrez des transactions d'heures",
      plus5Hours: "Obtenez 5 heures de service à l'enregistrement",
      plusRequests: "Consultez les demandes de services sur le",
      plusRequestsFacebook: "groupe facebook privé",
      // general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et",
      // general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide.",
      member1: "Pour devenir membre",
      member2: "Prendre rdv avec un administrateur",
      member3: "Lire et accepter la charte",
      member4: "Adhérez à Horizons Gaspésiens",
      plus1: "Le SEL de mer vous permet de"
    });
    I18n.i18next.addResources("en", "about", {
      vision: "S'entraider",
      vision2: "Avec une liste d'offres et demandes de services",
      vision3: "dans la Baie des Chaleurs",
      // vision3: "Avec une monnaie locale pour offrir et reçevoir des services avec le principe 1 heure vaut 1 heure",
      general1: "Le SEL de mer est un",
      general2: "système d'échange de services",
      general3: "Ce site permet d'afficher des offres de services ainsi que d'enregistrer des transactions d'heures. Les demandes se réalisent sur le groupe facebook privé.",
      general4: "C'est un projet porté par un groupe de citoyennes et de citoyens et",
      general5: "Horizons Gaspésiens",
      general6: "avec l'objectif de réduire la pauvreté et d'augmenter l'entraide.",
      member1: "Comment devenir membre",
      member2: "Rencontrer un administrateur",
      member3: "Lire et accepter la charte",
      member4: "Adhérez à Horizons Gaspésiens",
      plus1: "Avantage d'être membre"
    });
    return {
      aboutMembershipTabs: null,
      isShowHowToBecomeMember: false
    }
  },
  methods: {
    toggleEnterBecomeMemberFlow: function () {
      if (this.isShowHowToBecomeMember) {
        this.isShowHowToBecomeMember = false;
        return;
      }
      this.$store.dispatch("setIsBecomeMember", true);
    }
  },
  computed: {
    isBecomeMemberFlow: function () {
      return this.$store.state.isBecomeMember;
    }
  },
  watch: {
    isBecomeMemberFlow: function () {
      if (!this.$store.state.isBecomeMember) {
        return;
      }
      VueScrollTo.scrollTo(
          document.getElementById("becomeMember"), 500, {
            easing: 'linear',
            offset: -60
          }
      );
      this.isShowHowToBecomeMember = true;
      this.$store.dispatch("setIsBecomeMember", false);
    }
  }
}
</script>

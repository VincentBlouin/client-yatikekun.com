<template>
  <div id="app">
    <v-app class="background-color" >
      <v-app-bar app flat :class="{
        'yellow-background': $route.name === 'About',
      }" >
        <!--        <v-toolbar-title class="pr-4">-->
        <!--          <router-link to="/about">-->
        <!--            <img-->
        <!--                height="55"-->
        <!--                :src="require('@/assets/logo_sel_de_mer_gros.png')"-->
        <!--            >-->
        <!--          </router-link>-->
        <!--        </v-toolbar-title>-->
        <v-toolbar-title class="text-h5 pt-2 pb-2">
          <router-link to="/a-propos" class="logo-font blue-title"
                       style="font-size: 31px;">
            PartageHeure.com
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn text
                 v-if="$store.state.user !== null && $store.state.user.status === 'admin'"
                 to="/membres">
            <v-icon left color="blueTitle">people</v-icon>
            <span class="blue-title">
                  {{ $t('app:members') }}
            </span>
          </v-btn>
          <v-btn text v-if="$store.state.user !== null" to="/offres">
            <span class="mr-2">🌈</span>
            <span class="blue-title">
              {{ $t('app:offers') }}
            </span>
          </v-btn>
          <v-btn text v-if="$store.state.user !== null" to="/transactions">
            <v-icon left color="blueTitle">attach_money</v-icon>
            <span class="blue-title">
              {{ $t('app:yourTransactions') }}
            </span>
          </v-btn>
          <v-btn text v-if="$store.state.user === null" @click="becomeMember">
            <v-icon left color="blueTitle">how_to_reg</v-icon>
            <span class="blue-title">
              {{ $t('app:becomeMember') }}
            </span>
          </v-btn>
          <v-btn text v-if="$store.state.user === null" to="/connexion">
            <v-icon left color="blueTitle">login</v-icon>
            <span class="blue-title">
              {{ $t('app:login') }}
            </span>
          </v-btn>
          <v-btn text to="/charte">
            <v-icon left color="blueTitle">assignment</v-icon>
            <span class="blue-title">
              {{ $t('app:charter') }}
            </span>
          </v-btn>
          <v-btn text href="https://www.facebook.com/groups/578440053119292" v-if="$store.state.user !== null">
            <v-icon color="facebook" left>facebook</v-icon>
            <span class="blue-title">
              {{ $t('app:facebookGroup') }}
            </span>
          </v-btn>
          <v-menu
              bottom
              left
              nudge-bottom="50"
              v-if="$store.state.user !== null"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon color="blueTitle">account_circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/vos-offres">
                <v-list-item-action>
                  🌈
                </v-list-item-action>
                <v-list-item-title>
                  {{ $t('app:yourOffers') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/offre">
                <v-list-item-action>
                  <v-icon>add</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  {{ $t('app:addOffer') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="'/membre/'+ $store.state.user.uuid">
                <v-list-item-avatar>
                  <v-avatar color="primary" dark size="35">
                      <span class="white--text">
                        {{ initials }}
                      </span>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-title>
                  {{ $t('app:informations') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-action>
                  <v-icon>exit_to_app</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  {{ $t('app:logout') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="black--text"
                            v-if="$vuetify.breakpoint.smAndDown"></v-app-bar-nav-icon>
        <v-navigation-drawer
            clipped
            v-model="drawer"
            enable-resize-watcher
            fixed
            app
            dense
            hide-overlay
            light
        >
          <v-list>
            <v-list-item v-if="$store.state.user !== null && $store.state.user.status === 'admin'">
              <v-list-item-action>
                <v-icon>people</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text to="/membres">
                    {{ $t('app:members') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user !== null">
              <v-list-item-action>
                🌈
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text to="/offres">
                    {{ $t('app:offers') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/offre">
              <v-list-item-action>
                <v-btn
                    color="primary"
                    fab
                    dark
                    x-small
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text>
                    {{ $t('app:addOffer') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user !== null">
              <v-list-item-action>
                <v-icon>list</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text to="/transactions">
                    {{ $t('app:yourTransactions') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user !== null" href="https://www.facebook.com/groups/578440053119292">
              <v-list-item-action>
                <v-icon color="facebook">facebook</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text href="https://www.facebook.com/groups/578440053119292">
                    {{ $t('app:facebookGroup') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user === null">
              <v-list-item-action>
                <v-icon>how_to_reg</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn @click="becomeMember" text class="black--text">{{ $t('app:becomeMember') }}</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user === null">
              <v-list-item-action>
                <v-icon>login</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn to="/connexion" text class="black--text">
                    {{ $t('app:login') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn to="/charte" text class="black--text">
                    {{ $t('app:charter') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.user !== null">
              <v-list-item-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn @click="logout" text class="black--text">
                    {{ $t('app:logout') }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-app-bar>
      <router-view/>
    </v-app>
    <v-footer
        fixed
        class="font-weight-medium"
        dark
    >
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} —
        <strong>
          <a href="https://horizonsgaspesiens.net" style="color:white; text-decoration: none;">
            Horizons Gaspésiens
          </a>
        </strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import I18n from "@/i18n";
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

export default {
  mounted: async function () {
    await this.$store.dispatch('setLocale', "fr");
    this.$vuetify.lang.current = this.$store.state.locale;
  },
  methods: {
    logout: function () {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push('/connexion');
    },
    becomeMember: async function () {
      const isOnAboutPage = "About" === this.$router.currentRoute.name;
      if (!isOnAboutPage) {
        await this.$router.push('/a-propos')
      }
      this.$store.dispatch("setIsBecomeMember", true);
    }
  },
  data: function () {
    I18n.i18next.addResources("fr", "app", {
      becomeMember: "Devenez membre",
      login: "Connexion",
      logout: "Déconnecter",
      charter: "Charte",
      offers: "Offres",
      yourTransactions: "Transactions",
      members: "Membres",
      informations: "Informations",
      yourOffers: "Vos offres",
      addOffer: "Ajouter offre",
      facebookGroup: "Notre groupe"
    });
    I18n.i18next.addResources("en", "app", {
      becomeMember: "Devenez membre",
      login: "Connexion",
      logout: "Déconnecter",
      charter: "Charte",
      offers: "Offres",
      yourTransactions: "Transactions",
      members: "Membres",
      informations: "Informations",
      yourOffers: "Vos offres",
      addOffer: "Ajouter offre",
      facebookGroup: "Notre groupe"
    });
    return {
      drawer: false
    };
  },
  computed: {
    initials: function () {
      const fullname = this.$store.state.user.firstname + " " + this.$store.state.user.lastname;
      return fullname.split(" ").map((n) => n[0]).join("");
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.vh-center {
  display: flex;
  align-items: center;
  justify-content: center;
}


.h-right {
  display: flex;
  justify-content: flex-end;
}

.primary-color {
  color: #177C72
}

.blue-title {
  color: #17347c !important;
}

@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@800&family=Otomanopee+One&family=Crimson+Text&display=swap&display=swap');
.logo-font {
  font-family: 'Dosis', sans-serif;
  text-decoration: none !important;
  //text-shadow:
  //    -1px -1px 0 #17347c,
  //    0   -1px 0 #17347c,
  //    1px -1px 0 #17347c,
  //    1px  0   0 #17347c,
  //    1px  1px 0 #17347c,
  //    0    1px 0 #17347c,
  //    -1px  1px 0 #17347c,
  //    -1px  0   0 #17347c;
}

.vision-small-font{
  font-size: 3em;
}

.vision-bigger-font{
  font-size: 6em;
}
.vision-font {
  font-family: 'Otomanopee One', sans-serif !important;
  letter-spacing: 3px;
}

.yellow-background {
  background-color: #fcff2a59 !important;
}

.background-color {
  //background-color: #fcff2a59 !important;
  //background-color: white !important;
}

.background-color-transparent {
  background-color: transparent;
}

.vision-sub-font {
  font-family: 'Dosis', sans-serif;
  font-size: 34px;
}

</style>

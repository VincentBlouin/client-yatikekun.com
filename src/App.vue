<template>
  <div id="app">
    <v-app>
      <v-app-bar app flat>
        <!--        <v-toolbar-title class="pr-4">-->
        <!--          <router-link to="/about">-->
        <!--            <img-->
        <!--                height="55"-->
        <!--                :src="require('@/assets/logo_sel_de_mer_gros.png')"-->
        <!--            >-->
        <!--          </router-link>-->
        <!--        </v-toolbar-title>-->
        <v-toolbar-title class="text-h5">
          <router-link to="/à-propos">
            partageheure.com
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn text
                 v-if="$store.state.user !== null && $store.state.user.status === 'admin'"
                 to="/membres">
            <v-icon left>people</v-icon>
            {{ $t('app:members') }}
          </v-btn>
          <v-btn text v-if="$store.state.user !== null" to="/offres">
            <span class="mr-2">🌈</span>
            {{ $t('app:offers') }}
          </v-btn>
          <v-btn text v-if="$store.state.user !== null" to="/transactions">
            <v-icon left>attach_money</v-icon>
            {{ $t('app:yourTransactions') }}
          </v-btn>
          <v-btn text v-if="$store.state.user === null" @click="becomeMember">
            <v-icon left>how_to_reg</v-icon>
            {{ $t('app:becomeMember') }}
          </v-btn>
          <v-btn text v-if="$store.state.user === null" to="/connexion">
            <v-icon left>login</v-icon>
            {{ $t('app:login') }}
          </v-btn>
          <v-btn text to="/charte">
            <v-icon left>assignment</v-icon>
            {{ $t('app:charter') }}
          </v-btn>
          <v-btn text href="https://www.facebook.com/groups/578440053119292" color="facebook">
            <v-icon color="facebook">facebook</v-icon>
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
                <v-icon>account_circle</v-icon>
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
      const isOnAboutPage = ["About", "Welcome"].indexOf(this.$router.currentRoute.name) > -1;
      if (!isOnAboutPage) {
        await this.$router.push('/à-propos')
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
      yourOffers: "Vos offres"
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
      yourOffers: "Vos offres"
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
  color: #2e7d32
}
</style>

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
            seldemer.org
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-if="$vuetify.breakpoint.mdAndUp && $store.state.user !== null && $store.state.user.status === 'admin'" to="/membres">
          <v-icon class="mr-2">people</v-icon>
          {{ $t('app:members') }}
        </v-btn>
        <v-btn text v-if="$vuetify.breakpoint.mdAndUp && $store.state.user !== null" to="/offres">
          {{ $t('app:offers') }}
        </v-btn>
        <v-btn text v-if="$vuetify.breakpoint.mdAndUp && $store.state.user === null" @click="becomeMember">
          <v-icon class="mr-2">how_to_reg</v-icon>
          {{ $t('app:becomeMember') }}
        </v-btn>
        <v-btn text v-if="$vuetify.breakpoint.mdAndUp && $store.state.user === null" to="/connexion">
          <v-icon class="mr-2">login</v-icon>
          {{ $t('app:login') }}
        </v-btn>
        <v-btn text to="/charte" v-if="$vuetify.breakpoint.mdAndUp">
          <v-icon class="mr-2">assignment</v-icon>
          {{ $t('app:charter') }}
        </v-btn>
        <v-menu
            bottom
            left
            nudge-bottom="50"
            v-if="$vuetify.breakpoint.mdAndUp && $store.state.user !== null"
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
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text to="/offres">
                    {{ $t('app:offers') }}
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

export default {
  mounted: function () {
    this.$store.dispatch('setLocale', "fr");
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
      members: "Membres"
    });
    I18n.i18next.addResources("en", "app", {
      becomeMember: "Devenez membre",
      login: "Connexion",
      logout: "Déconnecter",
      charter: "Charte",
      offers: "Offres",
      members: "Membres"
    });
    return {
      drawer: false
    };
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

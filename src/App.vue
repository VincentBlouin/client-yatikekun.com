<template>
  <div id="app">
    <v-app>
      <v-app-bar>
<!--        <v-toolbar-title class="pr-4">-->
<!--          <router-link to="/about">-->
<!--            <img-->
<!--                height="55"-->
<!--                :src="require('@/assets/logo_sel_de_mer_gros.png')"-->
<!--            >-->
<!--          </router-link>-->
<!--        </v-toolbar-title>-->
        <v-toolbar-title class="text-h5">
          <router-link to="/about">
            seldemer.org
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
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
export default {
  mounted: function () {
    this.$store.dispatch('setLocale', "fr");
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

.primary-color {
  color: #2e7d32
}
</style>

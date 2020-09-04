<template>
  <div id="app">
    <v-app>
      <v-app-bar>
        <v-toolbar-title>
          <router-link to="/about">yatukekun.com</router-link>
        </v-toolbar-title>
      </v-app-bar>
      <router-view/>
    </v-app>
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
</style>

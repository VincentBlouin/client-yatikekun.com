<template>
  <v-row justify="center"
         style="margin-top:64px;margin-bottom:120px;"
         :class="{
          'pl-4 pr-4' : $vuetify.breakpoint.smAndDown
    }">
    <v-col cols="12" md="10" xl="6" class="text-center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageWrap"
}
</script>

<style scoped>

</style>

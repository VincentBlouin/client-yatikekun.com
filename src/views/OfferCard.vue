<template>
  <v-card flat class="" max-width="375" color="transparent" :width="width" :max-height="maxHeight" :class="{
     'pl-8 pr-8': $vuetify.breakpoint.mdAndUp,
     'pl-0 pr-0': $vuetify.breakpoint.smAndDown
  }">
    <v-card-actions class="h-center pb-0" v-if="isAvailableSwitch">
      <v-spacer></v-spacer>
      <v-switch
          v-model="offer.isAvailable"
          :label="$t('yourOffer:isAvailable')"
          color="primary"
          right
          @click.prevent="updateOffer()"
      ></v-switch>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card flat class="text-center" :to="link" @click="$emit('customAction')" color="transparent">
      <v-img
          height="175"
          v-if="offer.image"
          :src="getCustomImageUrl(offer.image)"
          :alt="offer.image.name"
      ></v-img>
      <v-img
          height="175"
          v-if="offer.customImage"
          :src="getCustomImageUrl(offer.customImage)"
      ></v-img>
      <v-card-text class="subtitle-1 text-right pl-0 pr-0 pb-0 pt-0 font-italic">
        {{ $t(offer.User.subRegion) }}
      </v-card-text>
      <v-card-text class="subtitle-1 text-left pl-0 pr-0 pt-0" v-html="offer.description">
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Images from "@/Images";
import OfferService from "@/offer/OfferService";

export default {
  name: "OfferCard",
  props: ['offer', 'width', 'dense', 'customAction', 'isAvailableSwitch'],
  data: function () {
    return {
      maxHeight: "auto",
      link: null
    };
  },
  mounted: function () {
    if (this.width === null) {
      this.width = "auto";
    }
    this.maxHeight = this.dense ? "350" : "auto";
    this.link = this.customAction ? null : '/consulter-offre/' + this.offer.id
  },
  methods: {
    getCustomImageUrl: function (customImage) {
      return Images.getCustomBase64Url(customImage);
    },
    updateOffer: function () {
      OfferService.update(this.offer);
    }
  }
}
</script>

<style scoped>

</style>

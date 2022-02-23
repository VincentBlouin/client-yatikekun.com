<template>
  <div>
    <v-btn
        @click="publishToFacebookGroup()"
        color="facebook"
        dark
        :loading="loading"
        :disabled="loading"
    >
      <v-icon left dark>facebook</v-icon>
      {{ $t('facebook:publish') }}
    </v-btn>
    <v-dialog v-model="confirmPublishDialog" width="600">
      <v-card>
        <v-card-title class="text-h6 font-weight-regular">
          {{ $t('facebook:reallyPublish') }}
          <v-spacer></v-spacer>
          <v-icon @click="confirmPublishDialog=false">close</v-icon>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="confirmPublishToFacebookGroup()" color="primary">
            <v-icon left>facebook</v-icon>
            {{ $t('confirm') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmPublishDialog=false">
            {{ $t('cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import I18n from "@/i18n";
import OfferService from "@/offer/OfferService";

const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;
const facebookGroupId = process.env.VUE_APP_FACEBOOK_GROUP_ID;

export default {
  name: "PublishOfferToFacebook",
  props: ['skipConfirmation', 'offerDescription', 'userSubRegion', 'offerId', 'offerImage', 'offerCustomImage'],
  data: function () {
    I18n.i18next.addResources("fr", "facebook", {
      publish: "Publier dans le groupe",
      reallyPublish: "Vraiment publier votre offre sur le groupe des membres?"
    });
    I18n.i18next.addResources("en", "facebook", {
      publish: "Publier dans le groupe",
      reallyPublish: "Vraiment publier votre offre sur le groupe des membres?"
    });
    return {
      confirmPublishDialog: false,
      loading: false
    }
  },
  mounted: function () {
    this.loading = false;
  },
  created: function () {
    console.log("created 1")
    window.fbAsyncInit = function () {
      console.log("created 2")
      console.log("facebook app id " + facebookAppId)
      window.FB.init({
        appId: facebookAppId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
      });
    };
    (function () {
      // console.log("created 3")
      let e = document.createElement('script');
      e.async = true;
      // console.log("created 4")
      e.src = document.location.protocol +
          '//connect.facebook.net/fr_CA/all.js#xfbml=1&version=v13.0';
      document.getElementById('fb-root').appendChild(e);
    }());
  },
  methods: {
    publishToFacebookGroup: function () {
      if (this.skipConfirmation) {
        this.confirmPublishToFacebookGroup();
      } else {
        this.confirmPublishDialog = true;
      }
    },
    confirmPublishToFacebookGroup: async function () {
      this.confirmPublishDialog = false;
      this.loading = true;
      console.log('facebook publish 1')
      if (window.FB === undefined) {
        return this.$emit('errorPublishedToFacebook');
      }
      window.FB.getLoginStatus(async (response) => {
        console.log('facebook publish 2')
        console.log(response.status);
        console.log(response.session);
        alert(response);
        if (response.status === 'connected') {
          console.log('facebook publish 3')
          await this.publishToFacebookGroupUsingAccessToken(
              response.authResponse.accessToken
          );
          await this.$emit('publishedToFacebook');
        } else {
          window.FB.login(async (response) => {
            if (response.authResponse) {
              console.log("facebook login 1");
              await this.publishToFacebookGroupUsingAccessToken(
                  response.authResponse.accessToken
              );
              await this.$emit('publishedToFacebook');
            } else {
              console.log("refused to login 2");
              await this.$emit('errorPublishedToFacebook');
            }
          });
        }
        this.loading = false;
      }, true);
      console.log('facebook publish 6')
    },
    publishToFacebookGroupUsingAccessToken: async function (accessToken) {
      if (window.FB === undefined || window.FB.API === undefined) {
        return this.$emit('errorPublishedToFacebook');
      }
      return window.FB.api('/v13.0/' + facebookGroupId + '/photos', 'post', {
        caption: this.offerDescription + " (" + this.$t(this.userSubRegion) + ")" + " https://www.partageheure.com/consulter-offre/" + this.offerId,
        url: OfferService.getMediumImageUrl(this.offerImage, this.offerCustomImage),
        accessToken: accessToken
      }).catch((error) => {
        alert(error)
        return this.$emit('errorPublishedToFacebook');
      });
    },
  }
}
</script>

<style scoped>

</style>

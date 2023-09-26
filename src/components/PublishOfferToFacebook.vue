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
        //careful with this log, security wise, because it includes access token.
        // console.log(JSON.stringify(response));
        if (response.status === 'connected') {
          console.log('facebook publish 3')
          const success = await this.publishToFacebookGroupUsingAccessToken(
              response.authResponse.accessToken
          );
          if (success) {
            await this.$emit('publishedToFacebook');
          } else {
            await this.$emit('errorPublishedToFacebook');
          }
        } else {
          window.FB.login(async (response) => {
            if (response.authResponse) {
              console.log("facebook login 1");
              const success = await this.publishToFacebookGroupUsingAccessToken(
                  response.authResponse.accessToken
              );
              if (success) {
                await this.$emit('publishedToFacebook');
              } else {
                await this.$emit('errorPublishedToFacebook');
              }
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
      console.log("publishToFacebookGroupUsingAccessToken 1")
      if (window.FB === undefined || window.FB.api === undefined) {
        console.log("publishToFacebookGroupUsingAccessToken 2")
        return false;
      }
      console.log("publishToFacebookGroupUsingAccessToken 3")
      return new Promise((resolve) => {
        window.FB.api('/v13.0/' + facebookGroupId + '/photos', 'post', {
          caption: this.offerDescription + " (" + this.$t(this.userSubRegion) + ")" + " https://www.partageheure.com/consulter-offre/" + this.offerId,
          url: OfferService.getMediumImageUrl(this.offerImage, this.offerCustomImage),
          accessToken: accessToken
        }, function (response) {
          console.log("publishToFacebookGroupUsingAccessToken 5")
          console.log(response);
          if (response.error) {
            console.log("publishToFacebookGroupUsingAccessToken 6")
            resolve(false);
          } else {
            console.log("publishToFacebookGroupUsingAccessToken 7")
            resolve(true);
          }
        });
      })
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <v-row
      align="center"
      justify="center"
      :class="{
        'pl-4 pr-4 mb-12': $vuetify.breakpoint.smAndDown,
        'pt-8 pb-8' : $vuetify.breakpoint.mdAndUp
      }"
  >
    <v-col cols="12" md="10" lg="9" xl="6" class="text-left">
      <v-form ref="loginForm">
        <v-alert
            :value="wrongLogin"
            type="error"
        >
          {{ $t('login:wrongLogin') }}
        </v-alert>
        <v-alert
            :value="userDisabledMessage"
            type="error"
        >
          {{ $t('login:userDisabled') }}
        </v-alert>
        <v-text-field
            v-model="user.email"
            :label="$t('login:email')"
            :rules="[Rules.required]"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.password"
            :rules="[Rules.required]"
            required
            :label="$t('login:password')"
            type="password"
        ></v-text-field>
        <v-btn
            color="primary"
            class="mr-4 pull-left"
            @click="login"
        >
          {{ $t('login:loginBtn') }}
        </v-btn>
        <div class="mt-4">
          <router-link to="/send-change-password-email">
            {{ $t('login:forgotPassword') }}
          </router-link>
        </div>
        <div class="mt-4">
          <v-btn @click="facebookLogin()" color="facebook" dark>
            <v-icon left>facebook</v-icon>
            {{ $t('login:loginWithFacebook') }}
          </v-btn>
        </div>
      </v-form>
      <!--      <RecaptchaInfo></RecaptchaInfo>-->
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import AuthenticateService from '@/service/AuthenticateService'
import Rules from '@/Rules'
import LoadingFlow from '@/LoadingFlow'
import Vue from 'vue'
import {VueReCaptcha} from "vue-recaptcha-v3"

const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

Vue.use(VueReCaptcha, {siteKey: process.env.VUE_APP_RECAPTCHA_KEY});

export default {
  name: "LoginForm",
  // components: {
  //   RecaptchaInfo: () => import('@/components/RecaptchaInfo')
  // },
  created: function () {
    window.fbAsyncInit = function () {
      // console.log("created 2")
      // console.log("facebook app id " + facebookAppId)
      window.FB.init({
        appId: facebookAppId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
      });
    };
    (function () {
      // console.log("created 3")
      let e = document.createElement('script');
      e.async = true;
      // console.log("created 4")
      e.src = document.location.protocol +
          '//connect.facebook.net/fr_CA/all.js#xfbml=1&version=v10.0';
      document.getElementById('fb-root').appendChild(e);
    }());
  },
  methods: {
    facebookLogin: function () {
      LoadingFlow.enter();
      window.FB.login(async (response) => {
        const loginResponse = await AuthenticateService.facebookLogin(response.authResponse);
        this.handleLoginResponse(loginResponse);
        LoadingFlow.leave();
      }, {scope: 'public_profile,email'});
    },
    login: async function () {
      this.wrongLogin = false;
      this.userDisabledMessage = false;
      this.robotDoubt = false;
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      LoadingFlow.enter();
      await this.$store.dispatch('setUser', null);
      let recaptchaToken = await this.$recaptcha("login");
      AuthenticateService.login(this.user, recaptchaToken).then((response) => {
        this.handleLoginResponse(response);
      }).catch((response) => {
        if (response.response.data.reason === "recaptcha score") {
          this.robotDoubt = true;
        } else if (response.response.data.error === " disabled") {
          this.userDisabledMessage = true;
        } else {
          this.wrongLogin = true;
        }
        LoadingFlow.leave();
      });
    },
    handleLoginResponse: function (response) {
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user);
      this.$emit('flow-is-done');
      Vue.nextTick(() => {
        this.$router.push({
          name: 'Offers',
          params: {
            username: response.data.user_name
          }
        });
        this.$recaptchaInstance.hideBadge();
        LoadingFlow.leave();
      });
    },
    hideRecaptchaBadge: function () {
      let interval = setInterval(() => {
        if (this.$recaptchaInstance) {
          this.$recaptchaInstance.hideBadge();
          clearInterval(interval);
        }
      }, 100)
    }
  },
  data: function () {
    I18n.i18next.addResources("en", "login", {
      email: 'Email',
      password: 'Password',
      loginBtn: "Login",
      wrongLogin: "Pas le bon courriel ou mot de passe, essayez de nouveau. Il se peut aussi que votre compte soit désactivé",
      userDisabled: "Votre compte est désactivé",
      forgotPassword: "Forgot password",
      loginWithFacebook: "Login with Facebook"
    });
    I18n.i18next.addResources("fr", "login", {
      email: 'Courriel',
      password: 'Mot de passe',
      loginBtn: "Connecter",
      wrongLogin: "Pas le bon courriel ou mot de passe, essayez de nouveau. Il se peut aussi que votre compte soit désactivé",
      userDisabled: "Votre compte est désactivé",
      forgotPassword: "Mot de passe oublié",
      loginWithFacebook: "Se connecter avec Facebook"
    });
    return {
      valid: true,
      user: {
        email: "",
        password: ""
      },
      wrongLogin: false,
      userDisabledMessage: false,
      Rules: Rules,
      forgotPasswordDialog: false,
      robotDoubt: false
    };
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.hideRecaptchaBadge();
  }
}
</script>

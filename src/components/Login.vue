<template>
  <v-container>

  </v-container>
</template>

<script>
import I18n from '@/i18n'
import AuthenticateService from '@/service/AuthenticateService'
import Rules from '@/Rules'
import LoadingFlow from '@/LoadingFlow'
import Vue from 'vue'
import {VueReCaptcha} from "vue-recaptcha-v3";

Vue.use(VueReCaptcha, {siteKey: process.env.VUE_APP_RECAPTCHA_KEY});

export default {
  name: "LoginForm",
  components: {
    RecaptchaInfo: () => import('@/components/RecaptchaInfo')
  },
  methods: {
    goToForgotPassword: function () {
      this.$emit('flow-is-done');
      Vue.nextTick(function () {
        this.$router.push(
            "/forgot-password"
        );
      }.bind(this))
    },
    login: async function () {
      this.wrongLogin = false;
      this.robotDoubt = false;
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      LoadingFlow.enter();
      await this.$store.dispatch('setUser', null);
      let recaptchaToken = await this.$recaptcha("login");
      AuthenticateService.login(this.user, recaptchaToken).then((response) => {
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data);
        this.$emit('flow-is-done');
        Vue.nextTick(() => {
          this.$router.push({
            name: 'UserHome',
            params: {
              username: response.data.user_name
            }
          });
          this.$recaptchaInstance.hideBadge();
          LoadingFlow.leave();
        });
      }).catch((response) => {
        if (response.response.data.reason === "recaptcha score") {
          this.robotDoubt = true;
        } else {
          this.wrongLogin = true;
        }
        LoadingFlow.leave();
      });
    },
    enter: function () {
      this.wrongLogin = false;
      this.user = {
        email: "",
        password: ""
      };
      this.$refs.loginForm.reset();
    },
    hideRecaptchaBadge: function () {
      let interval = setInterval(() => {
        if(this.$recaptchaInstance){
          this.$recaptchaInstance.hideBadge();
          clearInterval(interval);
        }
      }, 100)
    }
  },
  data: function () {
    I18n.i18next.addResources("en", "login", {
      title: "Mindrespect.com",
      email: 'Email',
      password: 'Password',
      loginBtn: "Login",
      wrongLogin: "Not right email or password, try again.",
      forgotPassword: "Forgot password"
    });
    I18n.i18next.addResources("fr", "login", {
      title: "Mindrespect.com",
      email: 'Courriel',
      password: 'Mot de passe',
      loginBtn: "Connecter",
      wrongLogin: "Pas le bon courriel ou mot de passe, essayez de nouveau.",
      forgotPassword: "Mot de passe oublié",
    });
    return {
      valid: true,
      user: {
        email: "",
        password: ""
      },
      wrongLogin: false,
      Rules: Rules,
      forgotPasswordDialog: false,
      robotDoubt: false
    };
  },
  mounted: function () {
      this.hideRecaptchaBadge();
  }
}
</script>

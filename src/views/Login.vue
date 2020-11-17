<template>
  <v-row
      align="center"
      justify="center"
      class="pt-8 pb-8"
  >
    <v-col cols="12" class="col-md-6 text-left">
      <v-form ref="loginForm">
        <v-alert
            :value="wrongLogin"
            type="error"
        >
          {{ $t('login:wrongLogin') }}
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
      </v-form>
      <RecaptchaInfo></RecaptchaInfo>
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
      await this.$store.dispatch('setUser', undefined);
      let recaptchaToken = await this.$recaptcha("login");
      AuthenticateService.login(this.user, recaptchaToken).then((response) => {
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
      }).catch((response) => {
        if (response.response.data.reason === "recaptcha score") {
          this.robotDoubt = true;
        } else {
          this.wrongLogin = true;
        }
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
      wrongLogin: "Not right email or password, try again.",
      forgotPassword: "Forgot password"
    });
    I18n.i18next.addResources("fr", "login", {
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
    window.scrollTo(0, 0);
    this.hideRecaptchaBadge();
  }
}
</script>

<template>
  <div>
    <v-row align="center" justify="center" class="vh-center">
      <v-col cols="12" class="col-md-6 text-center">
        <v-card flat class="mt-16 mb-16 pt-16">
          <v-card-text class="text-center pb-0">
            <v-form ref="memberForm" v-model="isFormValid">
              <v-text-field
                v-model="member.firstname"
                :label="$t('member:firstname')"
                required
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="member.lastname"
                :label="$t('member:lastname')"
                required
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="member.email"
                :label="$t('member:email')"
                prepend-icon="email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="member.facebookId"
                :label="$t('member:facebookId')"
                prepend-icon="facebook"
                required
                :rules="[]"
              ></v-text-field>
              <v-text-field
                v-model="member.region"
                :label="$t('member:region')"
                disabled
                required
              ></v-text-field>
              <v-select
                :items="subRegions"
                v-model="member.subRegion"
                :label="$t('member:subRegion')"
                required
                prepend-icon="map"
                :item-text="getSelectText"
                item-value="value"
                :rules="[rules.required]"
              >
                <template v-slot:item="{ item }">
                  {{ $t(item.value) }}
                </template>
              </v-select>
              <v-text-field
                v-model="member.phone1"
                :label="$t('member:phone1')"
                prepend-icon="phone"
                required
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="member.phone2"
                :label="$t('member:phone2')"
                prepend-icon="phone"
              ></v-text-field>
              <v-select
                :items="genders"
                v-model="member.gender"
                :label="$t('member:gender')"
                required
                prepend-icon="map"
                :item-text="getSelectText"
                item-value="value"
                :rules="[rules.required]"
              >
                <template v-slot:item="{ item }">
                  {{ $t(item.value) }}
                </template>
              </v-select>
              <v-text-field
                v-model="member.address"
                :label="$t('member:address')"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-scale-transition>
              <v-alert
                v-if="showRegisteredMessage"
                type="success"
                :icon="false"
                color="primary"
                class="body-1 text-left"
              >
                <p class="body-1">
                  {{ $t("member:registered") }}
                </p>              
                <p>
                  <a :href="resetPasswordUrl" class="white--text">{{
                    resetPasswordUrl
                  }}</a>
                </p>
                <v-row class="pb-0">
                  <v-col cols="12" class="vh-center pb-0">
                    <v-btn text small @click="copyPasswordUrl()">{{
                      $t("copy")
                    }}</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="vh-center pt-0">
                    <transition name="fade-transition">
                      <small v-if="resetPasswordUrlCopied">{{
                        $t("member:linkCopied")
                      }}</small>
                    </transition>
                  </v-col>
                </v-row>
                <p class="body-1">
                  {{ $t("member:registered2") }}
                </p>
              </v-alert>
            </v-scale-transition>
          </v-card-text>
          <v-card-actions class="text-center vh-center pt-8">
            <v-btn
              color="primary"
              @click="addMember"
              :loading="submitLoading"
              :disabled="submitLoading || showRegisteredMessage"
              v-if="isCreate"
            >
              {{ $t("member:addMember") }}
            </v-btn>
            <v-btn
              color="primary"
              @click="modifyMember"
              :loading="submitLoading"
              :disabled="submitLoading"
              v-if="!isCreate"
            >
              {{ $t("change") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-snackbar
        v-model="modifySuccess"
        top
        color="primary"
        dark
        :timeout="7000"
      >
        {{ $t("member:modified") }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            icon
            v-bind="attrs"
            @click="modifySuccess = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </div>
</template>
<script>
import I18n from "@/i18n";
import MemberService from "@/service/MemberService";
import Regions from "@/Regions";
import Genders from "@/Genders";
import Rules from "@/Rules";

export default {
  components: {},
  async mounted() {
    this.member.uuid = this.$route.params.memberId;
    if (!this.member.uuid) {
      return;
    }
    const response = await MemberService.get(this.member);
    this.member = response.data;
    this.resetPasswordUrl = null;
    this.showRegisteredMessage = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "member", {
      title: "Nouveau membre",
      addMember: "Nouveau membre",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Courriel",
      facebookId: "Identifiant Facebook",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      gender: "Genre",
      address: "Adresse",
      modified: "Les informations ont été enregistrées",
      registered:
        "Le nouveau membre a été enregistré ! Le mot de passe doit être déterminé pour qu'il puisse se connecter. Le lien suivant permet de le faire dans un délai de 2 semaines.",
      registered2:
        "Vous pouvez envoyer le lien au membre ou définir le mot de passe maintenant avec lui.",
      linkCopied: "lien copié",
    });
    I18n.i18next.addResources("en", "member", {
      title: "Nouveau membre",
      addMember: "Nouveau membre",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Courriel",
      facebookId: "Identifiant Facebook",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      gender: "Genre",
      address: "Adresse",
      modified: "Les informations ont été enregistrées",
      registered:
        "Le nouveau membre a été enregistré ! Le mot de passe doit être déterminé pour qu'il puisse se connecter. Le lien suivant permet de le faire dans un délai de 2 semaines.",
      registered2:
        "Vous pouvez envoyer le lien au membre ou le changer maintenant avec lui.",
      linkCopied: "lien copié",
    });
    return {
      submitLoading: false,
      member: {
        region: "BDC",
      },
      subRegions: Regions.get(),
      genders: Genders.get(),
      isFormValid: false,
      rules: Rules,
      modifySuccess: false,
      resetPasswordUrl: null,
      showRegisteredMessage: false,
      resetPasswordUrlCopied: false,
      resetPasswordUrlCopiedTimeout: null,
    };
  },
  methods: {
    getSelectText: function (item) {
      return this.$t(item.value);
    },
    addMember: async function () {
      if (!this.$refs.memberForm.validate()) {
        return;
      }
      this.submitLoading = true;
      const response = await MemberService.create(this.member);
      const passwordToken = response.data.passwordToken;
      this.resetPasswordUrl =
        location.protocol +
        "//" +
        location.hostname +
        "/change-password/" +
        passwordToken;
      this.showRegisteredMessage = true;
      this.submitLoading = false;
    },
    modifyMember: async function () {
      this.submitLoading = true;
      await MemberService.update(this.member);
      this.submitLoading = false;
      this.modifySuccess = true;
    },
    copyPasswordUrl: function () {
      this.$copyText(this.resetPasswordUrl);
      this.resetPasswordUrlCopied = true;
      if (this.resetPasswordUrlCopiedTimeout !== null) {
        clearTimeout(this.resetPasswordUrlCopiedTimeout);
      }
      this.resetPasswordUrlCopiedTimeout = setTimeout(() => {
        this.resetPasswordUrlCopied = false;
        this.resetPasswordUrlCopiedTimeout = null;
      }, 5000);
    },
  },
  computed: {
    isCreate: function () {
      return this.member.id === undefined;
    },
  },
};
</script>
<style>
</style>

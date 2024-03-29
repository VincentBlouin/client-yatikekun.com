<template>
  <PageWrap>
    <v-card flat class="">
      <v-card-text class="text-center pb-0" :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }">
        <v-alert
            border="bottom"
            colored-border
            color="primary"
            :type="$vuetify.breakpoint.smAndDown ? '' : 'warning'"
            elevation="2"
        >
          {{ $t('member:memberOfHg') }}
          <div>
            <v-btn target="_blank"
                   text
                   href="https://docs.google.com/forms/d/e/1FAIpQLSf0Z1IH1lYZ8sL-4umROhOXSJ83NIAzIbIAWAlMvGaE7mM7eg/viewform?vc=0&c=0&w=1&flr=0">
              <v-icon color="primary" left>article</v-icon>
              {{ $t('member:memberForm') }}
            </v-btn>
          </div>
        </v-alert>
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
          <v-card>
            <v-card-text>
              <v-text-field
                  v-model="member.email"
                  :label="$t('member:email')"
                  prepend-icon="email"
                  required
                  :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-checkbox
                  v-model="member.contactByEmail"
                  :label="$t('member:contactByEmail')"
                  @change="reviewPreferredCommunication()"
              ></v-checkbox>
            </v-card-text>
          </v-card>
          <v-card class="mt-4 mb-4">
            <v-card-text>
              <v-text-field
                  v-model="member.facebookId"
                  :label="$t('member:facebookId')"
                  prepend-icon="facebook"
                  required
                  :rules="[rules.noSpace]"
                  :hint="$t('member:messenger')"
                  persistent-hint
              ></v-text-field>
              <v-checkbox
                  v-model="member.contactByMessenger"
                  :label="$t('member:contactByMessenger')"
                  @change="reviewPreferredCommunication()"
              ></v-checkbox>
            </v-card-text>
          </v-card>

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
          <v-card class="mt-4 mb-4">
            <v-card-text>
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
              <v-checkbox
                  v-model="member.contactByPhone"
                  :label="$t('member:contactByPhone')"
                  :hint="$t('member:contactByPhoneHint')"
                  persistent-hint
                  @change="reviewPreferredCommunication()"
              ></v-checkbox>
            </v-card-text>
          </v-card>
          <v-card class="mt-4 mb-4">
            <v-card-subtitle class="text-left">
              {{ $t('member:communicationPreference') }}
            </v-card-subtitle>
            <v-card-text>
              <v-spacer></v-spacer>
              <v-list max-width="275">
                <v-list-item v-for="(communicationTool, index) in preferredCommunication"
                             :key="communicationTool.value" :disabled="communicationTool.index === -1">
                  <v-list-item-action>
                    <v-icon :disabled="index === 0 || communicationTool.index === -1"
                            @click="moveCommunicationUp(communicationTool.value, communicationTool.index)">
                      arrow_circle_up
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-title class="text-left">
                    <v-icon left :disabled="communicationTool.index === -1">
                      {{ communicationIcon[communicationTool.value] }}
                    </v-icon>
                    {{ $t(communicationTool.value) }}
                  </v-list-item-title>
                  <v-list-item-action>
                    <v-icon
                        :disabled="index === preferredCommunication.length - 1 || communicationTool.index === -1 || preferredCommunication[index + 1].index === -1"
                        @click="moveCommunicationDown(communicationTool.value, communicationTool.index)">
                      arrow_circle_down
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-spacer></v-spacer>
            </v-card-text>
          </v-card>
          <v-text-field
              v-model="member.pronoun"
              :label="$t('member:pronoun')"
              :hint="$t('member:pronounHint')"
          ></v-text-field>
          <v-select
              v-model="member.language"
              :items="languages"
              attach
              chips
              :label="$t('member:language')"
              multiple
          ></v-select>
          <v-text-field
              v-model="member.address"
              :label="$t('member:address')"
              :rules="[rules.required]"
          ></v-text-field>
          <v-select
              :items="status"
              v-model="member.status"
              :label="$t('member:status')"
              required
              :item-text="getSelectText"
              item-value="value"
              :rules="[rules.required]"
              :disabled="$store.state.user.status !== 'admin'"
          >
          </v-select>
          <v-select
              v-model="member.OrganisationId"
              :items="organisations"
              item-text="name"
              item-value="id"
              :label="$t('member:organisation')"
              clearable
              v-if="$store.state.user.status === 'admin'"
          >
            <template v-slot:item="{item}">
              <img :src="item.customImageUrl" v-if="item.customImage" width="100" class="mr-6">
              <v-list-item-content>
                <v-list-item-title class="text-h6 font-weight-regular">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-select>
          <v-select
              v-model="member.orgIdGotBonusForSubscription"
              :items="organisations"
              item-text="name"
              item-value="id"
              :label="$t('member:orgSubscriptionBonus')"
              :disabled="$store.state.user.status !== 'admin' || isOrgGotBonusReadOnly"
          >
            <template v-slot:item="{item}">
              <img :src="item.customImageUrl" v-if="item.customImage" width="100" class="mr-6">
              <v-list-item-content>
                <v-list-item-title class="text-h6 font-weight-regular">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-select>
          <v-select
              v-model="member.AdminUserId"
              :items="admins"
              item-text="fullname"
              item-value="id"
              :label="$t('member:associatedAdministrator')"
              clearable
              v-if="$store.state.user.status === 'admin'"
          ></v-select>
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
                  }}
                </v-btn>
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
  </PageWrap>
</template>
<script>
import I18n from "@/i18n";
import MemberService from "@/service/MemberService";
import Regions from "@/Regions";
import Rules from "@/Rules";
import OrganisationService from "@/service/OrganisationService";
import PreferredCommunication from "@/PreferredCommunication";
import Images from "@/Images";

const communicationModes = ['Messenger', 'Email', 'Phone'];
export default {
  components: {
    PageWrap: () => import('@/components/PageWrap')
  },
  async mounted() {
    this.member.uuid = this.$route.params.memberId;
    let response;
    if (this.member.uuid === undefined) {
      this.member.AdminUserId = this.$store.state.user.id;
      this.member.OrganisationId = this.$store.state.user.OrganisationId;
    } else {
      response = await MemberService.get(this.member);
      this.member = response.data;
    }
    if (this.member.orgIdGotBonusForSubscription) {
      this.isOrgGotBonusReadOnly = true;
    }
    if (this.member.contactByEmail === undefined) {
      this.member.contactByEmail = true;
    }
    if (this.member.contactByMessenger === undefined) {
      this.member.contactByMessenger = true;
    }
    if (this.member.contactByPhone === undefined) {
      this.member.contactByPhone = true;
    }
    this.reviewPreferredCommunication();
    response = await OrganisationService.list();
    this.organisations = response.data.map((organisation) => {
      organisation.customImageUrl = Images.getCustomBase64Url(organisation.customImage);
      return organisation;
    });
    if (this.$store.state.user.status === 'admin') {
      response = await MemberService.list();
      this.admins = response.data.filter((member) => {
        return member.status === 'admin';
      }).map((member) => {
        member.fullname = member.firstname + " " + member.lastname;
        return member;
      });
    }
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
      facebookId: "URL de votre profil facebook",
      messenger: "Pour que les membres du PartageHeure puissent vous communiquer par messenger",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      pronoun: "Pronom utilisé",
      pronounHint: "il, elle, iel par exemple",
      address: "Adresse",
      modified: "Les informations ont été enregistrées",
      registered:
          "Le nouveau membre a été enregistré ! Le mot de passe doit être déterminé pour qu'il puisse se connecter. Le lien suivant permet de le faire dans un délai de 2 semaines.",
      registered2:
          "Vous pouvez envoyer le lien au membre ou définir le mot de passe maintenant avec lui.",
      linkCopied: "lien copié",
      status: "Statut",
      organisation: "Organisation associée",
      associatedAdministrator: "Administrateur associé",
      memberOfHg: "Les membres du PartageHeure doivent être membre de la coopérative Horizons Gaspésiens",
      memberForm: "Formulaire d'adhésion",
      contactByEmail: "Accepter que les membres vous contactent par courriel",
      contactByMessenger: "Accepter que les membres vous contactent par messenger",
      contactByPhone: "Accepter que les membres vous contactent par téléphone",
      contactByPhoneHint: "Pensez à accepter pour que les membres qui n'ont pas internet puissent vous contacter",
      communicationPreference: "Moyen de communication préféré",
      language: "Langues parlées",
      orgSubscriptionBonus: "Organisation qui a le bonus de une heure pour l'inscription"
    });
    I18n.i18next.addResources("en", "member", {
      title: "Nouveau membre",
      addMember: "Nouveau membre",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Courriel",
      facebookId: "URL de votre profil facebook",
      messenger: "Pour que les membres du PartageHeure puissent vous communiquer par messenger",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      pronoun: "Pronom utilisé",
      pronounHint: "exemple: il, elle, iel",
      address: "Adresse",
      modified: "Les informations ont été enregistrées",
      registered:
          "Le nouveau membre a été enregistré ! Le mot de passe doit être déterminé pour qu'il puisse se connecter. Le lien suivant permet de le faire dans un délai de 2 semaines.",
      registered2:
          "Vous pouvez envoyer le lien au membre ou le changer maintenant avec lui.",
      linkCopied: "lien copié",
      status: "Statut",
      organisation: "Organisation associée",
      associatedAdministrator: "Administrateur associé",
      memberOfHg: "Les membres du PartageHeure doivent être membre de la coopérative Horizons Gaspésiens",
      memberForm: "Formulaire d'adhésion",
      contactByEmail: "Accepter que les membres vous contactent par courriel",
      contactByMessenger: "Accepter que les membres vous contactent par messenger",
      contactByPhone: "Accepter que les membres vous contactent par téléphone",
      communicationPreference: "Moyen de communication préféré",
      language: "Langues parlées",
      orgSubscriptionBonus: "Organisation qui a le bonus de une heure pour l'inscription"
    });
    return {
      submitLoading: false,
      member: {
        region: "BDC",
      },
      subRegions: Regions.get(),
      isFormValid: false,
      rules: Rules,
      organisations: [],
      admins: [],
      modifySuccess: false,
      resetPasswordUrl: null,
      showRegisteredMessage: false,
      resetPasswordUrlCopied: false,
      resetPasswordUrlCopiedTimeout: null,
      status: [
        {
          value: "member"
        },
        {
          value: "admin"
        },
        {
          value: "disabled"
        }
      ],
      communicationIcon: PreferredCommunication.getCommunicationIcons(),
      preferredCommunication: {},
      languages: [
        "Français", "English"
      ],
      isOrgGotBonusReadOnly: false
    };
  },
  methods: {
    moveCommunicationDown: function (communicationTool, communicationIndex) {
      this.member.preferredCommunication[communicationTool] = communicationIndex + 1;
      communicationModes.filter((otherCommunicationTool) => {
        return otherCommunicationTool !== communicationTool;
      }).forEach((otherCommunicationTool) => {
        if (this.member.preferredCommunication[otherCommunicationTool] === communicationIndex + 1) {
          this.member.preferredCommunication[otherCommunicationTool] = communicationIndex;
        }
      })
      this.reviewPreferredCommunication();
    },
    moveCommunicationUp: function (communicationTool, communicationIndex) {
      this.member.preferredCommunication[communicationTool] = communicationIndex - 1;
      communicationModes.filter((otherCommunicationTool) => {
        return otherCommunicationTool !== communicationTool;
      }).forEach((otherCommunicationTool) => {
        if (this.member.preferredCommunication[otherCommunicationTool] === communicationIndex - 1) {
          this.member.preferredCommunication[otherCommunicationTool] = communicationIndex;
        }
      })
      this.reviewPreferredCommunication();
    },
    reviewPreferredCommunication: function () {
      this.preferredCommunication = PreferredCommunication.reviewForMember(this.member);
    },
    getSelectText: function (item) {
      return this.$t(item.value);
    },
    addMember: async function () {
      if (!this.$refs.memberForm.validate()) {
        return;
      }
      this.submitLoading = true;
      this.member.locale = "fr";
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
      return this.$route.params.memberId === undefined;
    }
  }
}
</script>
<style>
</style>

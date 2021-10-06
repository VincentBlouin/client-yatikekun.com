<template>
  <Page>
    <v-card flat class="">
      <v-card-title>
        <v-icon class="mr-4">business</v-icon>
        Organisation
      </v-card-title>
      <v-card-text class="text-left" :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }">
        <router-link to="/organisations">
          {{$t('organisation:seeAll')}}
        </router-link>
      </v-card-text>
      <v-card-text class="text-center pb-0" :class="{
          'pa-0': $vuetify.breakpoint.smAndDown
          }">
        <v-form ref="organisationForm" v-model="isFormValid">
          <v-text-field
              v-model="organisation.name"
              :label="$t('organisation:name')"
              required
              :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
              v-model="organisation.url"
              :label="$t('organisation:url')"
              required
              :rules="[rules.required]"
          ></v-text-field>
          <v-row>
            <v-col cols="12" class="text-left">
              <v-skeleton-loader
                  width="250"
                  type="image"
                  color="transparent"
                  v-if="isImageLoading"
              ></v-skeleton-loader>
              <img :src="organisation.customImageUrl" width="200px"
                   v-if="!isImageLoading && organisation.customImageUrl"/>
            </v-col>
          </v-row>
          <v-file-input
              accept="image/*"
              :label="$t('organisation:image')"
              prepend-icon="image"
              v-model="logo"
          ></v-file-input>
          <v-checkbox
              v-model="organisation.activeForTransactions"
              :label="$t('organisation:activeForTransactions')"
              persistent-hint
              :hint="$t('organisation:activeForTransactionsHint')"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions class="text-center vh-center pt-8">
        <v-btn
            color="primary"
            @click="addOrganisation"
            :loading="submitLoading"
            :disabled="submitLoading"
            v-if="isCreate"
        >
          {{ $t("organisation:addOrganisation") }}
        </v-btn>
        <v-btn
            color="primary"
            @click="modifyOrganisation"
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
      {{ $t("organisation:modified") }}
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
  </Page>
</template>
<script>
import I18n from "@/i18n";
import OrganisationService from "@/service/OrganisationService";
import Rules from "@/Rules";
import Images from "@/Images";

export default {
  components: {
    Page: () => import('@/components/Page')
  },
  async mounted() {
    if (this.$route.params.organisationId) {
      const response = await OrganisationService.get(this.$route.params.organisationId);
      this.organisation = response.data;
    } else {
      this.organisation = {};
    }
    this.rebuildImageUrl();
    this.isImageLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "organisation", {
      title: "Nouvelle Organisation",
      name: "Nom",
      url: "URL",
      image: "Logo",
      modified: "Organisation modifiée avec succès",
      addOrganisation: "Ajouter l'organisation",
      seeAll: "Toutes les organisations",
      activeForTransactions: "Actif pour les transactions",
      activeForTransactionsHint: "Pourra reçevoir les heures bonus des usagers. Pourra aussi donner des heures à leurs bénévoles"
    });
    I18n.i18next.addResources("en", "organisation", {
      title: "Nouvelle Organisation",
      name: "Nom",
      url: "URL",
      image: "Logo",
      modified: "Organisation modifiée avec succès",
      addOrganisation: "Ajouter l'organisation",
      seeAll: "Toutes les organisations",
      activeForTransactions: "Actif pour les transactions",
      activeForTransactionsHint: "Pourra reçevoir les heures bonus des usagers. Pourra aussi donner des heures à leurs bénévoles"
    });
    return {
      submitLoading: false,
      organisation: {},
      logo: null,
      isFormValid: false,
      rules: Rules,
      modifySuccess: false,
      isImageLoading: false
    };
  },
  methods: {
    rebuildImageUrl: function () {
      if (this.organisation.customImage === undefined) {
        return;
      }
      this.organisation.customImageUrl = Images.getCustomBase64Url(this.organisation.customImage);
    },
    getSelectText: function (item) {
      return this.$t(item.value);
    },
    addOrganisation: async function () {
      if (!this.$refs.organisationForm.validate()) {
        return;
      }
      this.submitLoading = true;
      await OrganisationService.create(this.organisation);
      this.submitLoading = false;
      this.$router.push('/organisations');
    },
    modifyOrganisation: async function () {
      this.submitLoading = true;
      await OrganisationService.update(this.organisation);
      this.submitLoading = false;
      this.modifySuccess = true;
    },
  },
  computed: {
    isCreate: function () {
      return this.organisation.id === undefined;
    },
  },
  watch: {
    logo: async function () {
      this.isImageLoading = true;
      let formData = new FormData();
      formData.append('file', this.logo, this.logo.name);
      this.formData = formData;
      const response = await OrganisationService.uploadImage(formData).catch((err) => {
        this.uploadError = err.response
      });
      setTimeout(() => {
        this.$set(this.organisation, 'customImage', response.data);
        this.rebuildImageUrl();
        this.isImageLoading = false;
      }, 1000);
    }
  }
};
</script>
<style>
</style>

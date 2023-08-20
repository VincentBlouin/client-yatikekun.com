<template>
  <PageWrap class="h-center">
    <v-card flat class="pt-8 h-center">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            to="organisation"
        >
          <v-icon class="mr-2">add</v-icon>
          {{ $t('organisations:addOrganisation') }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-title class="logo-font text-h4">
        <v-spacer></v-spacer>
        <v-icon large class="mr-6">business</v-icon>
        {{ $t('organisations:title') }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="vh-center">
        <v-list class="pt-0">
          <v-list-item v-for="organisation in organisations" :key="organisation.id" class="text-left pt-3 pb-3"
                       :to="'/organisation/'+organisation.id">
            <img :src="organisation.customImageUrl" v-if="organisation.customImage" width="100" class="mr-6">
            <v-list-item-content>
              <v-list-item-title class="text-h6 font-weight-regular">
                {{ organisation.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </PageWrap>
</template>
<script>
import I18n from "@/i18n";
import OrganisationService from "@/service/OrganisationService";
import Images from "@/Images";

export default {
  components: {
    PageWrap: () => import('@/components/PageWrap')
  },
  async mounted() {
    window.scrollTo(0, 0)
    this.isLoading = true;
    let response = await OrganisationService.list();
    this.organisations = response.data.map((organisation) => {
      if(organisation.customImage){
        organisation.customImageUrl = Images.getCustomBase64Url(organisation.customImage);
      }
      return organisation;
    })
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "organisations", {
      title: "Organisations",
      organisation: "Organisation",
      addOrganisation: "Nouvelle organisation"
    });
    I18n.i18next.addResources("en", "organisations", {
      title: "Organisations",
      organisation: "Organisation",
      addOrganisation: "Nouvelle organisation"
    });
    return {
      organisations: null,
      isLoading: false
    }
  },
  methods: {}
}
</script>

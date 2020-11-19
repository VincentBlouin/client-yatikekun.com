<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center pt-16 pb-16"
  >
    <v-col cols="12" class="col-md-6 col-lg-4 text-center vh-center">
      <v-card flat class="pt-8">
        <v-card-actions>
          <v-btn
              color="primary"
              to="membre"
          >
            <v-icon class="mr-2">add</v-icon>
            {{ $t('members:addMember') }}
          </v-btn>
        </v-card-actions>
        <v-card-title>
          {{ $t('members:title') }}
        </v-card-title>
        <v-list class="pt-0">
          <v-list-item v-for="member in members" :key="member.uuid" class="text-left" :to="'/membre/'+member.uuid">
            <v-list-item-avatar>
              <v-avatar color="primary" class="white--text">
                {{ member.initials }}
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ member.fullname }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t(member.subRegion) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import MemberService from "@/service/MemberService";

export default {
  components: {},
  async mounted() {
    window.scrollTo(0, 0)
    this.isLoading = true;
    let response = await MemberService.list();
    this.members = response.data.map((member) => {
      member.fullname = member.firstname + " " + member.lastname;
      member.initials = member.fullname.split(" ").map((n) => n[0]).join("");
      return member;
    });
    this.isLoading = false;
  },
  data: function () {
    I18n.i18next.addResources("fr", "members", {
      title: "Membres",
      member: "Membre",
      addMember: "Nouveau membre"
    });
    I18n.i18next.addResources("en", "members", {
      title: "Membres",
      member: "Membre",
      addMember: "Nouveau membre"
    });
    return {
      members: null,
      isLoading: false
    }
  },
  methods: {}
}
</script>

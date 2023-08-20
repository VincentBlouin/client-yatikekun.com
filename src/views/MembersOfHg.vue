<template>
  <PageWrap>
    <v-card>
      <v-card-title>
        Membre de Hg mais pas du partageheure
      </v-card-title>
      <v-card-subtitle class="text-left">
        Ils ne sont pas tous des membres actifs
      </v-card-subtitle>
      <v-card-text class="text-left">
        <span v-for="member in membersOfHgNotOfPartageHeure" :key="member.email">
          {{ member.firstname }}
          {{ member.lastname }}
          &lt;{{ member.email }}&gt;,
        </span>
      </v-card-text>
    </v-card>
  </PageWrap>
</template>

<script>
import MemberService from "@/service/MemberService";

export default {
  name: "MembersOfHg",
  components: {
    PageWrap: () => import('@/components/PageWrap')
  },
  data: function () {
    return {
      membersOfHgNotOfPartageHeure: []
    };
  },
  mounted: async function () {
    const response = await MemberService.getMembersOfHgNotOfPartageHeure();
    this.membersOfHgNotOfPartageHeure = response.data;
  }
}
</script>

<style scoped>

</style>

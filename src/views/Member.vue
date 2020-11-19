<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="">
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
        <v-card-actions class="text-center vh-center pt-8">
          <v-btn color="primary" @click="addMember" :loading="submitLoading"
                 :disabled="submitLoading">
            {{ $t('member:addMember') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import MemberService from "@/service/MemberService";
import Regions from "@/Regions"
import Genders from "@/Genders"
import Rules from "@/Rules";

export default {
  components: {},
  async mounted() {
    this.descriptionId = Math.random();
  },
  data: function () {
    I18n.i18next.addResources("fr", "member", {
      title: "Nouveau membre",
      addMember: "Nouveau membre",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Courriel",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      gender: "Genre",
      address: "Adresse"
    });
    I18n.i18next.addResources("en", "member", {
      title: "Nouveau membre",
      addMember: "Nouveau membre",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Courriel",
      region: "Région",
      subRegion: "Sous région",
      phone1: "Téléphone 1",
      phone2: "Téléphone 2",
      gender: "Genre",
      address: "Adresse"
    });
    return {
      submitLoading: false,
      member: {
        region: "BDC"
      },
      subRegions: Regions.get(),
      genders: Genders.get(),
      isFormValid: false,
      rules: Rules
    }
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
      await MemberService.create(this.member);
      this.submitLoading = false;
      await this.$router.push("/membres");
    }
  },
  computed: {}
}
</script>
<style>
</style>

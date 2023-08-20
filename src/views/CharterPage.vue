<template>
  <PageWrap>
    <v-card flat class="pt-8">
      <v-card-title class="vh-center primary-color">
        <h3 class="text-center">{{ $t('charter:title') }}</h3>
      </v-card-title>
    </v-card>
    <v-card flat>
      <v-card-title class="text-h5 primary-color">
        {{ $t('charter:intention') }}
      </v-card-title>
      <v-card-text>
        <p class="text-h6 font-weight-regular text-left">
          {{ $t('charter:intention1') }}
        </p>
        <p class="text-h6 font-weight-regular text-left">
          {{ $t('charter:intention2') }}
        </p>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title class="text-h5 primary-color">
        {{ $t('charter:vision') }}
      </v-card-title>
      <v-card-text>
        <p class="text-h6 font-weight-regular text-left">
          {{ $t('charter:visionObjective') }}
        </p>
        <ul class="text-left text-h6 font-weight-regular">
          <li>
            {{ $t('charter:visionObjective1') }}
          </li>
          <li>
            {{ $t('charter:visionObjective2') }}
          </li>
          <li>
            {{ $t('charter:visionObjective3') }}
          </li>
          <li>
            {{ $t('charter:visionObjective4') }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title class="text-h5 primary-color">
        {{ $t('charter:principle') }}
      </v-card-title>
      <v-card-subtitle class="text-left">
        {{ $t('charter:principleAccorderie') }}
      </v-card-subtitle>
      <v-card-text>
        <ol class="text-h6 font-weight-regular text-left">
          <li class="font-weight-bold">
            {{ $t('charter:principle1') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle1Details') }}
            </p>
          </li>
          <li class="font-weight-bold">
            {{ $t('charter:principle2') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle2Details') }}
            </p>
          </li>
          <li class="font-weight-bold">
            {{ $t('charter:principle3') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle3Details') }}
            </p>
          </li>
          <li class="font-weight-bold">
            {{ $t('charter:principle4') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle4Details') }}
            </p>
          </li>
          <li class="font-weight-bold">
            {{ $t('charter:principle5') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle5Details') }}
              <a href="https://www.facebook.com/groups/seldemergaspesie/">
                {{ $t('charter:principle51Details') }}
              </a>
            </p>
          </li>
          <li class="font-weight-bold">
            {{ $t('charter:principle6') }}
            <p class="text-h6 font-weight-regular text-left">
              {{ $t('charter:principle6Details') }}
              <a href="mailto:horizonsgaspesiens@gmail.com">
                horizonsgaspesiens@gmail.com
              </a>
            </p>
          </li>
        </ol>
      </v-card-text>
      <v-card-text class="text-h6 font-weight-regular text-left">
        {{ $t('charter:confidentiality') }}
        <router-link to="/vie-prive">
          {{ $t('charter:confidentiality1') }}
        </router-link>
      </v-card-text>
    </v-card>
  </PageWrap>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {
    PageWrap: () => import('@/components/PageWrap')
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  data: function () {
    I18n.i18next.addResources("fr", "charter", {
      title: "Charte de notre système d'échange local",
      intention: "Intention",
      intention1: "Ce site se veut un outil au service de la communauté, mis sur pied par et pour ses membres. Le PartageHeure est basé sur la confiance et l'autogestion. C'est pourquoi les profils des utilisateurs et utilisatrices sont visibles par toutes les personnes inscrites. C'est pourquoi, aussi, il est important d'honorer ses engagements et les ententes prises entre les parties pour chacun des échanges.",
      intention2: "Nous espérons que cet outil contribuera à l'essor de la confiance dans la communauté!",
      vision: "La vision",
      visionObjective: "Les objectifs de ce projet communautaire sont de:",
      visionObjective1: "Valoriser les compétences de chacun-e",
      visionObjective2: "Créer des liens humains sains, favoriser l’inclusion sociale, lutter contre l’isolement",
      visionObjective3: "Offrir une alternative à l’appauvrissement, lutter contre le capitalisme",
      visionObjective4: "Favoriser la résilience personnelle et collective",
      visionValues: "Le projet du PartageHeure est guidée par les valeurs de confiance, d'autonomie, de respect, de reconnaissance, d'égalité, de partage.",
      principle: "Principe",
      principleAccorderie: "(inspiré des principes de l'<a href=\"https://www.accorderie.ca/un-acces-a-des-services-que-plusieurs-ne-pourraient-soffrir-autrement\">accorderie</a>)",
      principle1: "Une heure de service rendu vaut une heure de service reçu",
      principle1Details: "Le principe de fonctionnement de base d’un système d'échange de service est qu’une heure de service rendu vaut une heure de service reçu, quels que soient la nature, la complexité ou l’effort reliés au service échangé. De l’aide pour faire le ménage vaut autant que du dépannage informatique, de la correction de textes, de la couture ou des conseils en décoration. L’échange de services repose sur un rapport égalitaire.",
      principle2: "L’échange repose sur le temps et non l’argent",
      principle2Details: "La monnaie d’échange du PartageHeure, c’est le temps et non le dollar. Le seul moment où l’argent entre en ligne de compte, c’est pour rembourser les dépenses liées à un service rendu. Par exemple, celui ou celle qui demande de l’aide pour repeindre son logement qui doit fournir la peinture. Nous suggérons aussi, 30 sous du kilomètre.",
      principle3: "Équilibre dans les échanges",
      principle3Details: "L’adhésion au PartageHeure implique, de la part de chacun-e, une obligation morale vis-à-vis du groupe et une aptitude réelle à rendre service. Il est essentiel que chacun-e s’engage à participer aux échanges, par des offres et par des demandes, afin de garantir la survie du système. Un équilibre est nécessaire afin de rester dans l’optique de l’échange.",
      principle4: "De l’échange et non du bénévolat",
      principle4Details: "Dans le PartageHeure, le seul bénévolat est celui de la participation aux réunions du conseil d’administration. Participer à un comité de travail ou accomplir une tâche technique pour le PartageHeure est considéré comme un service rendu. Chacun-e est rémunéré, pour le temps offert, par des heures qu’il/elle pourra utiliser à son tour pour recevoir un autre service.",
      principle5: "Échange de services et non de biens",
      principle5Details: "Le PartageHeure est, pour l'instant, un espace strictement réservé aux échanges de services, rémunérés en heures, selon le principe de \"1h vaut 1h\". Pour le troc, les échanges de biens, les dons nous vous proposons pour l'instant de publier vos annonces sur le",
      principle51Details: "Groupe d'échange gaspésien sur facebook",
      principle6: "Prise en charge de l’organisme par ses membres",
      principle6Details: "L’animation de l’échange de services et l’organisation des activités d’échange sont sous la responsabilité individuelle et collective de tous les membres. Un système d'échange de services ne saurait fonctionner sans la participation de ses membres. Vous voudriez faire partie du groupe porteur? Écrivez-nous:",
      confidentiality: "Enfin, veuillez consulter notre",
      confidentiality1: "politique de confidentialité"
    });
    I18n.i18next.addResources("en", "charter", {
      title: "Charte de partageheure.com"
    });
    return {}
  }
}
</script>

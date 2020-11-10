<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center pt-16 pb-16"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="pt-8">
        <v-card-title>
          Offers
        </v-card-title>
        <v-card-text>
          Yola
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";

export default {
  components: {},
  mounted() {
    window.scrollTo(0, 0)
  },
  data: function () {
    I18n.i18next.addResources("fr", "charter", {
      title: "Charte de notre système d'échange local",
      intention: "Intention",
      intention1: "Ce site se veut un outil au service de la communauté, mis sur pied par et pour ses membres. Le SEL de mer est basé sur la confiance et l'autogestion. C'est pourquoi les profils des utilisateurs et utilisatrices sont visibles par toutes les personnes inscrites. C'est pourquoi, aussi, il est important d'honorer ses engagements et les ententes prises entre les parties pour chacun des échanges.",
      intention2: "Nous espérons que cet outil contribuera à l'essor de la confiance dans la communauté!",
      vision: "La vision",
      visionObjective: "Les objectifs de ce projet communautaire sont de:",
      visionObjective1: "Valoriser les compétences de chacun-e",
      visionObjective2: "Créer des liens humains sains, favoriser l’inclusion sociale, lutter contre l’isolement",
      visionObjective3: "Offrir une alternative à l’appauvrissement, lutter contre le capitalisme",
      visionObjective4: "Favoriser la résilience personnelle et collective",
      visionValues: "Le projet du SEL de mer est guidée par les valeurs de confiance, d'autonomie, de respect, de reconnaissance, d'égalité, de partage.",
      principle: "Principe",
      principleAccorderie: "(inspiré des principes de l'<a href=\"https://www.accorderie.ca/un-acces-a-des-services-que-plusieurs-ne-pourraient-soffrir-autrement\">accorderie</a>)",
      principle1: "Une heure de service rendu vaut une heure de service reçu",
      principle1Details: "Le principe de fonctionnement de base d’un service d'échange de service est qu’une heure de service rendu vaut une heure de service reçu, quels que soient la nature, la complexité ou l’effort reliés au service échangé. De l’aide pour faire le ménage vaut autant que du dépannage informatique, de la correction de textes, de la couture ou des conseils en décoration. L’échange de services repose sur un rapport égalitaire.",
      principle2: "L’échange repose sur le temps et non l’argent",
      principle2Details: "La monnaie d’échange du SEL de mer, c’est le temps et non le dollar. Le seul moment où l’argent entre en ligne de compte, c’est pour rembourser les dépenses liées à un service rendu. Par exemple, celui ou celle qui demande de l’aide pour repeindre son logement qui doit fournir la peinture.",
      principle3: "Équilibre dans les échanges",
      principle3Details: "L’adhésion au SEL de mer implique, de la part de chacun-e, une obligation morale vis-à-vis du groupe et une aptitude réelle à rendre service. Il est essentiel que chacun-e s’engage à participer aux échanges, par des offres et par des demandes, afin de garantir la survie du système. Un équilibre est nécessaire afin de rester dans l’optique de l’échange.",
      principle4: "De l’échange et non du bénévolat",
      principle4Details: "Dans le SEL de mer, le seul bénévolat est celui de la participation aux réunions du conseil d’administration. Participer à un comité de travail ou accomplir une tâche technique pour le SEL de mer est considéré comme un service rendu. Chacun-e est rémunéré, pour le temps offert, par des heures qu’il/elle pourra utiliser à son tour pour recevoir un autre service.",
      principle5: "Échange de services et non de biens",
      principle5Details: "Le SEL de mer est, pour l'instant, un espace strictement réservé aux échanges de services, rémunérés en heures, selon le principe de \"1h vaut 1h\". Pour le troc, les échanges de biens, les dons nous vous proposons pour l'instant de publier vos annonces sur le",
      principle51Details: "Groupe d'échange gaspésien sur facebook",
      principle6: "Prise en charge de l’organisme par ses membres",
      principle6Details: "L’animation de l’échange de services et l’organisation des activités d’échange sont sous la responsabilité individuelle et collective de tous les membres. Un système d'échange de services ne saurait fonctionner sans la participation de ses membres. Vous voudriez faire partie du groupe porteur? Écrivez-nous:"
    });
    I18n.i18next.addResources("en", "charter", {
      title: "Charte de seldemer.org"
    });
    return {}
  }
}
</script>

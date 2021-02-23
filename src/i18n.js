/**
 * Copyright Vincent Blouin GNU General Public License v3.0
 */
import Vue from 'vue'
import Store from '@/store'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

export default {
    setup: function () {
        Vue.use(VueI18Next);
        let savedLocale = Store.state.locale;
        if (!savedLocale) {
            let localesArray = new I18nextBrowserLanguageDetector().detectors.navigator.lookup();
            let frIndex = localesArray.indexOf("fr");
            let enIndex = localesArray.indexOf("en");
            let isFrenchPreferredOverEnglish = frIndex !== -1 && frIndex < enIndex;
            savedLocale = Store.state.locale = isFrenchPreferredOverEnglish ? "fr" : "en";
        }
        String.prototype.noAccents = function () {
            var accent = [
                /[\300-\306]/g, /[\340-\346]/g, // A, a
                /[\310-\313]/g, /[\350-\353]/g, // E, e
                /[\314-\317]/g, /[\354-\357]/g, // I, i
                /[\322-\330]/g, /[\362-\370]/g, // O, o
                /[\331-\334]/g, /[\371-\374]/g, // U, u
                /[\321]/g, /[\361]/g, // N, n
                /[\307]/g, /[\347]/g, // C, c
            ];
            var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

            var str = this;
            for (var i = 0; i < accent.length; i++) {
                str = str.replace(accent[i], noaccent[i]);
            }

            return str;
        }
        Store.dispatch('setLocale', savedLocale);
        i18next.init({
            lng: savedLocale,
            resources: {
                en: {
                    translation: {
                        copy: "Copy",
                        to: "to",
                        finish: "Finish",
                        close: 'Fermer',
                        login: 'Login',
                        register: 'Register',
                        search: 'Search',
                        logout: "Logout",
                        quantity: "Quantity",
                        add: "Add",
                        confirm: "Confirm",
                        create: "Create",
                        modify: "Modify",
                        continue: "Continue",
                        cancel: "Cancel",
                        users: "Users",
                        noSearchResults: "No search results",
                        'required': "Required",
                        invalidEmail: 'invalid email',
                        min8Char: "Minimum of 8 characters",
                        max255Char: "Maximum of 255 characters",
                        send: "Send",
                        change: "Change",
                        nonBinary: "Non binaire",
                        male: "Homme",
                        female: "Femme",
                        genderPreferNotAnswer: "Préfère ne pas répondre",
                        pointeALaCroix: "Pointe-à-la-croix",
                        pointeALaGarde: "Pointe-à-la-Garde",
                        escuminac: "Escuminac",
                        nouvelle: "Nouvelle",
                        carletonSurMer: "Carleton-sur-mer",
                        maria: "Maria",
                        gesgapegiag: "Gesgapegiag",
                        newRichmond: "New Richmond",
                        caplan: "Caplan",
                        saintSimeon: "Saint-Siméon",
                        bonaventure: "Bonaventure",
                        newCarlisle: "New Carlisle",
                        paspebiac: "Paspébiac",
                        hope: "Hope/Hope Town",
                        saintGod: "Saint-Godefroi/Shigawake"
                    }
                },
                fr: {
                    translation: {
                        copy: "Copier",
                        to: "à",
                        finish: "Terminer",
                        close: 'Fermer',
                        login: 'Connexion',
                        register: "S'inscrire",
                        search: 'Chercher',
                        logout: "Déconnexion",
                        quantity: "Quantité",
                        add: "Ajouter",
                        confirm: "Confirmer",
                        create: "Créer",
                        modify: "Modifier",
                        continue: "Continuer",
                        cancel: "Annuler",
                        users: "Usagers",
                        noSearchResults: "Pas de résultats de recherche",
                        'required': "Requis",
                        invalidEmail: 'courriel invalide',
                        min8Char: "Minimum de 8 caractères",
                        max255Char: "Maximum de 255 caractères",
                        send: "Envoyer",
                        change: "Modifier",
                        nonBinary: "Non binaire",
                        male: "Homme",
                        female: "Femme",
                        genderPreferNotAnswer: "Préfère ne pas répondre",
                        pointeALaCroix: "Pointe-à-la-croix",
                        pointeALaGarde: "Pointe-à-la-Garde",
                        escuminac: "Escuminac",
                        nouvelle: "Nouvelle",
                        carletonSurMer: "Carleton-sur-mer",
                        maria: "Maria",
                        gesgapegiag: "Gesgapegiag",
                        newRichmond: "New Richmond",
                        caplan: "Caplan",
                        saintSimeon: "Saint-Siméon",
                        bonaventure: "Bonaventure",
                        newCarlisle: "New Carlisle",
                        paspebiac: "Paspébiac",
                        hope: "Hope/Hope Town",
                        saintGod: "Saint-Godefroi/Shigawake"
                    }
                }
            }
        });
        return new VueI18Next(i18next);
    },
    i18next: i18next,
    getLocale: function () {
        return Store.state.locale;
    }
};

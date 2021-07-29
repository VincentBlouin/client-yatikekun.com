import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors'
import fr from 'vuetify/lib/locale/fr'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md'
    },
    lang: {
        locales: {fr},
        current: 'fr',
    },
    theme: {
        dark: false,
        themes: {
            light: {
                blueTitle: "#17347c",
                primary: "#177C72",
                secondary: "#7c2e17",
                secondaryLight: colors.indigo.lighten2,
                third: colors.teal.darken1,
                thirdLight: colors.teal.lighten1,
                grey: colors.grey.darken1,
                red: colors.red.lighten2,
                accent: '#82B1FF',
                error: '#ff4444',
                info: '#33b5e5',
                success: '#00C851',
                warning: '#ffbb33',
                edgeColor: '#3A87AD',
                facebook: "#3b5998",
                background:"#fcff2a59"
            },
            dark: {
                primary: '#FFFFFF',
                secondary: colors.indigo.darken4,
                secondaryLight: colors.indigo.lighten2,
                third: colors.teal.darken1,
                thirdLight: colors.teal.lighten1,
                grey: colors.grey.darken1,
                red: colors.red.lighten2,
                accent: '#82B1FF',
                error: '#ff4444',
                info: '#33b5e5',
                success: '#00C851',
                warning: '#ffbb33',
                edgeColor: '#3A87AD',
                facebook: "#3b5998",
                background:"#fcff2a59"
            }
        }
    }
});

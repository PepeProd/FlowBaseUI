import activeUser from './models/activeUser';
import chemicals from './models/chemicals';

export default {
    state: {
        activeUser: {},
        chemicals: []
    },
    mutations: {
        SET_ACTIVEUSER(state, user) {
            state.activeUser.username = user.username;
            state.activeUser.email = user.email;
            state.notifications = user.notifications;
        },
        SET_CHEMICALS(state, chemicals) {
            state.chemicals = chemicals;
        }
    },
    actions: {
        setActiveUser({commit}, user) {
            commit('SET_ACTIVEUSER', user)
        },
        setChemicals({commit}, chemicals) {
            commit('SET_CHEMICALS', chemicals);
        }
    },
    getters: {
        activeUser: state => state.activeUser,
        chemicals: state => state.chemicals
    }
}
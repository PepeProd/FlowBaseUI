import activeUser from './models/activeUser';

export default {
    state: {
        activeUser: {}
    },
    mutations: {
        SET_ACTIVEUSER(state, user) {
            state.activeUser.username = user.username;
            state.activeUser.email = user.email;
            state.notifications = user.notifications;
        }
    },
    actions: {
        setActiveUser({commit}, user) {
            commit('SET_ACTIVEUSER', user)
        }
    },
    getters: {
        activeUser: state => state.activeUser
    }
}
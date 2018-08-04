import {
    USER_OBJECT
} from '../mutation-types';

const mutations = {
    [USER_OBJECT](state, data) {
        if(data && typeof data === 'object')
            state.activeUsers.push(data);
    }
}

const state = {
    activeUser : {
        username: '',
        email: '',
        notifications: false,
        frequency: ''
    }
};

export default {
    state
};
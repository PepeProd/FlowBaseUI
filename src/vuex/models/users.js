import {
    USER_COLLECTION
} from '../mutation-types';

const mutations = {
    [USER_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.users.push(data);
    }
}

const state = {
    users : []
};

export default {
    state
};
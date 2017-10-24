import {
    USER_OBJECT
} from '../mutation-types';

const mutations = {
    [USER_OBJECT](state, data) {
        if(data && typeof data === 'object')
            state.chemicals.push(data);
    }
}

const state = {
    chemicals : []
};

export default {
    state
};
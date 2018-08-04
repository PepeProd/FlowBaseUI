import {
    FAMILY_COLLECTION
} from '../mutation-types';

const mutations = {
    [FAMILY_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.families.push(data);
    }
}

const state = {
    families : {}
};

export default {
    state
};
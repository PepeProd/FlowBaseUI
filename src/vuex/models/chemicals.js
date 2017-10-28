import {
    CHEMICAL_COLLECTION
} from '../mutation-types';

const mutations = {
    [CHEMICAL_COLLECTION](state, data) {
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
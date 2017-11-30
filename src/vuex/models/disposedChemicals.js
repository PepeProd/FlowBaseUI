import {
    DISPOSED_COLLECTION
} from '../mutation-types';

const mutations = {
    [DISPOSED_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.disposedChemicals.push(data);
    }
}

const state = {
    disposedChemicals : []
};

export default {
    state
};
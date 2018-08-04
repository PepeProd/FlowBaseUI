import {
    TEMPZONES_COLLECTION
} from '../mutation-types';

const mutations = {
    [TEMPZONES_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.tempZones.push(data);
    }
}

const state = {
    tempZones : []
};

export default {
    state
};
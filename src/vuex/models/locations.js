import {
    LOCATION_COLLECTION
} from '../mutation-types';

const mutations = {
    [LOCATION_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.locations.push(data);
    }
}

const state = {
    locations : []
};

export default {
    state
};
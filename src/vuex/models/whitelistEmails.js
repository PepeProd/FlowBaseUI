import {
    EMAILLIST_COLLECTION
} from '../mutation-types';

const mutations = {
    [EMAILLIST_COLLECTION](state, data) {
        if(data && typeof data === 'object')
            state.whitelistEmails.push(data);
    }
}

const state = {
    whitelistEmails : []
};

export default {
    state
};
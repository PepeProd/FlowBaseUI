import activeUser from './models/activeUser';
import chemicals from './models/chemicals';
import disposedChemicals from './models/disposedChemicals';

import axios from 'axios';
import api from '../util/api'

export default {
    state: {
        activeUser: {},
        chemicals: [],
        disposedChemicals: []
    },
    mutations: {
        SET_ACTIVEUSER(state, user) {
            state.activeUser.username = user.username;
            state.activeUser.email = user.email;
            state.notifications = user.notifications;
        },
        SET_CHEMICALS(state, chemicals) {
            for (var i=0; i < chemicals.length; i++) {
                if (chemicals[i].hasOwnProperty('expiration_date')) {
                    var stringLongExpirationDate = new Date(chemicals[i].expiration_date);
                    var stringShortExpirationDate =  stringLongExpirationDate.getMonth() + "/" + stringLongExpirationDate.getDate() + "/" + stringLongExpirationDate.getFullYear();
                    chemicals[i].expiration_date = stringShortExpirationDate;
                }

                if (chemicals[i].hasOwnProperty('receive_date')) {
                    var stringLongReceivedDate = new Date(chemicals[i].receive_date);
                    var stringShortExpirationDate =  stringLongReceivedDate.getMonth() + "/" + stringLongReceivedDate.getDate() + "/" + stringLongReceivedDate.getFullYear();
                    chemicals[i].receive_date = stringShortExpirationDate;
                }
            }
            state.chemicals = chemicals;
        },
        DELETE_CHEMICAL_BY_BARCODE(state, barcodes) {
            for(var i=0; i<barcodes.length; i++) {
                for(var j=0; j < state.chemicals.length; j++) {
                    if (state.chemicals[j].barcode.toString() === barcodes[i].toString() ) {
                        state.disposedChemicals.push(state.chemicals[j]);
                        state.chemicals.splice(j, 1);
                    }
                }
            }
        },
        SET_DISPOSED(state, disposedChemicals) {
            state.disposedChemicals = disposedChemicals;
        }
    },
    actions: {
        setActiveUser({commit}, user) {
            commit('SET_ACTIVEUSER', user)
        },
        setChemicals({commit}) {
            axios.get(api.getBaseUrl() + '/chemicals')
            .then(response => {
                commit('SET_CHEMICALS', response.data);
            })
            .catch(function(error) {
      
            });
            //commit('SET_CHEMICALS', chemicals);
        },
        deleteChemicalByBarcodes({commit}, barcodes) {
            //axios.post(api.getBaseUrl() + '/chemicals/' + barcodes)
            //.then(response => {
                commit('DELETE_CHEMICAL_BY_BARCODE', barcodes);
            /*})
            .catch(function(error) {

            }); */
        },
        setDisposedChemicals({commit}) {
            //remove comments when api call is implemented
            /*axios.get(api.getBaseUrl() + '/disposedChemicals')
            .then(response => {
                commit('SET_DISPOSED', response.data);
            })
            .catch(function(error) {

            })*/
        }
    },
    getters: {
        activeUser: state => state.activeUser,
        chemicals: state => state.chemicals,
        disposedChemicals: state => state.disposedChemicals,
        findChemicalByName: (state, getters) => (chemicalToFind) => {
            var items = getters.chemicals;
            var result = [];
            //O(N^2) performance, slow
            for(var item, i=0; item=items[i++];) {
              if ((item.chemical_name).toLowerCase() == chemicalToFind.toLowerCase()) {
                result.push(item);
              }
            }
            return result;
        },
        findChemicalByBarcode: (state, getters) => (barcodeToFind) => {
            var items = getters.chemicals;
            var result = [];
            //O(N^2) performance, slow
            for(var item, i=0; item=items[i++];) {
              if ((item.barcode).toString() === barcodeToFind) {
                return item;
              }
            }
        }
    }
}
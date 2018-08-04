import activeUser from './models/activeUser';
import chemicals from './models/chemicals';
import disposedChemicals from './models/disposedChemicals';
import families from './models/families';
import locations from './models/locations';

import axios from 'axios';
import api from '../util/api';

export default {
    state: {
        activeUser: { username: '', email: '', notifications: ''},
        chemicals: [],
        disposedChemicals: [],
        families: {},
        locations: [],
        tempZones: []
    },
    mutations: {
        SET_ACTIVEUSER(state, user) {
            state.activeUser.username = user.username;
            state.activeUser.email = user.email;
            state.activeUser.notifications = user.notifications;
            state.activeUser.frequency = user.frequency;
        },
        UPDATE_FREQUENCY_USER(state, user) {
            state.activeUser.frequency = user.frequency;
        },
        SET_FAMILY(state, families) {
            state.families = families[0];
        },
        SET_FAMILY_FROM_UPDATE(state, families) {
            state.families = families;
        },
        SET_LOCATIONS(state, locations) {
            state.locations = locations;
        },
        ADD_SINGLE_LOCATION(state, location) {
            state.locations.push(location[0]);
        },
        SET_TEMPZONES(state, tempZones) {
            state.tempZones = tempZones;
        },
        ADD_SINGLE_TEMPZONE(state, tempZone) {
            state.tempZones.push(tempZone[0]);
        },
        DELETE_LOCATION_BY_NAME(state, name) {
            for(var j=0; j < state.locations.length; j++) {
                if (state.locations[j].location.toString() === name ) {
                    state.locations.splice(j, 1);
                    break;
                }
            }
        },
        DELETE_TEMPZONE_BY_NAME(state, name) {
            for(var j=0; j < state.tempZones.length; j++) {
                if (state.tempZones[j]["storage_temperature"].toString() === name ) {
                    state.tempZones.splice(j, 1);
                    break;
                }
            }
        },
        SET_CHEMICALS(state, chemicals) {
            for (var i=0; i < chemicals.length; i++) {
                if (chemicals[i].hasOwnProperty('expiration_date')) {
                    var stringLongExpirationDate = new Date(chemicals[i].expiration_date);
                    var stringShortExpirationDate =  (stringLongExpirationDate.getMonth()+1) + "/" + stringLongExpirationDate.getDate() + "/" + stringLongExpirationDate.getFullYear();
                    chemicals[i].expiration_date = stringShortExpirationDate;
                }

                if (chemicals[i].hasOwnProperty('receive_date')) {
                    var stringLongReceivedDate = new Date(chemicals[i].receive_date);
                    var stringShortReceivedDate =  (stringLongReceivedDate.getMonth()+1) + "/" + stringLongReceivedDate.getDate() + "/" + stringLongReceivedDate.getFullYear();
                    chemicals[i].receive_date = stringShortReceivedDate;
                }
            }
            state.chemicals = chemicals;
        },
        UPDATE_CHEMICAL: function(state, updatedChemical) {
            if (updatedChemical.hasOwnProperty('expiration_date')) {
                var stringLongExpirationDate = new Date(updatedChemical.expiration_date);
                var stringShortExpirationDate =  (stringLongExpirationDate.getMonth()+1) + "/" + stringLongExpirationDate.getDate() + "/" + stringLongExpirationDate.getFullYear();
                updatedChemical.expiration_date = stringShortExpirationDate;
            }

            if (updatedChemical.hasOwnProperty('receive_date')) {
                var stringLongReceivedDate = new Date(updatedChemical.receive_date);
                var stringShortReceivedDate =  (stringLongReceivedDate.getMonth()+1) + "/" + stringLongReceivedDate.getDate() + "/" + stringLongReceivedDate.getFullYear();
                updatedChemical.receive_date = stringShortReceivedDate;
            }
            var arr = state.chemicals;
            var index = -1;
            for(var i = 0; i < arr.length; i++) {
                var barcodeFromAPI = updatedChemical.barcode;
                var barcodeFromStore = arr[i]["barcode"];
                if(barcodeFromAPI == barcodeFromStore) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                var newArr = state.chemicals;
                newArr.splice(index, 1);
                newArr.push(updatedChemical);
                state.chemicals = newArr;
            }
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
            for (var i=0; i < disposedChemicals.length; i++) {
                if (disposedChemicals[i].hasOwnProperty('expiration_date')) {
                    var stringLongExpirationDate = new Date(disposedChemicals[i].expiration_date);
                    var stringShortExpirationDate =  (stringLongExpirationDate.getMonth()+1) + "/" + stringLongExpirationDate.getDate() + "/" + stringLongExpirationDate.getFullYear();
                    disposedChemicals[i].expiration_date = stringShortExpirationDate;
                }

                if (disposedChemicals[i].hasOwnProperty('receive_date')) {
                    var stringLongReceivedDate = new Date(disposedChemicals[i].receive_date);
                    var stringShortReceivedDate =  (stringLongReceivedDate.getMonth()+1) + "/" + stringLongReceivedDate.getDate() + "/" + stringLongReceivedDate.getFullYear();
                    disposedChemicals[i].receive_date = stringShortReceivedDate;
                }

                if (disposedChemicals[i].hasOwnProperty('disposal_date')) {
                    var stringLongDisposalDate = new Date(disposedChemicals[i].disposal_date);
                    var stringShortDisposalDate =  (stringLongDisposalDate.getMonth()+1) + "/" + stringLongDisposalDate.getDate() + "/" + stringLongReceivedDate.getFullYear();
                    disposedChemicals[i].disposal_date = stringShortDisposalDate;
                }
            }
            state.disposedChemicals = disposedChemicals;
        }
    },
    actions: {
        async setActiveUser({commit}, user) {
                user.email = "empty";
                user.frequency = "never";
                user.notifications = true;
                if (!user.hasOwnProperty('username'))
                {
                    commit('SET_ACTIVEUSER', {});
                }
                else
                {
                    return await axios.post(api.getBaseUrl() + '/Users/ValidateUser/', user)
                    .then(response => {
                        if (response.status == 200) {
                            user.email = response.data.email;
                            user.notifications = response.data.notifications;
                            user.frequency = response.data.frequency;
                            commit('SET_ACTIVEUSER', user);
                            return true;
                        } else {
                            commit('SET_ACTIVEUSER', {});
                            return false;
                        }
                    })
                    .catch(error => {
                        commit('SET_ACTIVEUSER', {});
                        return false;
                    }); 
                }
        },
        async updateFrequencyUser ({commit}, userArray) {
            userArray.password = "hidden";
            if (!userArray.hasOwnProperty('username'))
            {
                return false;
            }
            else
            {
                //userArray[0].frequency = userArray[1];
                return await axios.post(api.getBaseUrl() + '/Users/UpdateUserEmailFrequency', userArray)
                .then(response => {
                    if (response.status == 200) {
                        commit('UPDATE_FREQUENCY_USER', userArray);
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(error => {
                    return false;
                }); 
            }
        },
        async updateUserPassword ({commit}, updateUserInfo) {
            console.log(updateUserInfo);
            return await axios.post(api.getBaseUrl() + '/Users/UpdateUserPassword', updateUserInfo)
                .then(response => {
                    if (response.status == 200) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                .catch(error => {
                    console.log(error);
                    return false;
                });
        },
        setFamily({commit}, chemFam) {
             axios.post(api.getBaseUrl() + '/chemicals/family', chemFam)
            .then(response => {
                    commit('SET_FAMILY', response.data);
            })
            .catch(function(error) {
            });
        },
        updateFamily({commit}, chemFam) {
            return axios.post(api.getBaseUrl() + '/chemicals/family/update', chemFam)
            .then(response => {
                if (response.status == 200) {
                    commit('SET_FAMILY_FROM_UPDATE', response.data);
                    return true;                
                } else {
                    return false;
                }
            })
            .catch(function(error) {
                return false;
            })
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
                //commit('DELETE_CHEMICAL_BY_BARCODE', barcodes);
            /*})
            .catch(function(error) {

            }); */
            for (var barcode, i=0; barcode=barcodes[i++];) {
                axios.delete(api.getBaseUrl() + '/chemicals/' + this.getters.findChemicalByBarcode(barcode.toString())["barcode"])
                .then(response => {

                })
                .catch(function(error) {

                })
            }
            commit('DELETE_CHEMICAL_BY_BARCODE', barcodes);

        },
        deleteChemicalByList({commit}, barcodesList) {
            axios.post(api.getBaseUrl() + '/chemicals/deleteBatch/', barcodesList)
            .then(response => {

            })
            .catch(function(error) {

            });
            commit('DELETE_CHEMICAL_BY_BARCODE', barcodesList);
        },
        setDisposedChemicals({commit}) {
            //remove comments when api call is implemented
            axios.get(api.getBaseUrl() + '/chemicals/disposed')
            .then(response => {
                commit('SET_DISPOSED', response.data);
            })
            .catch(function(error) {

            })
        },
        setMostRecentDisposedChemicals({commit}, topNumber) {
            axios.get(api.getBaseUrl() + '/chemicals/disposed/top/' + topNumber)
            .then(response => {
                commit('SET_DISPOSED', response.data);
            })
            .catch(function(error) {

            })
        },
        setDisposedChemicalsByDate({commit}, arrDate) {
            axios.get(api.getBaseUrl() + '/chemicals/disposed/dates', {
                params: {
                    toDate: arrDate[0],
                    fromDate: arrDate[1]
                }
            })
            .then(response => {
                commit('SET_DISPOSED', response.data);
            })
            .catch(function(error) {

            })
        },
        addNewChemical({commit}, newChemical) {
            return axios.post(api.getBaseUrl() + '/chemicals/CreateChemicals', newChemical)
            .then(response => {
                //do something
                return response.data;
            })
            .catch(function(error) {
                //do something
            })
            
        },
        updateChemical({commit}, updatedChemical) {
            axios.put(api.getBaseUrl() + '/chemicals/' + updatedChemical.id, updatedChemical)
            .then(response => {
                commit('UPDATE_CHEMICAL', response.data);
            })
            .catch(function(error) {

            });
        },
        addLocation({commit}, newLoc) {
            axios.post(api.getBaseUrl() + '/locations', newLoc)
            .then(response => {
                commit('ADD_SINGLE_LOCATION', response.data);
            })
            .catch(function(error) {
                return false;
            });
        },
        setLocations({commit}) {
            axios.get(api.getBaseUrl() + '/locations')
            .then(response => {
                if (response.status == 200 ) {
                    commit('SET_LOCATIONS', response.data);
                }
            })
            .catch(function(error) {

            });
        },
        deleteLocation({commit}, selectedLocation) {
            return axios.post(api.getBaseUrl() + '/locations/delete', selectedLocation)
            .then(response => {
                commit('DELETE_LOCATION_BY_NAME', selectedLocation.location);
                return true;
            })
            .catch(function(error) {
                return {fail: error.response.data};
            });
        },
        setTempZones({commit}) {
            axios.get(api.getBaseUrl() + '/TempZones')
            .then(response => {
                if (response.status == 200 ) {
                    commit('SET_TEMPZONES', response.data);
                }
            })
            .catch(function(error) {

            });
        },
        addTempZone({commit}, newTemp) {
            axios.post(api.getBaseUrl() + '/TempZones', newTemp)
            .then(response => {
                commit('ADD_SINGLE_TEMPZONE', response.data);
            })
            .catch(function (error) {

            });
        },
        deleteTempZone({commit}, selectedTemp) {
            return axios.post(api.getBaseUrl() + '/TempZones/delete', selectedTemp)
            .then(response => {
                commit('DELETE_TEMPZONE_BY_NAME', selectedTemp["storage_temperature"]);
                return true;
            })
            .catch(function(error) {
                return {fail: error.response.data};
            });
        }
    },
    getters: {
        activeUser: state => state.activeUser,
        chemicals: state => state.chemicals,
        disposedChemicals: state => state.disposedChemicals,
        activeFamily: state => state.families,
        locations: state => state.locations,
        tempZones: state => state.tempZones,
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
        },
    }
}
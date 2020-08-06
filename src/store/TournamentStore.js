import Vue from 'vue';
import Vuex from 'vuex';
import * as _ from 'lodash';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        tournaments: JSON.parse(localStorage.getItem("tournaments")) || [],
        currentTournament: null
    },
    getters: {
        getPlayer: (state) => (tournamentId, playerId) => {
            const tournament = _.find(state.tournaments, (t) => t.id == tournamentId);
            return _.find(tournament.players, (player) => player.id = playerId);
        }
    },
    mutations:{
        selectTournament(state, tournament){
            state.currentTournament = _.find(state.tournaments, (t) => t.id == tournament.tournamentId) || null;
        },
        addTournament(state,tournament){
            state.tournaments.push(tournament.tournament);
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        },
        deleteTournament(state, tournament) {
            state.tournaments = _.filter(state.tournaments, (t) => t.id == tournament);
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        },
        saveTournaments(state){
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        },
        addPlayer(state,player){
            state.currentTournament.players.push(player.player);
            _.find(state.tournaments, (tournament) => tournament.id == state.currentTournament.id).players = state.currentTournament.players;
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        },
        updatePlayer(state,player){
            const index = _.findIndex(state.currentTournament.players, {id:player.id});
            state.currentTournament.players.splice(index,1,player.player);
            _.find(state.tournaments, (tournament) => tournament.id == state.currentTournament.id).players = state.currentTournament.players;
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        },
        deletePlayer(state,playerId){
            state.currentTournament.players = _.filter(state.currentTournament.players, (player) => player.id != playerId.playerId);
            localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
        }
    }
})
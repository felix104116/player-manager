<template>
  <div>
      <form @submit.prevent="onAdd">
        Name: <input v-model="player.name" /><br/>
        Country: <input v-model="player.country" /><br/>
        Team: <input v-model="player.team" /><br/>
        Race: 
        <select v-model="player.race">
            <option v-for="raceOption in raceOptions" :key="raceOption">{{raceOption}}</option> 
        </select><br/>
        <b-button type="submit">Submit</b-button>
      </form>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
export default {
    name:'AddPlayer',
    data(){
        return {
            player: {
                id: uuid(),
                name: "",
                country: "",
                team: "",
                race: ""
            },
            raceOptions: ["Protoss", "Random", "Terran", "Zerg"]
        }
    },
    mounted(){
        this.$store.commit({ type: 'selectTournament', tournamentId: this.$route.params.id });
        if(this.$route.query.playerId) {
            this.player = this.$store.getters.getPlayer(this.$route.params.id, this.$route.query.playerId);
        }
    },
    methods: {
        onAdd(){
            this.$store.commit({
                type: this.$route.query.playerId ? 'updatePlayer' : 'addPlayer',
                player: this.player
            })
        }
    }
}
</script>

<style>

</style>
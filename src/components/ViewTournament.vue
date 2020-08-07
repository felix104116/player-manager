<template>
  <div>
      <!-- Players Section --> 
      <h3>Players</h3>
      <ManageTable :items="tournament.players" :features="playersFeatures" :fields="playersFields" @edit="onEdit" @add="onAdd" @delete="onDelete"/>
      <!-- End Players Section --> 
      <!-- Groupe Stages Section -->
      <div v-if="isGroupeStageSelected && tournament.nbGroupStages" >
          <GroupeStages :groupStageNumber="index" v-for="index in nbGroupStages" :key="index"/>
      </div>
      <!-- End Groupe Stages Section -->
  </div>
</template>

<script>
import GroupeStages from './GroupeStages';
import ManageTable from './ManageTable';
import * as _ from 'lodash';
export default {
    name: "ViewTournament",
    components:{
        GroupeStages,
        ManageTable
    },
    computed: {
        isGroupeStageSelected(){ 
            return _.includes(this.tournament.format, "Group Stage");
        },
        nbGroupStages(){
            return _.range(0, this.tournament.nbGroupStages);
        }
       
    },
    data(){
        return {
            tournament: {},
            playersFeatures: ["add","edit","delete"],
            playersFields: ["name","race","country","team","Actions"]
        }
    },
    mounted(){
        this.tournament = _.find(this.$store.state.tournaments, (tournament) => tournament.id == this.$route.params.id);
        this.$store.commit({
            type: 'selectTournament',
            tournamentId: this.tournament.id
        })
    },
    methods: {
        onAdd(){
            this.$router.push(`/tournaments/${this.tournament.id}/players`)
        },
        onEdit(playerId){
            this.$router.push({ path: `/tournaments/${this.tournament.id}/players`, query: { playerId }})
        },
        onDelete(playerId){
            this.$store.commit({
                type: 'deletePlayer',
                playerId
            })
        }
    }
}
</script>

<style>

</style>
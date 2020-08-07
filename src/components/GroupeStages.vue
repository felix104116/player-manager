<template>
  <div>
    <h5>Group Stage {{groupStageNumber + 1}}</h5>    
    <Group :id="index" v-for="index in numberGroup" :key="index"/>
  </div>
</template>

<script>

import Group from './Group';
import * as _ from 'lodash';
export default {
components: {
  Group,
 },
data(){
  return {
     nbPlayersPerGroup: 4,
     maxPlayers: 0,
     playersCount: 0,
     groupCount: 0,
  }
},

mounted(){
  this.nbPlayersPerGroup = this.$store.state.currentTournament.nbPlayersPerGroup;
  this.maxPlayers = this.$store.state.currentTournament.maxPlayers;
  
  this.playersCount = this.maxPlayers / (this.groupStageNumber + 1);
  this.groupCount = this.playersCount / this.nbPlayersPerGroup;
},
computed: {
    numberGroup(){
      return _.range(0, this.groupCount);      
    }
},
props: {
  groupStageNumber:Number
},
}
</script>

<style>

</style>
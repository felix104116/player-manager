<template>
  <div>
      <form @submit.prevent="onAdd">
      Tournament name: <input v-model="tournament.name" required /><br/>
      Organizer: <input v-model="tournament.organizer" required /><br/>
      Series: <input v-model="tournament.series" /><br/>
      Location: <input v-model="tournament.location" required /><br/>
      Game version: <input v-model="tournament.version" required /><br/>
      Number of players: <input v-model="tournament.maxPlayers" type="number" required/><br/>
      Prize Pool:  <input v-model="tournament.prize" required/><br/>
      Type: <select v-model="tournament.type" required><option v-for="typeOption in typeOptions" :key="typeOption">{{typeOption}}</option></select><br/>
      Server: <select v-model="tournament.server" required><option v-for="serverOption in serverOptions" :key="serverOption">{{serverOption}}</option></select><br/>
      Liquipedia Tier: <select v-model="tournament.tier" required><option v-for="tier in liquipediaTiers" :key="tier">{{tier}}</option></select><br/>
      Format: <select v-model="tournament.format" multiple required><option v-for="formatOption in formatOptions" :key="formatOption">{{formatOption}}</option></select><br/>
      <input type="submit" value="Add Tournament"/>
      </form>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
export default {
    name:'AddTournament',
    data(){
        return {
            tournament: {
                id: uuid(),
                name: "",
                maxPlayers: 0,
                organizer: "",
                series: "",
                location: "",
                server: "",
                type: "",
                format: [],
                version: "",
                prize: "",
                tier: "",
                startDate: "TBD",
                endDate: "TBD",
                players: [],
                matches: [],
                standings: []
            },
            typeOptions: ["Online", "Offline"],
            serverOptions: ["Americas", "Europe", "China", "South Korea"],
            formatOptions: ["1v1", "Team League","Group Stage","Single Elimination", "Double Elimination", "Bracket"],
            liquipediaTiers: ["Premier", "Major", "Minor", "Team", "Monthly", "Weekly", "Show Match", "Female"]
        }
    },
    methods: {
        onAdd(){
            this.$store.commit({
                type: 'addTournament',
                tournament: this.tournament
            })
            this.$router.push('/');
        }
    },
    mounted(){
        this.tournament.type = this.typeOptions[0];
        this.tournament.server = this.serverOptions[0];
        this.tournament.tier = this.liquipediaTiers[0];
    }
}
</script>

<style>

</style>
<template>
  <div>
    <form @submit.prevent="onAdd">
      Tournament name:
      <input v-model="tournament.name" required />
      <br />Organizer:
      <input v-model="tournament.organizer" required />
      <br />Series:
      <input v-model="tournament.series" />
      <br />Location:
      <input v-model="tournament.location" required />
      <br />Game version:
      <input v-model="tournament.version" required />
      <br />Number of players:
      <input v-model="tournament.maxPlayers" type="number" required />
      <br />Prize Pool:
      <input v-model="tournament.prize" required />
      <br />Type:
      <select v-model="tournament.type" required>
        <option v-for="typeOption in typeOptions" :key="typeOption">{{typeOption}}</option>
      </select>
      <br />Server:
      <select v-model="tournament.server" required>
        <option v-for="serverOption in serverOptions" :key="serverOption">{{serverOption}}</option>
      </select>
      <br />Liquipedia Tier:
      <select v-model="tournament.tier" required>
        <option v-for="tier in liquipediaTiers" :key="tier">{{tier}}</option>
      </select>
      <br />Format:
      <select v-model="tournament.format" multiple required>
        <option v-for="formatOption in formatOptions" :key="formatOption">{{formatOption}}</option>
      </select>
      <br />
      <div v-if="isGroupeStageSelected">
        How many players per group?
        <input v-model="tournament.nbPlayersPerGroup" required />
        <br />How many group stages?
        <input v-model="tournament.nbGroupStages" required />
        <br />
      </div>

      <input type="submit" value="Add Tournament" />
    </form>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import * as _ from "lodash";
export default {
  name: "AddTournament",
  computed: {
    isGroupeStageSelected() {
      return _.includes(this.tournament.format, "Group Stage");
    },
  },
  data() {
    return {
      tournament: {
        id: uuid(),
        groupStages: [],
        name: "",
        maxPlayers: 0,
        nbPlayersPerGroup: 4,
        nbGroupStages: 1,
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
        standings: [],
      },
      typeOptions: ["Online", "Offline"],
      serverOptions: ["Americas", "Europe", "China", "South Korea"],
      formatOptions: [
        "1v1",
        "Team League",
        "Group Stage",
        "Single Elimination",
        "Double Elimination",
        "Bracket",
      ],
      liquipediaTiers: [
        "Premier",
        "Major",
        "Minor",
        "Team",
        "Monthly",
        "Weekly",
        "Show Match",
        "Female",
      ],
    };
  },
  methods: {
    onAdd() {
      if (_.includes(this.tournament.format, "Group Stage")) {
        for (let index of _.range(0, this.tournament.nbGroupStages)) {
          const groupStage = {
            id: index,
            groups: [],
          };

          const playersCount = this.tournament.maxPlayers / (index + 1);

          const groupCount = playersCount / this.tournament.nbPlayersPerGroup;

          for (let groupNumber of _.range(0, groupCount)) {
            const group = {
              id: groupNumber,
              players: [],
              matches: [],
            };

            groupStage.groups.push(group);
          }
          this.tournament.groupStages.push(groupStage);
        }
      }

      this.$store.commit({
        type: "addTournament",
        tournament: this.tournament,
      });
      this.$router.push("/");
    },
  },
  mounted() {
    this.tournament.type = this.typeOptions[0];
    this.tournament.server = this.serverOptions[0];
    this.tournament.tier = this.liquipediaTiers[0];
  },
};
</script>

<style>
</style>
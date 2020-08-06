<template>
  <div>
      <ManageTable :items="tournaments" :title="'Tournaments'" filter :features="features" :fields="fields" @add="onAdd" @delete="onDelete" @view="onView" />
  </div>
</template>

<script>
import ManageTable from "../components/ManageTable";
export default {
    name:'MainPage',
    components: {
        ManageTable
    },
    computed: {
        tournaments(){
            return this.$store.state.tournaments;
        }
    },
    data(){
        return {
            features: ['add','view','delete'],
            fields: [
                {
                    key: "id",
                    label: "Id"
                },
                {
                    key: "name",
                    label: "Name"
                },
                {
                    key: "Actions",
                    label: "Actions"
                }
            ]
        }
    },
    methods: {
        onView(tournament){
            console.log(tournament);
            this.$router.push(`/tournaments/${tournament}`)
        },
        onDelete(tournament){
            this.$store.commit({
                type: 'deleteTournament',
                tournament
            })
            localStorage.setItem("tournaments", JSON.stringify(this.$store.state.tournaments));
        },
        onAdd(){
            this.$router.push(`/add`);
        }
    },
    mounted(){
    }
}
</script>

<style>

</style>
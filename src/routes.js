import MainPage from "./pages/MainPage.vue"
import HelloWorld from './components/HelloWorld.vue'
import AddTournament from "./components/AddTournament.vue";
import AddPlayer from "./components/AddPlayer.vue";
import ViewTournament from "./components/ViewTournament.vue";

export const routes = [
    { path: '/', component: MainPage },
    { path: '/add', component: AddTournament },
    { path: '/tournaments/:id', component: ViewTournament },
    { path: '/tournaments/:id/players', component: AddPlayer },
    { path: '*', component: HelloWorld }
];
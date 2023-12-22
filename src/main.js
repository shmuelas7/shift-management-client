import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import logIn from './pages/logIn.vue'
import main_page from './pages/main_page.vue'
import App from './App.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: logIn },
        { path: '/main', component: main_page }]
})
const store = createStore({
    state() {
        return {
            userId: '',
        }
    }

})
const app = createApp(App);
app.use(store);
app.use(router);

app.mount('#app');

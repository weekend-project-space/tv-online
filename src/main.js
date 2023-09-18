import {
    createApp
} from 'vue'
import './style.css'
import VideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import router from './router'
import App from './App.vue'

createApp(App).use(VideoPlayer).use(router).mount('#app')
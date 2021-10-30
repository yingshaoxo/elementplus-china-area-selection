import { createApp } from 'vue';
import Dev from './serve.vue';

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(Dev);
// app.use(ElementPlus)
app.mount('#app');

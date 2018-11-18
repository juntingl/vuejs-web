import Vue from 'vue';
import moment from './moment';

// 注册全局过滤器
Vue.filter('moment', moment);

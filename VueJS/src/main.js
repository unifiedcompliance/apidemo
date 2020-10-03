// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Prism from 'prismjs'
import entities from 'he'
import vueCustomElement from 'vue-custom-element'

Vue.use(vueCustomElement, Vuex, VueAxios, axios, Prism, entities)

window.axios = axios

window.entities = entities

Vue.customElement('api-demo', App)

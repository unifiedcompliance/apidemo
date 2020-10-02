<template>
  <component :is="selPage" @changePage="changePage" :ucconfig="ucconfig" :submenu="submenu"
             selPage="ContactInfo"></component>
</template>

<script>

import ucconfig from '@/config'
import Index from '@/components/index'
import Settings from '@/components/settings'
import ContactInfo from '@/components/contactinfo'
import Users from '@/components/users'
import Groups from '@/components/groups'
import Initiatives from '@/components/initiatives'
import AdLists from '@/components/adlists'
import AuthDocs from '@/components/authdocs'
import ADHierarchy from '@/components/adhierarchy'
import SubjectMatters from '@/components/subjectmatters'
import ADRequests from '@/components/adrequests'

export default {
  name: 'App',
  props: ['page'],
  data () {
    return {
      currPage: 'Index',
      ucconfig,
      endpoints: ['Index', 'Settings', 'ContactInfo', 'Users', 'Groups', 'Initiatives', 'AdLists', 'ADRequests', 'AuthDocs', 'ADHierarchy', 'SubjectMatters'],
      submenu: [
        {name: 'Contact Info', url: 'ContactInfo'},
        {name: 'Groups', url: 'Groups'},
        {name: 'Initiatives', url: 'Initiatives'},
        {name: 'Users', url: 'Users'}]
    }
  },
  components: {
    Index,
    Settings,
    ContactInfo,
    Users,
    Groups,
    Initiatives,
    AdLists,
    AuthDocs,
    ADHierarchy,
    SubjectMatters,
    ADRequests
  },
  mounted () {
  },
  created () {
    this.changePage(this.page)
  },
  watch: {
    page () {
      this.selPage = this.page
    }
  },
  methods: {
    changePage: function (page) {
      this.currPage = page
    }
  },
  computed: {

    selPage: {
      get: function () {
        return this.endpoints.includes(this.currPage) ? this.currPage : 'Index'
      },
      set: function (val) {
        this.currPage = this.endpoints.includes(val) ? val : 'Index'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './assets/styles/contact-engine';

#app {

}
</style>

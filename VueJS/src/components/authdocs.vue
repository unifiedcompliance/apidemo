<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="AuthDocs"></ucsubheader>
      <!--end section based sub-headers-->
      <div class="container container-top-level page-content">
        <div class="alert alert-danger hidden" role="alert">
          <button type="button" class="close" aria-label="Close" data-dismiss="alert">
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
          <strong>Error: </strong>
          <span></span>
        </div>
        <div class="col-lg-12 margin-top-10">
          <div class=“table-responsive”>
            <table class="table table-bordered table-striped table-characters">
              <thead>
              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Description</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="authdoc in authdocs">
                <td>{{authdoc.id}}</td>
                <td>{{authdoc.name}}</td>
                <td>{{authdoc.description}}</td>
              </tr>
              </tbody>
            </table>
          </div>

    </div>
  </div>
    </div>
  </div>
</template>

<script>
import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
import ucsubheader from '@/components/ucsubheader'
export default {
  name: 'authdocs',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader
  },
  props: ['ucconfig'],
  data () {
    return {
      results: [],
      authdocs: [],
      submenu: [{name: 'AD Lists', url: 'AdLists'}, {name: 'Authority Documents', url: 'AuthDocs'}, {name: 'AD Requests', url: 'ADRequests'}, {name: 'AD Hierarchy', url: 'ADHierarchy'}, {name: 'Subject Matters', url: 'SubjectMatters'}]
    }
  },
  mounted () {},
  created () {
    let resp; let docResp = null
    let _self = this

    if (resp = this.getDocs()) {
      resp.then(function (data) {
        _self.results = data

        _self.results.forEach(function (doc) {
          if (docResp = _self.getDocDetails(doc.authority_document._href)) {
            docResp.then(function (docDetails) {
              let newDoc = {
                id: doc.authority_document.id,
                name: docDetails.common_name,
                description: docDetails.description
              }
              _self.authdocs.push(newDoc)
            })
          }
        })
      })
      console.log(this)
    }
  },
  methods: {
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    getDocs: function () {
      return axios.get(this.ucconfig.authDocUrl, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getDocDetails: function (url) {
      return axios.get(url, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';

  .contactinfoinpt{
    padding: 0 0 0 5px !important;
    margin: 0 !important;
    height: 30px !important;
  }

  .contactinfolbl{
    margin: 0;
    padding: 8px 0;
  }

  .no-padding {
    padding: 0px;
  }
tbody > td {
  word-wrap: break-word;
}
</style>

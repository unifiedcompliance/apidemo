<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <div class="subheader-nav">
        <div class="container">
          <ul id="main-menu">
            <li>
              <a class="activeLink" href="javascript:;">
                API Key
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!--end section based sub-headers-->
      <div class="container container-top-level page-content">
        <div class="alert alert-danger hidden" role="alert">
          <button type="button" class="close" aria-label="Close" data-dismiss="alert">
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
          <strong>Error: </strong>
          <span></span>
        </div>
    <div class="col-lg-4 margin-top-10" v-if="results.account_id">
    <div class="box"><span class="box-title">API Info</span>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label>Key</label>
            <input type="text" class="form-control" placeholder="" :value="this.ucconfig.apiKey" disabled="">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label>Account ID</label>
            <input type="text" class="form-control" placeholder="" :value="results.account_id" disabled="">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label>Valid Until</label>
            <input type="text" class="form-control" placeholder="" :value="results.subscription_expires" disabled="">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

    </div>
  </div>
</template>

<script>
import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
export default {
  name: 'settings',
  components: {
    'ucheader': ucheader,
    'ucsidebar': ucsidebar
  },
  props: ['ucconfig'],
  data () {
    return {
      results: []
    }
  },
  mounted () {},
  created () {
    /*
    let _self = this

    this.getSubscriptionExpiration().then ( (results) => {
      _self.results = results
      console.log(_self.results)
    })
    */
    this.results = this.getSubscriptionExpiration()
  },
  methods: {
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    getSubscriptionExpiration () {
      /*
      return {
        "subscription_expires": "2021-03-05 21:07:50",
        "account_id": 16904
      }
    } */

      return axios.get(this.ucconfig.apiUrl + '/subscription-expiration', {
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

</style>

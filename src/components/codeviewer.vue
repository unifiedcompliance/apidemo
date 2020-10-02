<template>
  <div class="row margin-top-10 pull-left col-lg-6">
    <div class="panel with-nav-tabs panel-default">
      <div class="panel-heading">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#tab1default" data-toggle="tab">Code <span class="caret"></span></a></li>
          <li><a href="#tab2default" data-toggle="tab">Markup</a></li>
          <li><a href="#tab3default" data-toggle="tab">Request</a></li>
          <li class="dropdown">
            <a href="javascript:;" data-toggle="dropdown">Response</a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#tab4default" data-toggle="tab">Default 4</a></li>
              <li><a href="#tab5default" data-toggle="tab">Default 5</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="panel-body">
        <div class="tab-content">
          <div class="tab-pane fade in active" id="tab1default">
            <pre class="height225px">

import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
import codeviewer from '@/components/codeviewer'
export default {
  name: 'settings',
  components: {
    'ucheader': ucheader,
    'ucsidebar': ucsidebar,
    'codeviewer': codeviewer
  },
  data () {
    return {
      results: []
    }
  },
  mounted () {console.log('mounted')},
  created () {
    let _self = this

    this.getSubscriptionExpiration().then ( (results) => {
      _self.results = results
      console.log(_self.results)
    })

    console.log(this.results)
  },
  methods: {
    getSubscriptionExpiration () {
      return axios.get('http://localhost:8080/ucapi/subscription-expiration', {
          crossdomain: true,
          withCredentials: false,
          headers: {
            'Authorization': `Bearer ${this.$root.apiKey}`
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

            </pre>
          </div>
          <div class="tab-pane fade" id="tab2default">Default 2</div>
          <div class="tab-pane fade" id="tab3default">Default 3</div>
          <div class="tab-pane fade" id="tab4default">Default 4</div>
          <div class="tab-pane fade" id="tab5default">Default 5</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'codeviewer'
}
</script>

<style scoped>
  .panel.with-nav-tabs .panel-heading{
    padding: 0px 5px 0 0px;
  }
  .panel.with-nav-tabs .nav-tabs{
    border-bottom: none;
  }
  .panel.with-nav-tabs .nav-justified{
    margin-bottom: -1px;
  }
  /********************************************************************/
  /*** PANEL DEFAULT ***/

  .with-nav-tabs.panel-default .nav-tabs > .open > a,
  .with-nav-tabs.panel-default .nav-tabs > .open > a:hover,
  .with-nav-tabs.panel-default .nav-tabs > .open > a:focus,
  .with-nav-tabs.panel-default .nav-tabs > li > a:hover,
  .with-nav-tabs.panel-default .nav-tabs > li > a:focus {
    color: #777;
    background-color: #ddd;
    border-color: transparent;
  }
  .with-nav-tabs.panel-default .nav-tabs > li.active > a,
  .with-nav-tabs.panel-default .nav-tabs > li.active > a:hover,
  .with-nav-tabs.panel-default .nav-tabs > li.active > a:focus {
    color: #555;
    background-color: #fff;
    border-color: #ddd;
    border-bottom-color: transparent;
  }
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #f5f5f5;
    border-color: #ddd;
  }
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #777;
  }
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #ddd;
  }
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a,
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
  .with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #555;
  }
  /********************************************************************/
  /*** PANEL PRIMARY ***/
  .with-nav-tabs.panel-primary .nav-tabs > li > a,
  .with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
    color: #fff;
  }
  .with-nav-tabs.panel-primary .nav-tabs > .open > a,
  .with-nav-tabs.panel-primary .nav-tabs > .open > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > .open > a:focus,
  .with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
    color: #fff;
    background-color: #3071a9;
    border-color: transparent;
  }
  .with-nav-tabs.panel-primary .nav-tabs > li.active > a,
  .with-nav-tabs.panel-primary .nav-tabs > li.active > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > li.active > a:focus {
    color: #428bca;
    background-color: #fff;
    border-color: #428bca;
    border-bottom-color: transparent;
  }
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #428bca;
    border-color: #3071a9;
  }
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #fff;
  }
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #3071a9;
  }
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a,
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
  .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    background-color: #4a9fe9;
  }

  .panel {
    border: .1em solid #eee;
  }

  .panel-default>.panel-heading {
    border-color: transparent;
    border-bottom: none;
  }
  .panel-default>ul.nav-tabs>li>a, .panel-default>ul.nav-tabs>li>a.active {
    border: none;
  }
  .panel-heading>ul.nav-tabs>li>a { border: none;}
</style>

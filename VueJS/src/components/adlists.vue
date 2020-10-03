<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="AdLists"></ucsubheader>
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
          <div class="col-md-3">
            <div class=“table-responsive”>
              <table class="table table-bordered table-striped table-characters" id="grpTbl">
                <thead>
                <tr>

                  <th>Name</th>

                  <th>Status</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="adlist in results.ad_lists">
                  <td @click="setGroupInfo(group.id)">{{adlist.name}}</td>
                  <td>{{adlist.active_status}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-9">
            <div class="panel with-nav-tabs panel-default">
              <div class="panel-heading">
                <ul class="nav nav-tabs">
                  <li class="dropdown">
                    <a href="#tab1default" data-toggle="tab" id="liststab1">AD List Info</a></li>
                  <li><a href="#tab2default" data-toggle="tab" @click="showGroups()">Groups</a></li>
                  <li><a href="#tab3default" data-toggle="tab" @click="showInitiatives()">Initiatives</a></li>
                  <li><a href="#tab4default" data-toggle="tab" @click="showAD()">Authority Documents</a></li>
                  <li><a href="#tab5default" data-toggle="tab" @click="showComControls()">Common Controls</a></li>
                </ul>
              </div>
              <div class="panel-body">
                <div class="tab-content">
                  <div class="tab-pane fade in active" id="tab1default">
                    <div class="box margin-top-20"><span class="box-title">AD List Basics</span>
                      <div class="row">
                        <div class="col-sm-8 no-padding">
                          <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.name" disabled="">
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label>ID</label>
                            <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.id" disabled="">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4 no-padding">
                          <div class="form-group">
                            <label>Created On</label>
                            <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.date_created" disabled="">
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label>Updated on</label>
                            <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.date_updated" disabled="">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8 no-padding">
                          <div class="form-group">
                            <label>Created By</label>
                            <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.created_by" disabled="">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box margin-top-20"><span class="box-title">Status</span>
                        <div class="row">
                          <div class="col-sm-4 no-padding">
                            <div class="form-group">
                              <label>Publish</label>
                              <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.publish" disabled="">
                            </div>
                          </div>
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label>Restricted</label>
                              <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.restricted" disabled="">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-4 no-padding">
                            <div class="form-group">
                              <label>Publish Status</label>
                              <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.publish_status" disabled="">
                            </div>
                          </div>
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label>Out of Date</label>
                              <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.outofdate" disabled="">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-8 no-padding">
                            <div class="form-group">
                              <label>Publish ID</label>
                              <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selInfo.publish_ident" disabled="">
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab2default">
                    <div v-if="selGroups.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                          <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="group in selGroups">
                          <td>{{group.id}}</td>
                          <td>{{group.name}}</td>
                          <td>{{group.description}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selGroups.length == 0" class="table-responsive margin-top-10">
                      <span>No groups found</span>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab3default">
                    <div v-if="selInitiatives.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                          <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="initiative in selInitiatives">
                          <td>{{initiative.id}}</td>
                          <td>{{initiative.name}}</td>
                          <td>{{initiative.description}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selInitiatives.length == 0" class="table-responsive margin-top-10">
                      <span>No Initiatives found</span>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab4default">
                    <div v-if="selAD.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                          <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="adlist in selAD">
                          <td>{{adlist.id}}</td>
                          <td>{{adlist.common_name}}</td>
                          <td>{{adlist.description}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selAD.length == 0" class="table-responsive margin-top-10">
                      <span>No Authority Documents found</span>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab5default">
                    <div v-if="selComControls" class=“table-responsive”>
                      <!--<table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                        </tr>
                        </thead>
                        <tbody v-for="comControls in selComControls">
                        <tr v-for="comControl in comControls">
                          <td>{{comControl.id}}</td>
                          <td>{{comControl.name}}</td>
                        </tr>
                        </tbody>
                      </table>-->
                      <div class="just-padding">

                        <div class="list-group list-group-root well">

                          <a href="#item-1" class="list-group-item" data-toggle="collapse">
                            <i class="glyphicon glyphicon-chevron-right"></i>Item 1
                          </a>
                          <div class="list-group collapse" id="item-1">

                            <a href="#item-1-1" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.1
                            </a>
                            <div class="list-group collapse" id="item-1-1">
                              <a href="#" class="list-group-item">Item 1.1.1</a>
                              <a href="#" class="list-group-item">Item 1.1.2</a>
                              <a href="#" class="list-group-item">Item 1.1.3</a>
                            </div>

                            <a href="#item-1-2" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.2
                            </a>
                            <div class="list-group collapse" id="item-1-2">
                              <a href="#" class="list-group-item">Item 1.2.1</a>
                              <a href="#" class="list-group-item">Item 1.2.2</a>
                              <a href="#" class="list-group-item">Item 1.2.3</a>
                            </div>

                            <a href="#item-1-3" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.3
                            </a>
                            <div class="list-group collapse" id="item-1-3">
                              <a href="#" class="list-group-item">Item 1.3.1</a>
                              <a href="#" class="list-group-item">Item 1.3.2</a>
                              <a href="#" class="list-group-item">Item 1.3.3</a>
                            </div>

                          </div>

                          <a href="#item-2" class="list-group-item" data-toggle="collapse">
                            <i class="glyphicon glyphicon-chevron-right"></i>Item 2
                          </a>
                          <div class="list-group collapse" id="item-2">

                            <a href="#item-2-1" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.1
                            </a>
                            <div class="list-group collapse" id="item-2-1">
                              <a href="#" class="list-group-item">Item 2.1.1</a>
                              <a href="#" class="list-group-item">Item 2.1.2</a>
                              <a href="#" class="list-group-item">Item 2.1.3</a>
                            </div>

                            <a href="#item-2-2" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.2
                            </a>
                            <div class="list-group collapse" id="item-2-2">
                              <a href="#" class="list-group-item">Item 2.2.1</a>
                              <a href="#" class="list-group-item">Item 2.2.2</a>
                              <a href="#" class="list-group-item">Item 2.2.3</a>
                            </div>

                            <a href="#item-2-3" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.3
                            </a>
                            <div class="list-group collapse" id="item-2-3">
                              <a href="#" class="list-group-item">Item 2.3.1</a>
                              <a href="#" class="list-group-item">Item 2.3.2</a>
                              <a href="#" class="list-group-item">Item 2.3.3</a>
                            </div>

                          </div>

                          <a href="#item-3" class="list-group-item" data-toggle="collapse">
                            <i class="glyphicon glyphicon-chevron-right"></i>Item 3
                          </a>
                          <div class="list-group collapse" id="item-3">

                            <a href="#item-3-1" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.1
                            </a>
                            <div class="list-group collapse" id="item-3-1">
                              <a href="#" class="list-group-item">Item 3.1.1</a>
                              <a href="#" class="list-group-item">Item 3.1.2</a>
                              <a href="#" class="list-group-item">Item 3.1.3</a>
                            </div>

                            <a href="#item-3-2" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.2
                            </a>
                            <div class="list-group collapse" id="item-3-2">
                              <a href="#" class="list-group-item">Item 3.2.1</a>
                              <a href="#" class="list-group-item">Item 3.2.2</a>
                              <a href="#" class="list-group-item">Item 3.2.3</a>
                            </div>

                            <a href="#item-3-3" class="list-group-item" data-toggle="collapse">
                              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.3
                            </a>
                            <div class="list-group collapse" id="item-3-3">
                              <a href="#" class="list-group-item">Item 3.3.1</a>
                              <a href="#" class="list-group-item">Item 3.3.2</a>
                              <a href="#" class="list-group-item">Item 3.3.3</a>
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                    <div v-if="selComControls.length == 0" class="table-responsive margin-top-10">
                      <span>No Common Controls found</span>
                    </div>
                  </div>
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
import 'bootstrap-sass/assets/javascripts/bootstrap.min'
import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
import ucsubheader from '@/components/ucsubheader'
import $ from 'jquery/dist/jquery.min'

export default {
  name: 'adlists',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader
  },
  props: ['ucconfig'],
  data () {
    return {
      results: [],
      admin: [],
      selInfo: [],
      selGroups: [],
      selInitiatives: [],
      selAD: [],
      selComControls: [],
      submenu: [{name: 'AD Lists', url: 'AdLists'}, {name: 'Authority Documents', url: 'AuthDocs'}, {name: 'AD Requests', url: 'ADRequests'}, {name: 'AD Hierarchy', url: 'ADHierarchy'}, {name: 'Subject Matters', url: 'SubjectMatters'}]

    }
  },
  mounted () {

  },
  created () {
    if (this.results = this.getMyAccount()) {
      this.admin = this.getAdmin()
      this.setInfo(this.results.ad_lists[0].id)
      $('.list-group-item').on('click', function () {
        $('.glyphicon', this)
          .toggleClass('glyphicon-chevron-right')
          .toggleClass('glyphicon-chevron-down')
      })
    }
  },
  methods: {
    getCreator: function (adinfo) {
      return axios.get(adinfo.creator._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          return response.data.first_name + ' ' + response.data.last_name
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    showMapUrl: function () {
      return 'https://www.google.com/maps/embed/v1/place?q=' + this.selInfo.map_coordinates + '&zoom=' + this.selInfo.map_zoom + '&key=' + this.ucconfig.gApiKey
    },
    setInfo: function (lid) {
      let _self = this
      let adlist = this.results.ad_lists.filter(function (adl) {
        return adl.id === lid
      })

      if (adlist.length > 0) {
        this.getCreator(adlist[0]).then(function (creator) {
          _self.selInfo = adlist[0]

          _self.selInfo.created_by = creator

          $('#liststab1').click()
        })
      } else this.selInfo = []
    },
    showGroups: function () {
      axios.get(this.selInfo.groups._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selGroups = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showInitiatives: function () {
      axios.get(this.selInfo.initiatives._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selInitiatives = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showAD: function () {
      axios.get(this.selInfo.authority_documents._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selAD = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showComControls: function () {
      axios.get(this.selInfo.tracked_controls._href + '/details', {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selComControls = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getAdmin: function () {
      return this.results.users.filter(function (user) {
        return user.type === 'A'
      })
    },
    getMyAccount () {
      return {
        'account': {
          'time_created': '2020-03-05T12:22:30+0000',
          'time_updated': '2020-03-05T13:07:53+0000',
          'id': 16904,
          'date_created': '2020-03-05',
          'date_updated': '2020-03-05',
          'users': {
            '_href': 'https://api.unifiedcompliance.com/cch-account/16904/users'
          },
          'groups': {
            '_href': 'https://api.unifiedcompliance.com/cch-account/16904/groups'
          },
          'initiatives': {
            '_href': 'https://api.unifiedcompliance.com/cch-account/16904/initiatives'
          },
          'roles': {
            '_href': 'https://api.unifiedcompliance.com/cch-account/16904/roles'
          },
          'organization_name': 'UCF API2.0',
          'unspsc_code': null,
          'country': null,
          'address1': null,
          'address2': null,
          'city': null,
          'state': null,
          'postal_code': null,
          'logo': null,
          'allowed_builds': 5,
          'allowed_tokens': null,
          'mapper_training_seats': null,
          'select_ads': 5,
          'hide_organization_name': 'n',
          'status': 'po-pending',
          'domain': 'api2',
          'show_implementation': true,
          'reseller': null,
          'reseller_status': null,
          '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
        },
        'roles': [
          {
            'id': 5570,
            'name': 'Technical Support Specialist',
            'time_created': '2020-03-05T13:37:24+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-05T13:37:24+0000',
            'date_updated': '2020-03-05',
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'role': {
              'id': 602
            },
            'user': {
              'id': 19988,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-role/5570',
            'check_digit': 2
          }
        ],
        'initiatives': [
          {
            'id': 448,
            'name': 'PCI Audit',
            'description': 'This is the PCI Audit initiative. This initiative will end once the PCI audit has been completed.',
            'start_date': '2020-03-06',
            'end_date': '2020-09-30',
            'unspsc_code': '',
            'country': '',
            'postal_code': '',
            'map_coordinates': '',
            'map_points': '',
            'map_zoom': 0,
            'active_status': 'A',
            'time_created': '2020-03-06T10:27:41+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T10:35:32+0000',
            'date_updated': '2020-03-06',
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-initiative/448/groups'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-initiative/448/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-initiative/448/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-initiative/448',
            'check_digit': 3
          }
        ],
        'groups': [
          {
            'id': 499,
            'name': 'Phoenix Team',
            'description': 'Tech Team in Phoenix',
            'unspsc_code': '43210000',
            'country': 'US',
            'postal_code': '85028',
            'map_coordinates': '33.5725815, -112.0118669',
            'map_points': '',
            'map_zoom': 12,
            'active_status': 'A',
            'time_created': '2020-03-05T13:39:36+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-05T13:39:36+0000',
            'date_updated': '2020-03-05',
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/499/initiatives'
            },
            'children': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/499/children'
            },
            'parents': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/499/parents'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/499/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/499/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19988,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-group/499',
            'check_digit': 4
          },
          {
            'id': 500,
            'name': 'Vegas Team',
            'description': 'These are the folks living in the Las Vegas area.',
            'unspsc_code': 'undefined',
            'country': '',
            'postal_code': '89145',
            'map_coordinates': '',
            'map_points': '',
            'map_zoom': 0,
            'active_status': 'A',
            'time_created': '2020-03-06T10:32:20+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T10:32:20+0000',
            'date_updated': '2020-03-06',
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/500/initiatives'
            },
            'children': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/500/children'
            },
            'parents': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/500/parents'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/500/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/500/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-group/500',
            'check_digit': 7
          },
          {
            'id': 501,
            'name': 'Developers',
            'description': "This is all developers, regardless of where they live, as well as each of the teams we've built.",
            'unspsc_code': '43230000',
            'country': '',
            'postal_code': '',
            'map_coordinates': '',
            'map_points': '',
            'map_zoom': 0,
            'active_status': 'A',
            'time_created': '2020-03-06T10:34:25+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T10:34:57+0000',
            'date_updated': '2020-03-06',
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/501/initiatives'
            },
            'children': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/501/children'
            },
            'parents': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/501/parents'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/501/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/501/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-group/501',
            'check_digit': 1
          },
          {
            'id': 508,
            'name': 'subgroup',
            'description': 'subgroup',
            'unspsc_code': '12140000',
            'country': 'US',
            'postal_code': '85340',
            'map_coordinates': '33.5099073, -112.3456985',
            'map_points': '',
            'map_zoom': 12,
            'active_status': 'A',
            'time_created': '2020-03-30T15:31:30+0000',
            'date_created': '2020-03-30',
            'time_updated': '2020-03-30T15:31:30+0000',
            'date_updated': '2020-03-30',
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/508/initiatives'
            },
            'children': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/508/children'
            },
            'parents': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/508/parents'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/508/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/508/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-group/508',
            'check_digit': 2
          },
          {
            'id': 509,
            'name': 'parentgroup',
            'description': 'parentgroup',
            'unspsc_code': '12160000',
            'country': 'US',
            'postal_code': '85340',
            'map_coordinates': '33.5099073, -112.3456985',
            'map_points': '',
            'map_zoom': 12,
            'active_status': 'A',
            'time_created': '2020-03-30T15:32:09+0000',
            'date_created': '2020-03-30',
            'time_updated': '2020-03-30T15:32:09+0000',
            'date_updated': '2020-03-30',
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/509/initiatives'
            },
            'children': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/509/children'
            },
            'parents': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/509/parents'
            },
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/509/users'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-group/509/ad-lists'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-group/509',
            'check_digit': 5
          }
        ],
        'users': [
          {
            'id': 19988,
            'hubspot_id': '25767',
            'first_name': 'Sean',
            'last_name': 'Kohler',
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'skohler-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '',
            'profile_picture': '',
            'type': 'U',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': '2020-03-06 18:07:06',
            'time_created': '2020-03-05T12:22:30+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-06T10:11:24+0000',
            'date_updated': '2020-03-06',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': null,
            '_href': 'https://api.unifiedcompliance.com/cch-user/19988',
            'check_digit': 0
          },
          {
            'id': 19989,
            'hubspot_id': '25909',
            'first_name': 'Michael',
            'last_name': 'Wedderburn',
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'mwedderburn-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '1 916-759-2361',
            'profile_picture': '',
            'type': 'U',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': null,
            'time_created': '2020-03-05T13:22:46+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-05T13:25:07+0000',
            'date_updated': '2020-03-05',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19989/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': {
              'id': 19988,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-user/19989',
            'check_digit': 8
          },
          {
            'id': 19990,
            'hubspot_id': '25587',
            'first_name': 'Dorian',
            'last_name': 'Cougias',
            'country': 'US',
            'address1': '10161 Park Run Drive',
            'address2': 'Suite 150',
            'city': 'Las Vegas',
            'state': 'NV',
            'postal_code': '89145',
            'email': 'dcougias-api2@unifiedcompliance.com',
            'job_title': 'Co-Founder',
            'phone': '+1 702-805-0662',
            'profile_picture': '',
            'type': 'A',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': '2020-03-30 22:03:32',
            'time_created': '2020-03-05T15:39:31+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-24T09:36:32+0000',
            'date_updated': '2020-03-24',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': {
              'id': 19988,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19988'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-user/19990',
            'check_digit': 8
          },
          {
            'id': 19996,
            'hubspot_id': '25489',
            'first_name': 'Steven',
            'last_name': 'Piliero',
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'spiliero-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '1 818-425-6129',
            'profile_picture': '',
            'type': 'U',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': null,
            'time_created': '2020-03-06T10:28:56+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T14:15:34+0000',
            'date_updated': '2020-03-06',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19996/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-user/19996',
            'check_digit': 5
          },
          {
            'id': 19997,
            'hubspot_id': '25249',
            'first_name': 'Lucian',
            'last_name': 'Hontau',
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'lhontau-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '1 555-555-5555',
            'profile_picture': '',
            'type': 'U',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': '2020-03-07 00:29:42',
            'time_created': '2020-03-06T10:29:53+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T16:29:21+0000',
            'date_updated': '2020-03-06',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19997/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-user/19997',
            'check_digit': 7
          },
          {
            'id': 19998,
            'hubspot_id': '25638',
            'first_name': 'Dave',
            'last_name': 'Dare',
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'ddare-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '1 626-456-2355',
            'profile_picture': '',
            'type': 'U',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': null,
            'time_created': '2020-03-06T10:30:22+0000',
            'date_created': '2020-03-06',
            'time_updated': '2020-03-06T13:59:19+0000',
            'date_updated': '2020-03-06',
            'reseller_access': false,
            'persona_id': '9',
            'ad_lists_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/ad-lists-created'
            },
            'ad_lists': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/ad-lists'
            },
            'initiatives_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/initiatives-created'
            },
            'groups_created': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/groups-created'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/initiatives'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-user/19998/groups'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            'invited_by': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-user/19998',
            'check_digit': 3
          }
        ],
        'ad_lists': [
          {
            'id': 17361,
            'name': 'Sox-PCI',
            'whitebox_share': 'n',
            'publish': 'y',
            'publish_status': 'n',
            'publish_ident': '4OEUf',
            'restricted': null,
            'active_status': 'A',
            'outofdate': '0',
            'time_created': '2020-03-30T15:17:05+0000',
            'date_created': '2020-03-30',
            'time_updated': '2020-03-30T15:17:05+0000',
            'date_updated': '2020-03-30',
            'users': {
              '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361/users'
            },
            'authority_documents': {
              '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361/authority-documents'
            },
            'groups': {
              '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361/groups'
            },
            'initiatives': {
              '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361/initiatives'
            },
            'tracked_controls': {
              '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361/tracked-controls'
            },
            'creator': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            'last_modified_by': {
              'id': 19990,
              '_href': 'https://api.unifiedcompliance.com/cch-user/19990'
            },
            'account': {
              'id': 16904,
              '_href': 'https://api.unifiedcompliance.com/cch-account/16904'
            },
            '_href': 'https://api.unifiedcompliance.com/cch-ad-list/17361',
            'check_digit': 1
          }
        ],
        'subscription_expires': '2021-03-05 21:07:50'
      }
    }
    /*
    return axios.get('http://localhost:8080/ucapi/my-account', {
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
  */

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';

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
    text-decoration: none;
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
  }
  .panel-heading>ul.nav-tabs>li>a { border: none;}

  .groupsinpt{
    padding: 0 0 0 5px !important;
    margin: 0 !important;
    height: 30px !important;
  }

  .groupslbl{
    margin: 0;
    padding: 8px 0;
  }

  .no-padding {
    padding: 0;
  }

  .panel-body {
    padding :0;
  }
  .panel, .panel-default {
    border: none;
    border-color: transparent;
    -webkit-box-shadow: transparent;
    box-shadow:  none;
    border-radius: 0;
  }
  .panel-default>.panel-heading {
    background-color: transparent;
    margin-bottom: 1px;
  }
  ul.nav-tabs>li {
    margin-right: 1px;
    background-color: #eee;
    border-radius: 4px 4px 0 0;
  }

  ul.nav-tabs>li:hover {
    background-color: #fff;
  }
  .nav-tabs {
    border-bottom: .1em solid #737373;
  }

  #grpTbl td {
    cursor: pointer;
  }
  #grpTbl tr:hover {
    color: #737373;
  }
  .tab-content > .active {
    opacity: 1;
  }
  .just-padding {
    padding: 15px;
  }

  .list-group.list-group-root {
    padding: 0;
    overflow: hidden;
  }

  .list-group.list-group-root .list-group {
    margin-bottom: 0;
  }

  .list-group.list-group-root .list-group-item {
    border-radius: 0;
    border-width: 1px 0 0 0;
  }

  .list-group.list-group-root > .list-group-item:first-child {
    border-top-width: 0;
  }

  .list-group.list-group-root > .list-group > .list-group-item {
    padding-left: 30px;
  }

  .list-group.list-group-root > .list-group > .list-group > .list-group-item {
    padding-left: 45px;
  }

  .list-group-item .glyphicon {
    margin-right: 5px;
  }
</style>

<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="Groups"></ucsubheader>
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
          <div class="col-md-4">
            <div class=“table-responsive”>
              <table class="table table-bordered table-striped table-characters" id="grpTbl">
                <thead>
                <tr>

                  <th>Name</th>

                  <th>Status</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="group in results.groups">
                  <td @click="setGroupInfo(group.id)">{{group.name}}</td>
                  <td>{{group.active_status}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-8">
            <div class="panel with-nav-tabs panel-default">
              <div class="panel-heading">
                <ul class="nav nav-tabs">
                  <li class="dropdown">
                    <a href="#tab1default" data-toggle="tab" id="grouptab1">Group Info</a></li>
                  <li><a href="#tab2default" data-toggle="tab" @click="showSubGroups()">Sub Groups</a></li>
                  <li><a href="#tab3default" data-toggle="tab" @click="showGroupUsers()">Users</a></li>
                  <li><a href="#tab4default" data-toggle="tab" @click="showGroupLists()">AD Lists</a></li>
                </ul>
              </div>
              <div class="panel-body">
                <div class="tab-content">
                  <div class="tab-pane fade in active" id="tab1default">
                    <div class="box margin-top-20"><span class="box-title">Group Basics</span>
                      <div class="row">
              <div class="col-sm-8 no-padding">
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selGroupInfo.name" disabled="">
                  </div>
              </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label>ID</label>
                    <input type="text" class="form-control contactinfoinpt" placeholder="" :value="selGroupInfo.id" disabled="">
                  </div>
                </div>
                      </div>
                        <div class="row">
                          <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control contactinfoinpt" placeholder="" :value="selGroupInfo.description" disabled=""></textarea>
                          </div>
                        </div>
                      <div class="row" v-if="selGroupInfo.map_coordinates">
                        <iframe
                          width="100%"
                          height="450"
                          frameborder="0" style="border:0"
                          :src=showMapUrl() allowfullscreen>
                        </iframe>
                        <div class="text-center row"><span><em>*in order to display maps in your site you will need to create your own api key in <a href="https://developers.google.com/maps/documentation/embed/get-api-key" target="_blank">Google</a>*</em></span></div>
                      </div>
                      <div class="row" v-if="!selGroupInfo.map_coordinates"><span>No map data found</span></div>

                  </div>
                  </div>
                  <div class="tab-pane fade" id="tab2default">
                    <div v-if="selSubGroups.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                          <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="subgroup in selSubGroups">
                          <td>{{subgroup.id}}</td>
                          <td>{{subgroup.name}}</td>
                          <td>{{subgroup.description}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selSubGroups.length == 0" class="table-responsive margin-top-10">
                      <span>No subgroups found</span>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab3default">
                    <div v-if="selGroupUsers.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>First Name</th>

                          <th>Last Name</th>

                          <th>E-Mail</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in selGroupUsers">
                          <td>{{user.id}}</td>
                          <td>{{user.first_name}}</td>
                          <td>{{user.last_name}}</td>
                          <td>{{user.email}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selGroupUsers.length == 0" class="table-responsive margin-top-10">
                      <span>No Users found</span>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tab4default">
                    <div v-if="selGroupLists.length > 0" class=“table-responsive”>
                      <table class="table table-bordered table-striped table-characters">
                        <thead>
                        <tr>

                          <th>ID</th>

                          <th>Name</th>

                          <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="adlist in selGroupLists">
                          <td>{{adlist.id}}</td>
                          <td>{{adlist.name}}</td>
                          <td>{{adlist.description}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="selGroupLists.length == 0" class="table-responsive margin-top-10">
                      <span>No Lists found</span>
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
export default {
  name: 'groups',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader
  },
  props: ['ucconfig', 'submenu'],
  data () {
    return {
      results: [],
      admin: [],
      selGroupInfo: [],
      selSubGroups: [],
      selGroupUsers: [],
      selGroupLists: []

    }
  },
  mounted () {

  },
  created () {
    /*
      let _self = this

      this.getSubscriptionExpiration().then ( (results) => {
        _self.results = results
        console.log(_self.results)
      })
      */
    if (this.results = this.getMyAccount()) {
      this.admin = this.getAdmin()
      this.setGroupInfo(this.results.groups[0].id)
    }
  },
  methods: {
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    showMapUrl: function () {
      return 'https://www.google.com/maps/embed/v1/place?q=' + this.selGroupInfo.map_coordinates + '&zoom=' + this.selGroupInfo.map_zoom + '&key=' + this.ucconfig.gApiKey
    },
    setGroupInfo: function (gid) {
      let group = this.results.groups.filter(function (grp) {
        return grp.id === gid
      })

      this.selGroupInfo = group.length > 0 ? group[0] : []
      $('#grouptab1').click()
      // this.showSubGroups()
      // this.showGrpUsers()
      // this.showGrpList()
    },
    showSubGroups: function () {
      axios.get(this.selGroupInfo.children._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selSubGroups = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showGroupUsers: function () {
      axios.get(this.selGroupInfo.users._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selGroupUsers = response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showGroupLists: function () {
      axios.get(this.selGroupInfo.ad_lists._href, {
        crossdomain: true,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${this.ucconfig.apiKey}`
        }
      }
      ).then(
        (response) => {
          this.selGroupLists = response.data
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
</style>

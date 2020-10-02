<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="Users"></ucsubheader>
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

                <th>First Name</th>

                <th>Last Name</th>

                <th>E-Mail</th>

                <th>Phone</th>

                <th>Status</th>

                <th>Active</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users">
                <td>{{user.id}}</td>
                <td>{{user.first_name}}</td>
                <td>{{user.last_name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.type}}</td>
                <td>{{user.active_status}}</td>
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
  name: 'users',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader
  },
  props: ['ucconfig', 'submenu'],
  data () {
    return {
      results: [],
      users: []
    }
  },
  mounted () {},
  created () {
    /*
      let _self = this

      this.getUsers().then ( (results) => {
        _self.results = results
        console.log(_self.results)
      })
      */
    if (this.results = this.getMyAccount()) {
      this.users = this.getUsers()
    }
  },
  methods: {
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    getUsers: function () {
      return this.results.users
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
            'country': '',
            'address1': '',
            'address2': '',
            'city': '',
            'state': '',
            'postal_code': '',
            'email': 'dcougias-api2@unifiedcompliance.com',
            'job_title': '',
            'phone': '',
            'profile_picture': '',
            'type': 'A',
            'status': 1,
            'agreement': '1',
            'active_status': 'A',
            'last_login': null,
            'time_created': '2020-03-05T15:39:31+0000',
            'date_created': '2020-03-05',
            'time_updated': '2020-03-06T10:11:24+0000',
            'date_updated': '2020-03-06',
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
        'ad_lists': [],
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

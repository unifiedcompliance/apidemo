<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="ADRequests"></ucsubheader>
      <!--end section based sub-headers-->
      <div class="container container-top-level page-content">
        <div class="col-lg-12 margin-top-10">
          <div class="panel with-nav-tabs panel-default">
            <div class="panel-heading">
              <ul class="nav nav-tabs">
                <li><a href="#tab6default" data-toggle="tab">Create</a></li>
                <li><a href="#tab7default" data-toggle="tab" @click="showADReqStatus()">List</a></li>
                <li><a href="#tab8default" data-toggle="tab">Patch Team</a></li>
                <li><a href="#tab9default" data-toggle="tab" @click="showADReqTeamStatus()">Teams</a></li>
                <li><a href="#tab10default" data-toggle="tab" @click="showADReqProjectStatus()">Projects</a></li>
                <li><a href="#tab11default" data-toggle="tab" @click="showADReqTaskStatus()">Tasks</a></li>
                <li><a href="#tab12default" data-toggle="tab" @click="showADReviewer()">Reviewer</a></li>
                <li><a href="#tab13default" data-toggle="tab" @click="showADApprover()">Approver</a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div class="tab-content">
                <div class="tab-pane fade in active" id="tab6default">
                    <div class="row">
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Impersonate User</label>
                          <select class="form-control form-control-sm" v-model="adRequest.person_id">
                            <option :value="null">None</option>
                            <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                      <div class="row">
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Name</label>
                          <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.name">
                        </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label>Url</label>
                          <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.url">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Availability</label>
                          <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.availability">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label>Organization ID</label>
                          <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.organization_id">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label>Team ID</label>
                          <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.team_id">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Select Mapper</label>
                          <select class="form-control form-control-sm" v-model="members.mapper.person_id">
                            <option :value="null">None</option>
                            <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Select Reviewer</label>
                          <select class="form-control form-control-sm" v-model="members.reviewer.person_id">
                            <option :value="null">None</option>
                            <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <label>Select Approver</label>
                          <select class="form-control form-control-sm" v-model="members.approver.person_id">
                            <option :value="null">None</option>
                            <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Mapper Organization</label>
                        <select class="form-control form-control-sm" v-model="members.mapper.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Reviewer Organization</label>
                        <select class="form-control form-control-sm" v-model="members.reviewer.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Approver Organization</label>
                        <select class="form-control form-control-sm" v-model="members.approver.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                  </div>
                    <div class="row">
                      <div class="col-sm-4 no-padding">
                        <div class="form-group">
                          <button class="clickable btn button text-center" @click="createADRequest()">Submit</button>
                        </div>
                      </div>
                    </div>
                  <div class="row" v-if="adReqError">
                    <div class="col-sm-8 no-padding">
                    {{adReqError}}
                    </div>
                  </div>
                  <div class="row" v-if="adRequests.length > 0">
                    <div class="col-sm-12 no-padding">
                      <div class=“table-responsive”>
                        <table class="table table-bordered table-striped table-characters">
                          <thead>
                          <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Team ID</th>

                            <th>Task ID</th>

                            <th>Project ID</th>

                            <th>Status</th>

                            <th>Status Text</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="adRequest in adRequests">
                            <td>{{adRequest.request_id}}</td>
                            <td>{{adRequest.name}}</td>
                            <td>{{adRequest.team_id}}</td>
                            <td>{{adRequest.task_id}}</td>
                            <td>{{adRequest.project_id}}</td>
                            <td>{{adRequest.status}}</td>
                            <td>{{adRequest.status_text}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab7default">
                  <div class="row">
                    <div class="col-sm-2">&nbsp;<input type="radio" name="reqSearch" @change="showADReqStatus()" v-model="reqSearch" :value="0" checked>&nbsp;All</div>
                    <div class="col-sm-3">&nbsp;<input type="radio" name="reqSearch" @change="filterReq(1)" v-model="reqSearch" :value="1">&nbsp;Not Assigned</div>
                    <div class="col-sm-3">&nbsp;<input type="radio" name="reqSearch" @change="filterReq(2)" v-model="reqSearch" :value="2">&nbsp;In Review</div>
                    <div class="col-sm-3">&nbsp;<input type="radio" name="reqSearch" @change="filterReq(3)" v-model="reqSearch" :value="3">&nbsp;Accepted</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 no-padding">
                      <div class=“table-responsive”>
                        <table class="table table-bordered table-striped table-characters">
                          <thead>
                          <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Url</th>

                            <th>Availability</th>

                            <th>Status</th>

                            <th>Team ID</th>

                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="adList in adLists">
                            <td>{{adList.id}}</td>
                            <td>{{adList.name}}</td>
                            <td>{{adList.url}}</td>
                            <td>{{adList.availability}}</td>
                            <td>{{adList.status_text}}</td>
                            <td>{{adList.team_id}}</td>

                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab8default">
                  <div class="row">
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Impersonate User</label>
                        <select class="form-control form-control-sm" v-model="person_id">
                          <option :value="null">None</option>
                          <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Team ID</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="adRequest.team_id">
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>AD Request ID</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="ad_request_id">
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Team Name</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" v-model="team_name">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Mapper</label>
                        <select class="form-control form-control-sm" v-model="members.mapper.person_id">
                          <option :value="null">None</option>
                          <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Reviewer</label>
                        <select class="form-control form-control-sm" v-model="members.reviewer.person_id">
                          <option :value="null">None</option>
                          <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Approver</label>
                        <select class="form-control form-control-sm" v-model="members.approver.person_id">
                          <option :value="null">None</option>
                          <option v-for="person of personsData" :value="person.id" :key="person.id">{{person.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Mapper Organization</label>
                        <select class="form-control form-control-sm" v-model="members.mapper.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Reviewer Organization</label>
                        <select class="form-control form-control-sm" v-model="members.reviewer.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <label>Select Approver Organization</label>
                        <select class="form-control form-control-sm" v-model="members.approver.organization_id">
                          <option :value="null">None</option>
                          <option :value="4144">Unified Compliance Framework</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 no-padding">
                      <div class="form-group">
                        <button class="clickable btn button text-center" @click="patchTeam()">Submit</button>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="adPatchError">
                    <div class="col-sm-8 no-padding">
                    {{adPatchError}}
                    </div>
                  </div>
                  <div class="row" v-if="adPatchTeam.length > 0">
                    <div class="col-sm-12 no-padding">
                      <div class=“table-responsive”>
                        <table class="table table-bordered table-striped table-characters">
                          <thead>
                          <tr>

                            <th>Team ID</th>

                            <th>AD Request ID</th>

                            <th>Status</th>

                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="adPatch in adPatchTeam">
                            <td>{{adPatch.id}}</td>
                            <td>{{adPatch.ad_request_id}}</td>
                            <td>{{adPatch.status}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab9default">
                    <div class="row" v-if="adTeams.length > 0">
                      <div class="col-sm-12 no-padding">
                        <div class=“table-responsive”>
                          <table class="table table-bordered table-striped table-characters">
                            <thead>
                            <tr>

                              <th>ID</th>

                              <th>Name</th>

                              <th>Mapper</th>

                              <th>Reviewer</th>

                              <th>Approver</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(adTeam,idx) in adTeams">
                              <td>{{adTeam.id}}</td>
                              <td><span v-if="teamEdit !== idx"
                                        @click="toggleEdit(idx, $event)">{{adTeam.name}}</span>

                                <input type="text"
                                       class="w-full"
                                       v-model="adTeams[idx].name"
                                       v-if="teamEdit === idx"
                                       @blur="saveEdit(idx,$event)"></td>
                              <td><span v-if="adTeam.Members && adTeam.Members['@set'][0]">{{adTeam.Members['@set'][0].person_name}}<br />{{adTeam.Members['@set'][0].organization_name}}</span></td>
                              <td><span v-if="adTeam.Members && adTeam.Members['@set'][1]">{{adTeam.Members['@set'][1].person_name}}<br />{{adTeam.Members['@set'][1].organization_name}}</span></td>
                              <td><span v-if="adTeam.Members && adTeam.Members['@set'][2]">{{adTeam.Members['@set'][2].person_name}}<br />{{adTeam.Members['@set'][2].organization_name}}</span></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab10default">
                    <div class="row">
                      <div class="col-sm-12 no-padding">
                        <div class=“table-responsive”>
                          <table class="table table-bordered table-striped table-characters">
                            <thead>
                            <tr>

                              <th>ID</th>

                              <th>Name</th>

                              <th>Team ID</th>

                              <th>Team Name</th>

                              <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(adProject,idx) in adProjects">
                              <td>{{adProject.id}}</td>
                              <td>{{adProject.name}}</td>
                              <td>

                                <span v-if="teamIdEdit.project_idx !== idx"
                                      @click="toggleEditTeamId(idx, $event)">{{adProject.team_id}}</span>

                                <input type="text"
                                       class="w-full"
                                       v-model="adProjects[idx].team_id"
                                       v-if="teamIdEdit.project_idx === idx"
                                       @blur="saveEditTeamId(idx,$event)">

                              </td>
                              <td>{{adProject.team_name}}</td>
                              <td>{{adProject.status_text}}</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="row" v-if="adProjectError">
                          <div class="col-sm-8 no-padding">
                            {{adProjectError}}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab11default">
                    <div class="row">
                      <div class="col-sm-12 no-padding">
                        <div class=“table-responsive”>
                          <table class="table table-bordered table-striped table-characters">
                            <thead>
                            <tr>

                              <th>ID</th>

                              <th>Name</th>

                              <th>Project ID</th>

                              <th>Project Name</th>

                              <th>Team ID</th>

                              <th>Team Name</th>

                              <th>AD Req ID</th>

                              <th>AD Req Name</th>

                              <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="adTask in adTasks">
                              <td>{{adTask.id}}</td>
                              <td>{{adTask.name}}</td>
                              <td>{{adTask.project_id}}</td>
                              <td>{{adTask.project_name}}</td>
                              <td>{{adTask.team_id}}</td>
                              <td>{{adTask.team_name}}</td>
                              <td>{{adTask.ad_request_id}}</td>
                              <td>{{adTask.ad_request_name}}</td>
                              <td>{{adTask.status_text}}</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab12default">
                  <div class="row">
                    <div class="col-sm-12 no-padding">
                      <div class=“table-responsive”>
                        <table class="table table-bordered table-striped table-characters">
                          <thead>
                          <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Url</th>

                            <th>Availability</th>

                            <th>Status</th>

                            <th>Actions</th>

                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="adr in adReviewer">
                            <td>{{adr.id}}</td>
                            <td>{{adr.name}}</td>
                            <td>{{adr.url}}</td>
                            <td>{{adr.availability}}</td>
                            <td>{{adr.status_text}}</td>
                            <td><span class="fa fa-check-circle clickable" @click="reviewerApprove(adr,7)">&nbsp;Approve</span> &nbsp;<span class="fa fa-close clickable" @click="reviewerDeny(adr,6)">&nbsp;Deny</span></td>

                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab13default">
                  <div class="row">
                    <div class="col-sm-12 no-padding">
                      <div class=“table-responsive”>
                        <table class="table table-bordered table-striped table-characters">
                          <thead>
                          <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Url</th>

                            <th>Availability</th>

                            <th>Status</th>

                            <th>Actions</th>

                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="adp in adApprover">
                            <td>{{adp.id}}</td>
                            <td>{{adp.name}}</td>
                            <td>{{adp.url}}</td>
                            <td>{{adp.availability}}</td>
                            <td>{{adp.status_text}}</td>
                            <td><span class="fa fa-check-circle clickable" @click="approverApprove(adp,3)">&nbsp;Approve</span> &nbsp;<span class="fa fa-close clickable" @click="approverDeny(adp,4)">&nbsp;Deny</span></td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <modal v-if="showAdInfoModal" @close="showAdInfoModal = false">
          <div class="panel-body" v-if="adInfo" slot="body">
            <popcontent :adDetails="adInfo"></popcontent>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
import ucsubheader from '@/components/ucsubheader'
import popcontent from '@/components/popcontent'
import modal from '@/components/modal'

export default {
  name: 'adrequests',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader,
    modal,
    popcontent
  },
  props: ['ucconfig'],
  data () {
    return {
      showAdInfoModal: false,
      adReqError: null,
      adPatchError: null,
      adProjectError: null,
      reqSearch: 0,
      personsData: [],
      adRequests: [],
      adReqResults: [],
      adTeams: [],
      adLists: [],
      adReviewer: [],
      adApprover: [],
      adListbck: [],
      adProjects: [],
      adTasks: [],
      teamEdit: false,
      teamIdEdit: {project_idx: null, project_id: null, team_id: null},
      person_id: null,
      ad_request_id: null,
      team_name: null,
      members: {
        mapper: {
          person_id: null,
          role_id: 4,
          organization_id: null
        },
        reviewer: {
          person_id: null,
          role_id: 5,
          organization_id: null
        },
        approver: {
          person_id: null,
          role_id: 6,
          organization_id: null
        }
      },
      adInfo: [],
      adReqModal: [],
      adPatchTeam: [],
      adRequest: {
        person_id: null,
        name: null,
        url: null,
        availability: null,
        organization_id: null,
        team_id: null,
        members: null
      },
      selInfo: [],
      submenu: [{name: 'AD Lists', url: 'AdLists'}, {name: 'Authority Documents', url: 'AuthDocs'}, {name: 'AD Requests', url: 'ADRequests'}, {name: 'AD Hierarchy', url: 'ADHierarchy'}, {name: 'Subject Matters', url: 'SubjectMatters'}]
    }
  },
  mounted () {},
  created () {
    this.init()
  },
  methods: {
    init: function () {
      this.personsData = this.getPersons()
    },
    toggleEdit: function (idx, e) {
      this.teamEdit = idx
      e.target.focus()
    },
    toggleEditTeamId: function (idx, e) {
      this.teamIdEdit.team_id = e.target.value
      this.teamIdEdit.project_idx = idx
      this.teamIdEdit.project_id = this.adProjects[idx].id
      e.target.focus()
    },
    filterReq: function (status) {
      switch (status) {
        case 1:
        case 2:
        case 3:
          if (this.adListbck.length === 0) {
            this.adListbck = this.adLists
          } else { this.adLists = this.adListbck }
          this.adLists = this.adLists.filter((n) => n.status === status)
          break
        default:
          this.showADReqList()
      }
    },
    saveEdit: async function (idx, e) {
      let team = await this.getTeam(idx)
      if (team) {
        let personId = (team.Members['@set'][0].person_id) ? team.Members['@set'][0].person_id : null
        let response = this.updateTeam(idx, personId)
        if (response) {
          this.teamEdit = false
          e.target.blur()
        }
      }
    },
    cancelEditTeamId: function () {
      this.teamIdEdit = {project_idx: null, project_id: null, team_id: null}
    },
    saveEditTeamId: async function (idx, e) {
      let team = await this.getTeamData(e.target.value)
      if (team) {
        let personId = (team.Members['@set'][0].person_id) ? team.Members['@set'][0].person_id : null
        let response = this.updateProject(this.adProjects[idx].id, e.target.value, personId)
        if (response) {
          this.cancelEditTeamId()
          e.target.blur()
        }
      } else {
        e.target.value = this.teamIdEdit.team_id
        this.cancelEditTeamId()
        e.target.blur()
      }
      this.showADReqProjectStatus()
    },
    reviewerApprove: async function (adr, status) {
      if (window.confirm('Do you want to approve this request?')) {
        await this.updateAdReq(adr.id, {status: status})
        await this.updateAdTasks(adr.task_id, {status: 2})
        this.showADReviewer()
      }
    },
    reviewerDeny: async function (adr, status) {
      if (window.confirm('Do you want to deny this request?')) {
        await this.updateAdReq(adr.id, {status: status})
        await this.updateAdTasks(adr.task_id, {status: 2})
        this.showADReviewer()
      }
    },
    approverApprove: async function (adr, status) {
      if (window.confirm('Do you want to approve this request?')) {
        await this.updateAdReq(adr.id, {status: status})
        await this.updateAdTasks(adr.task_id, {status: 3})
        await this.updateAdProject(adr.project_id, {status: 3})
        this.showADApprover()
      }
    },
    approverDeny: async function (adr, status) {
      if (window.confirm('Do you want to deny this request?')) {
        await this.updateAdReq(adr.id, {status: status})
        await this.updateAdTasks(adr.task_id, {status: 4})
        await this.updateAdProject(adr.project_id, {status: 4})
        this.showADApprover()
      }
    },
    updateProject: function (projectId, teamId, personId) {
      return new Promise((resolve, reject) => {
        axios.post(this.ucconfig.adprojectUrl + '/' + projectId,
          {team_id: teamId, person_id: personId}, {
            crossdomain: true,
            withCredentials: false
          }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            this.adProjectError = err.response.data
            this.cancelEditTeamId()
            reject(err)
            console.log(err)
          }
        )
      })
    },
    updateTeam: function (idx, personId) {
      return new Promise((resolve, reject) => {
        axios.post(this.ucconfig.adteamUrl + '/' + this.adTeams[idx].id,
          {id: this.adTeams[idx].id, name: this.adTeams[idx].name, person_id: personId}, {
            crossdomain: true,
            withCredentials: false
          }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            this.adProjectError = err.response.data
            this.cancelEditTeamId()
            reject(err)
            console.log(err)
          }
        )
      })
    },
    updateAdReq: function (id, data) {
      return new Promise((resolve, reject) => {
        axios.post(this.ucconfig.adreqlistUrl + '/' + id, data, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    },
    updateAdTasks: function (id, data) {
      return new Promise((resolve, reject) => {
        axios.post(this.ucconfig.adtaskUrl + '/' + id, data, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    },
    updateAdProject: function (id, data) {
      return new Promise((resolve, reject) => {
        axios.post(this.ucconfig.adprojectUrl + '/' + id, data, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    },
    getTeam: function (idx) {
      return new Promise((resolve, reject) => {
        axios.get(this.ucconfig.adteamUrl + '/' + this.adTeams[idx].id, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    },
    getTeamData: function (id) {
      return new Promise((resolve, reject) => {
        axios.get(this.ucconfig.adteamUrl + '/' + id, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            this.adProjectError = err.response.data
            this.cancelEditTeamId()
            this.showADReqProjectStatus()
            console.log(err)
          }
        )
      })
    },
    patchTeam: function () {
      if (this.members.mapper.person_id || this.members.reviewer.person_id || this.members.approver.person_id) {
        this.adRequest.members = []
        for (let [name, member] of Object.entries(this.members)) {
          if (member.person_id) {
            this.adRequest.members.push(member)
          }
        }
      } else {
        this.adRequest.members = null
      }

      return axios.post(this.ucconfig.adteamUrl + '/' + this.adRequest.team_id, {person_id: this.person_id, name: this.team_name, ad_request_id: this.ad_request_id, members: this.adRequest.members}, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adPatchTeam.push({id: this.adRequest.team_id, ad_request_id: this.ad_request_id, status: 'Patched'})
          return response.data
        }
      ).catch(
        err => {
          this.adPatchError = err.response.data
          if (this.adRequest.team_id && this.ad_request_id) this.adPatchTeam.push({id: this.adRequest.team_id, ad_request_id: this.ad_request_id, status: 'Not Patched'})
          console.log(err)
        }
      )
    },
    showAdInfo: async function (id) {
      this.adInfo = await this.getAD(id)
      if (this.adInfo) {
        this.showAdInfoModal = true
      }
    },
    getAD: function (id) {
      return new Promise((resolve, reject) => {
        axios.get(this.ucconfig.authorityDocumentUrl + '/' + id, {
          crossdomain: true,
          withCredentials: false
        }
        ).then(
          (response) => {
            resolve(response.data)
          }
        ).catch(
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    },
    createADRequest: function () {
      this.adReqError = null
      if (this.members.mapper.person_id || this.members.reviewer.person_id || this.members.approver.person_id) {
        this.adRequest.members = []
        for (let [name, member] of Object.entries(this.members)) {
          if (member.person_id) {
            this.adRequest.members.push(member)
          }
        }
      } else {
        this.adRequest.members = null
      }

      return axios.post(this.ucconfig.adreqcreateUrl, this.adRequest, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        async (response) => {
          this.adRequests.push(response.data)
          return response
        }
      ).catch(
        err => {
          this.adReqError = err.response.data
          if (this.adReqError.path.indexOf('AuthorityDocument') !== -1) {
            let parsed = this.adReqError.path.split('/')
            if (parsed.length > 0) {
              let adId = parsed[2]
              if (adId) this.showAdInfo(adId)
            }
          }
          console.log(err)
        }
      )
    },
    getADReqList: function (id) {
      return axios.get(this.ucconfig.adreqlistUrl + '/' + id, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adReqModal = response.data
          this.showADListModal = true
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showADReqStatus: function () {
      return axios.get(this.ucconfig.adreqStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.reqSearch = 0
          this.adLists = response.data
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showADReviewer: function () {
      return axios.get(this.ucconfig.adreqStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adReviewer = response.data.filter((n) => n.status === 2)
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showADApprover: function () {
      return axios.get(this.ucconfig.adreqStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adApprover = response.data.filter((n) => n.status === 6 || n.status === 7)
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    addMembers: function (data) {
      return new Promise(async (resolve) => {
        for (let i = 0; i < data.length; i++) {
          let tmp = await this.getTeamData(data[i].id)
          data[i].members = tmp.Members['@set']
        }

        resolve(data)
      })
    },
    showADReqTeamStatus: function () {
      return axios.get(this.ucconfig.adteamStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        async (response) => {
          this.adTeams = response.data

          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showADReqProjectStatus: function () {
      return axios.get(this.ucconfig.adprojectStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adProjects = response.data
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showADReqTaskStatus: function () {
      return axios.get(this.ucconfig.adtaskStatusUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.adTasks = response.data
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getPersons: function () {
      return axios.get(this.ucconfig.personsUrl, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          this.personsData = response.data
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    changePage: function (page) {
      this.$emit('changePage', page)
    }
  },
  computed: {

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
.panel {
  border: none;
}

.panel-heading {
  padding: 0;
  border: none;
}

.panel-default>.panel-heading {
  border: none;
}

.tab-content > .active {
  opacity: 1;
}

.w-full {
  width: 100%;
}

.clickable {
  cursor: pointer;
}
.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1000px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

button {
  margin: 1px;
  padding: 2px;
}
</style>

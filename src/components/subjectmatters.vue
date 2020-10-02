<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="SubjectMatters"></ucsubheader>
      <!--end section based sub-headers-->
      <div class="container container-top-level page-content">
        <div class="col-lg-12 margin-top-10">
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-characters">
              <tbody>
              <tr>
                <td class="srchBx">
                  <input type="text" id="query" v-model="query" />
                </td>
                <td>
                  <button type="button" class="btn button" @click="displayADSearch()">Search</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="!adResultsParents || adResultsParents.length === 0">
           <treemenu :nodes="adTree.nodes" :depth=0 :showroot="true" :key="btKey" :ucconfig="ucconfig" :adSubjectMatters="adSubjectMatters" />
          </div>
          <div v-if="adResultsParents && adResultsParents.length > 0">
            <ul class="list-group" v-for="adResult in adResultsParents" :key="adResult.ad_id">
              <li class="list-group-item">
                {{ adResult.ad_name }}
                <modal v-if="showModal" @close="showModal = false">
                  <div class="panel-body" v-if="adResult" slot="body">
                    <popcontent :adDetails="adResult"></popcontent>
                  </div>
                </modal>
                <span class="fa fa-info-circle clickable" @click="showModal = true" v-if="adResult.category_name === 'AD'"></span>
              </li>
            </ul>
            <div class="doneBtn"><button class="clickable btn button text-center" @click="searchDone()">Done</button></div>
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
import treemenu from '@/components/smtreemenu'
import popcontent from '@/components/popcontent'
import modal from '@/components/modal'

export default {
  name: 'subjectmatters',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader,
    treemenu,
    popcontent,
    modal
  },
  props: ['ucconfig'],
  data () {
    return {
      showModal: false,
      results: [],
      subjectMatters: [],
      adParents: [],
      smParents: [],
      adChildren: [],
      adItems: [],
      adHierarchy: [],
      adSubjectMatters: [],
      adResultsParents: [],
      searchResponse: [],
      adResults: [],
      query: null,
      toggleElement: [],
      adTree: {nodes: []},
      btKey: 0,
      submenu: [{name: 'AD Lists', url: 'AdLists'}, {name: 'Authority Documents', url: 'AuthDocs'}, {name: 'AD Requests', url: 'ADRequests'}, {name: 'AD Hierarchy', url: 'ADHierarchy'}, {name: 'Subject Matters', url: 'SubjectMatters'}]
    }
  },
  mounted () {},
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getSubjectMatters().then((data) => {
        this.smParents = data
        this.getADHierarchy().then((data) => {
          this.adHierarchy = data
          this.getADSubjectMatters().then((ads) => {
            this.adSubjectMatters = ads
            this.updateADTree(this.smParents)
          }).catch(
            err => {
              console.log(err)
            }
          )
        }).catch(
          err => {
            console.log(err)
          }
        )
      }).catch(
        err => {
          console.log(err)
        }
      )
    },
    forceRerender () {
      this.btKey += 1
    },
    searchDone: function () {
      this.adResults = []
      this.query = null
    },
    changePage: function (page) {
      this.$emit('changePage', page)
    },
    getChildSubjectMatters: function (id) {
      return axios.post(this.ucconfig.subjectMattersUrl, {sm_id: id}, {
        crossdomain: true,
        withCredentials: false
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
    getSubjectMatters: function () {
      return axios.get(this.ucconfig.subjectMattersUrl, {
        crossdomain: true,
        withCredentials: false
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
    getADSubjectMatters: function () {
      return axios.get(this.ucconfig.adSubjectMattersUrl, {
        crossdomain: true,
        withCredentials: false
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
    getSearchParents: function (data) {
      return new Promise(resolve => {
        let tmp = []
        for (let n of data) {
          if (!tmp.find(o => o.ad_name === n[0].ad_name)) {
            tmp.push(n[0])
          }
        }

        for (let i of tmp) {
          i.nodes = []
          for (let s of this.searchResponse) {
            if (s[0].ad_id === i.ad_id) {
              if (!i.nodes.find(o => o.ad_name === s[1].ad_name)) {
                i.nodes.push(s[1])
              }
            }
          }
        }

        for (let j of tmp) {
          for (let i of j.nodes) {
            i.nodes = []
            for (let s of this.searchResponse) {
              if (s[1].ad_id === i.ad_id) {
                if (!i.nodes.find(o => o.ad_name === s[2].ad_name)) {
                  i.nodes.push(s[2])
                }
              }
            }
          }
        }

        for (let j of tmp) {
          for (let k of j.nodes) {
            for (let i of k.nodes) {
              i.nodes = []
              for (let s of this.searchResponse) {
                if (s[2].ad_id === i.ad_id) {
                  if (!i.nodes.find(o => o.ad_name === s[3].ad_name)) {
                    i.nodes.push(s[3])
                  }
                }
              }
            }
          }
        }

        for (let j of tmp) {
          for (let k of j.nodes) {
            for (let l of k.nodes) {
              if (l.nodes && l.nodes.length > 0) {
                for (let i of l.nodes) {
                  if (i) {
                    i.nodes = []
                    for (let s of this.searchResponse) {
                      if (s[3] && s[3].ad_id === i.ad_id) {
                        if (s[4]) {
                          if (!i.nodes.find(o => o.ad_name === s[4].ad_name)) {
                            i.nodes.push(s[4])
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        resolve(tmp)
      }).catch(
        err => {
          console.log(err)
        }
      )
    },
    displayADSearch: function () {
      if (!this.query) {
        this.init()
      } else {
        this.searchAD().then(async (data) => {
          // this.adTree.nodes = data
          // this.adResultsParents.nodes = []
          // this.adResultsParents = await this.getSearchParents(data)
          // this.adTree.nodes = await this.getSearchParents(data)
          this.adTree.nodes = data
        }).catch(
          err => {
            console.log(err)
          }
        )
      }
    },
    searchAD: function () {
      return axios.post(this.ucconfig.authorityDocumentUrl, {search: this.query}, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        async (response) => {
          // let tmp = await this.getADParent(response.data)
          /* let tmp = []
          for (let item of response.data) {
            tmp.push(await this.getADInfo(item.id))
          }
          return tmp */
          let tmp = await this.makeNodes(response.data)
          console.log(tmp)
          return tmp
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getADHierarchy: function () {
      return axios.get(this.ucconfig.adHierarchyUrl, {
        crossdomain: true,
        withCredentials: false
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
    getADInfo: function (id) {
      return axios.get(`${this.ucconfig.authorityDocumentUrl}/${id}`, {
        crossdomain: true,
        withCredentials: false
      }
      ).then(
        (response) => {
          if (response.data && response.data.length > 0) response.data._sm = this.getADS(id)
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getADS (id) {
      let sm = this.adSubjectMatters.filter((n) => n.ad_id === id)
      return (sm && sm.length > 0) ? sm[0].SubjectMattersStub['@set'] : null
    },
    getAD: function (id) {
      return axios.get(`${this.ucconfig.authorityDocumentUrl}/${id}`, {
        crossdomain: true,
        withCredentials: false
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
    getSMParents: function () {
      this.getSubjectMatters().then((data) => {
        this.smParents = data
      }).catch(
        err => {
          console.log(err)
        }
      )
    },
    makeNodes: function (data) {
      return new Promise(resolve => {
        let found = []
        for (let x of data) {
          let foundAD = this.adSubjectMatters.filter(n => n.ad_id === x.id)

          if (foundAD[0]) {
            let idx = found.findIndex(o => o.id === foundAD[0].SubjectMattersStub['@set'][0].sm_id)

            if (idx < 0) {
              let tmpMatch = {
                id: foundAD[0].SubjectMattersStub['@set'][0].sm_id,
                name: foundAD[0].SubjectMattersStub['@set'][0].sm_name,
                has_children: 1,
                nodes: [
                  {
                    id: foundAD[0].ad_id,
                    name: foundAD[0].ad_name,
                    category_id: foundAD[0].category_id
                  }]
              }
              found.push(tmpMatch)
            } else {
              found[idx].nodes.push({
                id: foundAD[0].ad_id,
                name: foundAD[0].ad_name,
                category_id: foundAD[0].category_id
              })
            }
          }
        }
        resolve(found)
      }).catch((e) => console.log(e))
    },
    getADParents: function (id, type) {
      let tmp = []
      switch (type) {
        case 'id':
          tmp = this.adHierarchy.filter((n) => { return n.ad_id === id })
          break
        case 'parent':
          tmp = this.adHierarchy.filter((n) => { return n.parent_id === id })
          break
        default:
          tmp = this.adParents = this.adHierarchy.filter((n) => {
            return n.parent_id === 0
          })
      }
      return tmp
    },
    getADParentsAsync: function (id, type) {
      console.log('id: ' + id)
      return new Promise((resolve) => {
        let tmp = []
        switch (type) {
          case 'id':
            tmp = this.adHierarchy.filter((n) => {
              return n.ad_id === id
            })
            delete tmp[0].nodes
            break
          case 'parent':
            tmp = this.adHierarchy.filter((n) => {
              return n.parent_id === id
            })
            delete tmp[0].nodes
            break
          default:
            tmp = this.adParents = this.adHierarchy.filter((n) => {
              return n.parent_id === 0
            })
        }
        resolve(tmp)
      }).catch((e) => console.log(e))
    },
    async getADParent (results) {
      let nodes = []
      if (results && results.length > 0) {
        for (let [idx, result] of results.entries()) {
          console.log('starting found')
          let found = []
          let gp = true
          let node = await this.getADParentsAsync(result.id, 'id')
          while (gp) {
            console.log('starting gp..')
            if (node.length === 0 || !node[0].parent_id || node[0].parent_id === 0) {
              if (node) found.push(node[0])
              console.log('in gp')
              gp = false
            } else {
              console.log('not in gp')
              found.push(node[0])
              node = await this.getADParentsAsync(node[0].parent_id, 'id')
              // found.push(node[0])
            }
            // console.log(node)
          }
          console.log('got nodes')
          console.log(found)
          // console.log(temp.reverse())
          nodes.push(found.reverse())
        }
      }
      this.searchResponse = nodes

      return nodes
    },
    removeDuplicates (array, key) {
      let lookup = new Set()

      return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
    },
    getADChildren: function (id) {
      let children = this.adSubjectMatters.filter((n) => {
        n.id = n.ad_id
        n.name = n.ad_name
        let allow = false
        let sm = n.SubjectMattersStub['@set']

        for (let i = 0; i < sm.length; i++) {
          if (sm[i].sm_id === id) {
            allow = true
            break
          }
        }
        return allow
      })
      if (children) {
        children.sort((a, b) => a.ad_name.localeCompare(b.ad_name))
        return children
      } else return null
    },
    updateADTree: function (data) {
      let nodes = []
      for (let node of data) {
        let found = this.getADChildren(node.id)
        if (found && found.length > 0) {
          found.sort((a, b) => a.ad_name.localeCompare(b.ad_name))
          node.nodes = found
          node.has_children = nodes.length
        } else {
          node.has_children = 0
        }
        nodes.push(node)
      }

      this.adTree.nodes = nodes
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

  .no-padding {
    padding: 0px;
  }
tbody > td {
  word-wrap: break-word;
}

  span.indent {
    margin-left: 10px;
    margin-right: 10px;
  }

  .clickable {
    cursor: pointer;
  }

  .doneBtn {
    margin: 0 auto;
    width: 10%;
  }

  .srchBx {
    width: 25%;
  margin: 0 auto;
  }

  .list-group-item {
    border: none;
  }

  .tab-content {
    background: white;
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
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
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
    margin: 20px 0;
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

</style>

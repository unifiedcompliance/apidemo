<template>
  <div class="full-height">
    <ucsidebar @changePage="changePage"></ucsidebar>
    <div id="right" class="column siteWrap">
      <!--Site Header-->
      <!--<base href="/">-->
      <base href="index">
      <ucheader></ucheader>
      <!--section based sub-headers-->
      <ucsubheader @changePage="changePage" :submenu="submenu" selPage="ADHierarchy"></ucsubheader>
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
           <adtreemenu :nodes="adTree.nodes" :depth=0 :showroot="true" :ucconfig="ucconfig" :key="btKey" :adSubjectMatters="adSubjectMatters" />
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
import adtreemenu from '@/components/adtreemenu'
import popcontent from '@/components/popcontent'
import modal from '@/components/modal'

export default {
  name: 'adhierarchy',
  components: {
    ucheader,
    ucsidebar,
    ucsubheader,
    adtreemenu,
    modal,
    popcontent
  },
  props: ['ucconfig', 'id'],
  data () {
    return {
      showModal: false,
      results: [],
      subjectMatters: [],
      adSubjectMatters: [],
      adParents: [],
      adChildren: [],
      adItems: [],
      adHierarchy: [],
      adResults: [],
      adResultsParents: [],
      tmpParents: [],
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
      this.getADHierarchy().then((data) => {
        this.getADSubjectMatters().then((ads) => {
          this.adHierarchy = data
          this.getADParents()
          this.adSubjectMatters = ads
          this.updateADTree(this.adParents)
        }).catch(
          err => {
            console.log(err)
          })
      }).catch((e) => console.log(e))
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
          for (let s of data) {
            if (s[0].ad_id === i.ad_id && s[1]) {
              if (s[1]) {
                if (!i.nodes.find(o => o.ad_name === s[1].ad_name)) {
                  i.nodes.push(s[1])
                }
              }
            }
          }
        }

        for (let j of tmp) {
          for (let i of j.nodes) {
            i.nodes = []
            for (let s of data) {
              if (s[1].ad_id === i.ad_id) {
                if (s[2]) {
                  if (!i.nodes.find(o => o.ad_name === s[2].ad_name)) {
                    i.nodes.push(s[2])
                  }
                }
              }
            }
          }
        }

        for (let j of tmp) {
          for (let k of j.nodes) {
            for (let i of k.nodes) {
              i.nodes = []
              for (let s of data) {
                if (s[2].ad_id === i.ad_id) {
                  if (s[3]) {
                    if (!i.nodes.find(o => o.ad_name === s[3].ad_name)) {
                      i.nodes.push(s[3])
                    }
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
                  console.log(i)
                  if (i.length > 0) {
                    i.nodes = []
                    for (let s of data) {
                      console.log(s)
                      if (s.length > 0) {
                        if (s[3].ad_id === i.ad_id) {
                          if (s[4]) {
                            if (!i.nodes.find(o => o.ad_name === s[4].ad_name)) {
                              console.log(s[4])
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
          this.adTree.nodes = await this.getSearchParents(data)
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
          /* let tmp = []
          *
           for (let item of response.data) {
             tmp.push(await this.getADInfo(item.id))
           }
           */
          // let test = this.getADParent(response.data)
          // console.log(test)
          let tmp = await this.getADParent(response.data)
          // console.log(test)

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
          return response.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
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
          let found = []
          let gp = true
          let node = await this.getADParentsAsync(result.id, 'id')
          while (gp) {
            if (node.length === 0 || !node[0].parent_id || node[0].parent_id === 0) {
              if (node) found.push(node[0])
              gp = false
            } else {
              found.push(node[0])
              node = await this.getADParentsAsync(node[0].parent_id, 'id')
            }
          }
          nodes.push(found.reverse())
        }
      }
      return nodes
    },
    removeDuplicates (array, key) {
      let lookup = new Set()

      return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
    },
    getADChildren: function (id) {
      let children = this.adHierarchy.filter((n) => { return n.parent_id === id })
      children.sort((a, b) => a.ad_name.localeCompare(b.ad_name))
      if (children) {
        for (let [idx, child ] of children.entries()) {
          if (child.has_children && child.has_children >= 1) {
            let found = this.getADChildren(child.ad_id)
            if (found.length > 0) {
              found.sort((a, b) => a.ad_name.localeCompare(b.ad_name))
              children[idx].nodes = found
            }
          }
        }
        return children
      } else return null
    },
    updateADTree: function (data) {
      let nodes = []
      for (let node of data) {
        let found = this.getADChildren(node.ad_id)
        if (found && found.length > 0) node.nodes = found
        nodes.push(node)
      }

      this.adTree.nodes = nodes
      // console.log(this.adTree)
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';
  @import '../assets/styles/treemenu.css';
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
    background-color: #fff;
  }
</style>

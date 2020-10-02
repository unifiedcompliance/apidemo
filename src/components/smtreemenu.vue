<template>
  <div class="container-fluid treemenu">
    <!--
    <div v-if="!isroot" class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="nodes" class="fa" :class="iconClasses"></i>
        {{ label }}
      </div>
    </div>
    -->
    <ul class="list-group" :style=" depth > 1 ? indent : ''" v-if="!showroot">
      <li class="list-group-item" v-if="children && children > 0">
        <span @click="toggleChildren" class="clickable fa" :class="iconClasses"></span>
        {{ label }}
      </li>
      <li class="list-group-item no-child" v-if="!children || children === 0">
      {{ label }}
        <span v-if="category" class="fa fa-info-circle clickable" @click="setDetails(id);showModal=true"></span>
      </li>
    </ul>
      <modal v-if="showModal" @close="showModal=false">
        <div class="panel-body" v-if="adDetails[id]" slot="body">
          <popcontent :adDetails="adDetails[id]"></popcontent>
        </div>
      </modal>
    <smtreemenu
      v-if="showChildren || showroot"
      v-for="node in nodes"
      :nodes="node.nodes"
      :label="node.name"
      :child-label="node.ad_name"
      :depth="depth + 1"
      :key="node.id"
      :showroot="false"
      :children="node.has_children"
      :category="node.category_id"
      :details="node.details"
      :id="node.id"
      :ucconfig="ucconfig"
      :adSubjectMatters="adSubjectMatters"
    >
    </smtreemenu>
  </div>
</template>
<script>
import modal from '@/components/modal'
import popcontent from '@/components/popcontent'

export default {
  props: { label: {
    type: String,
    default: 'root'
  },
  nodes: {
    type: Array,
    default: function () {
      return []
    }
  },
  children: {
    type: Number,
    default: 0
  },
  id: {
    type: Number,
    default: 0
  },
  depth: {
    type: Number,
    default: 0
  },
  showroot: {
    type: Boolean,
    default: false
  },
  category: {
    type: Number,
    default: null
  },
  ucconfig: {
    type: Object,
    default: this.ucconfig
  },
  adSubjectMatters: {
    type: Array,
    default: function () {
      return []
    }
  }
  },
  details: {
    type: Object,
    default: null
  },
  data () {
    return {
      showModal: false,
      showChildren: false,
      adDetails: []
    }
  },
  name: 'smtreemenu',
  created () {
    // console.log(this.nodes)

  },
  components: {
    modal,
    popcontent
  },
  computed: {
    iconClasses () {
      return {
        'fa-chevron-right': !this.showChildren,
        'fa-chevron-down': this.showChildren
      }
    },
    labelClasses () {
      return { 'has-children': this.nodes }
    },
    indent () {
      return { transform: `translate(${this.depth * 10}px)` }
    }
  },
  methods: {
    toggleChildren () {
      this.showChildren = !this.showChildren
    },
    getDetails (id) {
      if (this.adDetails[id]) {
        return this.adDetails[id]
      }
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
    getADS (id) {
      let sm = this.adSubjectMatters.filter((n) => n.ad_id === id)
      return (sm && sm.length > 0) ? sm[0].SubjectMattersStub['@set'] : null
    },
    setDetails (id) {
      if (!this.adDetails[id]) {
        this.getAD(id).then((data) => {
          this.adDetails = this.adDetails.filter((n) => n)
          data._sm = this.getADS(id)
          this.adDetails[id] = data
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/contact-engine';
@import '../assets/styles/treemenu.css';

indent {
  margin-left: 10px;
  margin-right: 10px;
}
.treemenu {
  padding: 0;
  margin: 0;
  .label-wrapper {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .has-children {
      cursor: pointer;
    }
  }
}

.list-group-item {
  border: none;
}

.tab-content {
  background: white;
}

.clickable {
  cursor: pointer;
}

.no-child {
  border: none;
}

.modal {
  background-color: rgba(0, 0, 0, 0.7);
}

.treemenu {
  .label-wrapper {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .has-children {
      cursor: pointer;
    }
  }
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

</style>

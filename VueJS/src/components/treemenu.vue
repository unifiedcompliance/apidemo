<template>
  <div class="treemenu">
    <!--
    <div v-if="!isroot" class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="nodes" class="fa" :class="iconClasses"></i>
        {{ label }}
      </div>
    </div>
    -->
    <ul class="list-group" :style=" depth > 1 ? indent : ''" v-if="!showroot">
      <li class="list-group-item" v-if="children > 0">
        <span @click="toggleChildren" class="clickable fa" :class="iconClasses"></span>
        {{ label }}
      </li>
      <li class="list-group-item no-child"  v-if="children === 0">
      {{ label }} <popover width="500" :content="getDetails(details)" placement="right"><span v-if="category === 'AD'" class="fa fa-info-circle clickable"></span></popover>
      </li>
    </ul>
    <treemenu
      v-if="showChildren || showroot"
      v-for="node in nodes"
      :nodes="node.nodes"
      :label="node.ad_name"
      :depth="depth + 1"
      :key="node.ad_id"
      :showroot="false"
      :children="node.has_children"
      :category="node.category_name"
      :details="node.details"
    >
    </treemenu>
  </div>
</template>
<script>
import popover from 'vue-blu/src/components/popover'

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
  depth: {
    type: Number,
    default: 0
  },
  showroot: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: null
  },
  details: {
    type: Object,
    default: null
  }
  },
  data () {
    return { showChildren: false }
  },
  name: 'treemenu',
  created () {
  },
  components: {
    popover
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
    getDetails (data) {
      if (data) {
        let details = {
          name: data.published_name,
          subject_matter: data.subject_matter
        }

        return JSON.stringify(details)
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

.clickable {
  cursor: pointer;
}

.no-child {
  border: none;
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

.list-group-item {
  border: none;
}
</style>

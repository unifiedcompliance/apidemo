<template>
  <transition name="modal">
    <!--
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="tab-content" v-show="value">
            <div class="tab-pane fade in active">
              <div class="box margin-top-20">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.id" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-12 no-padding">
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.official_name" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 no-padding">
                    <div class="form-group">
                      <label>Created On</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.CoreMetaData.date_created" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Updated on</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.CoreMetaData.date_modified" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Effective</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.effective_date" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 no-padding">
                    <div class="form-group">
                      <label>Type</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.type" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Citation Format</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.citation_format" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 no-padding">
                    <div class="form-group">
                      <label>Language</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.language" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Parent Category</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.parent_category" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Dictionary ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.di_fk" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border col-sm-10">
                    <legend class="scheduler-border">Subject Matters</legend>
                    <div class="col-sm-10 no-padding">
                      <div class="form-group" v-if="adDetails._sm">
                        <form>
                          <select class="form-control form-control-sm">
                            <option  v-for="sm of adDetails._sm" :key="sm.sm_id">{{ sm.sm_name }}</option>
                          </select>
                        </form>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border col-sm-10">
                    <legend class="scheduler-border">Common Names</legend>
                    <div class="col-sm-10 no-padding">
                      <div class="form-group">
                        <ul v-for="sm of adDetails.CommonNames['@set']" :key="sm.id">
                          <li>{{ sm.name }}</li>
                        </ul>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Identifiers</legend>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Availability</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.availability" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Publish Date</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.published_date" disabled="">
                      </div>
                    </div>
                  <div class="col-sm-6 no-padding">
                    <div class="form-group">
                      <label>Publisher/Promulgator</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.Identifiers['@set'][0].publisher_promulgator_name" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Publisher/Promulgator ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.Identifiers['@set'][0].publisher_promulgator_id" disabled="">
                    </div>
                  </div>
                    <div class="col-sm-12 no-padding">
                      <div class="form-group">
                        <label>Url</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.url" disabled="">
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Originator</legend>
                    <div class="col-sm-8 no-padding">
                      <div class="form-group">
                        <label>Originator</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.Originator.organization_name" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Originator ID</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.Originator.organization_id" disabled="">
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">ADMapping</legend>
                    <div class="col-sm-12 no-padding">
                      <div class="form-group" v-if="adDetails.ADMapping['@set'][0].Team.id">
                        <form>
                          <select class="form-control form-control-sm">
                            <option>Unified Compliance Team</option>
                          </select>
                        </form>
                        <div class="col-sm-12 margin-top-5">
                        <ul class="list-unstyled" v-for="adm of adDetails.ADMapping['@set'][0].Team['@set']" :key="adm.id">
                          <li>{{adm.Member.person_name}} ({{adm.Member.role}})</li>
                        </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Status</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].status" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label>Released</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].release_date" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>License</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].license_info" disabled="">
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
              <button @click.prevent="close" class="mt-3 border-b border-teal font-semibold">Close</button>
          </div>
        </div>
      </div>
    </div>
    -->
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

        <!--
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
      -->
          <div class="modal-body">
            <div class="modal-default-button fa fa-close fa-lg clickable" @click="$emit('close')"></div>
            <slot name="body">
            </slot>
          </div>
<!--
          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
          -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  props: [
    'adDetails', 'value'
  ],
  data () {
    return {
      showModal: false
    }
  },
  name: 'modal',
  created () {
    // console.log(this.nodes)

  },
  components: {},
  computed: {

  },
  methods: {
    openModal () {
      this.modalOpen = !this.modalOpen
    },
    close () {
      this.$emit('input', !this.value)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/contact-engine';

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
.clickable {
  cursor: pointer;
}

</style>

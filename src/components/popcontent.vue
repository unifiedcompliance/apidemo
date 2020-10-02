<template>
  <div class="tab-content">
            <div class="tab-pane fade in active">
              <div class="box margin-top-20">
                <div class="row">
                  <div class="col-sm-2">
                    <div class="form-group">
                      <label>ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.id" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-8 no-padding">
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.official_name" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 no-padding">
                    <div class="form-group">
                      <label>Created On</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.CoreMetaData.date_created" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Updated on</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.CoreMetaData.date_modified" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Effective</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.effective_date" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3 no-padding">
                    <div class="form-group">
                      <label>Type</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.type" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Citation Format</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.citation_format" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3 no-padding">
                    <div class="form-group">
                      <label>Language</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.language" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Parent Category</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.parent_category" disabled="">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Dictionary ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.di_fk" disabled="">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <fieldset class="scheduler-border col-sm-12">
                    <legend class="scheduler-border">Subject Matters</legend>
                    <div class="col-sm-12 no-padding">
                      <div class="form-group scrollable sm-scroll-box" v-if="adDetails._sm && adDetails._sm.length > 0">
                        <ul v-for="sm of adDetails._sm" :key="sm.sm_id">
                            <li>{{ sm.sm_name }}</li>
                        </ul>
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
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Availability</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.availability" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-3">
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
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Publisher/Promulgator ID</label>
                      <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.Identifiers['@set'][0].publisher_promulgator_id" disabled="">
                    </div>
                  </div>
                    <div class="col-sm-6 no-padding">
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
                  <fieldset class="scheduler-border" v-if="adDetails.ADMapping['@set'][0].status === 'Released'">
                    <legend class="scheduler-border">ADMapping</legend>
                    <div class="col-sm-12 no-padding scrollable adm-scroll-box">
                    <div class="col-sm-12 no-padding">
                      <div class="form-group" v-if="adDetails.ADMapping['@set'][0].Team.id">
                        <div>
                            Unifed Compliance Team
                        </div>
                        <div class="col-sm-12 margin-top-5">
                        <ul v-for="adm of adDetails.ADMapping['@set'][0].Team['@set']" :key="adm.id">
                          <li>{{adm.Member.person_name}} ({{adm.Member.role}})</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Status</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].status" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Released</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].release_date" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>License</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="adDetails.ADMapping['@set'][0].license_info" disabled="">
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Url</label>
                        <input type="text" class="form-control contactinfoinpt" placeholder="" :value="'https://cch.commoncontrolshub.com/workspace-commoncontrols.php?adID='+adDetails.id" disabled="">
                      </div>
                    </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
</template>
<script>

export default {
  props: [
    'adDetails'
  ],
  data () {
    return {}
  },
  name: 'popcontent',
  created () {
    // console.log(this.nodes)

  },
  components: {},
  computed: {

  },
  methods: {}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/contact-engine';

.tab-content {
  background: white;
  padding: 0px;
}

.form-group input, .form-group select {
  padding: 15px;
  height: 20px;
}

.form-group select {
  padding: 2px 0 2px 25px;
  height: 30px;
}
legend {
  margin-bottom: 10px;
  font-size: 15px;
}

li {
  font-size: 15px;
}

.select-icon {
  position: relative;
  top: 28px;
  left: 6px;
}

.sm-scroll-box {
  height: 50px;
  width: 100%;
}

.adm-scroll-box {
  height: 260px;
}

</style>

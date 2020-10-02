<template>
  <div class="full-height">
  <ucsidebar @changePage="changePage"></ucsidebar>
  <div id="right" class="column siteWrap">
    <!--Site Header-->
    <!--<base href="/">-->
    <base href="index">
    <ucheader></ucheader>
    <!--section based sub-headers-->
    <!--end section based sub-headers-->
    <div class="container container-top-level page-content">
      <div class="alert alert-danger hidden" role="alert">
        <button type="button" class="close" aria-label="Close" data-dismiss="alert">
          <i class="fa fa-times fa-lg" aria-hidden="true"></i>
        </button>
        <strong>Error: </strong>
        <span></span>
      </div>

      <!--Main Content-->
      <div>
          <h2>Welcome to the API2 Demo App</h2>
          <h4>This showcases our API functionality in used real world cases</h4>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ucheader from '@/components/ucheader'
import ucsidebar from '@/components/ucsidebar'
export default {
  name: 'index',
  props: [],
  components: {
    'ucheader': ucheader,
    'ucsidebar': ucsidebar
  },
  methods: {

    changePage: function(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';
</style>

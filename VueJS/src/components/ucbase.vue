<template>
  <div id="right" class="column siteWrap">
    <!--Site Header-->
    <!--<base href="/">-->
    <base href="ucbase">
    <ucheader class="site-header">
      <div class="header-left">
      </div>

      <div class="header-right">
        <img src="/static/assets/images/question-icon.png">
        <span class="divider"></span>
        Hello, <a class="headlineToggle closed" id="profileToggle">
        <span>Michael Wedderburn</span>
        <img src="/static/assets/images/arrow-down-grey.png">
      </a>
      </div>

      <ul class="inpageSubNav closed" id="profilePopup">
        <li>
          <span class="txt-increase">Michael Wedderburn</span><br>
          mwedderburn@unifiedcompliance.com
        </li>
        <li class="bgCream">
          <a href="javascript:;" class="btn medBtn whiteBtn btn-logout">Sign
            Out</a>
        </li>
      </ul>
      <input type="hidden" id="login-addr" value="mwedderburn@unifiedcompliance.com">
    </ucheader>
    <!--section based sub-headers-->
    <ucsubheader></ucsubheader>
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
      </div>
    </div>

  </div>
</template>

<script>
  import ucsubheader from '@/components/ucsubheader'
  export default {
    name: 'ucbase',
    components: {
      'ucsubheader': ucsubheader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

<template>
  <div class="site-header">
    <div class="header-left">
    </div>

    <div class="header-right">
      <img src="/static/assets/images/question-icon.png">
      <span class="divider"></span>
      Hello, <a class="headlineToggle closed" id="profileToggle">
      <span>Demo User</span>
      <img src="/static/assets/images/arrow-down-grey.png">
    </a>
    </div>

    <ul class="inpageSubNav closed" id="profilePopup">
      <li>
        <span class="txt-increase">Demo User</span><br>
        demouser@unifiedcompliance.com
      </li>
      <li class="bgCream">
        <a href="javascript:;" class="btn medBtn whiteBtn btn-logout">Sign
          Out</a>
      </li>
    </ul>
    <input type="hidden" id="login-addr" value="info@unifiedcompliance.com">
  </div>
</template>

<script>
export default {
  name: 'ucheader'
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';

</style>

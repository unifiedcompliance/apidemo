<template>
  <div id="left" class="column navWrap closed" role="menubar" aria-expanded="false">
    <!--Site Side Nav Bar-->
    <ul>
      <li id="menutoggle" role="menuitem">
        <span class="menu-item-icon" role="img">
            <img src="/static/assets/images/nav-menu.png" alt="Toggle menu expanded or collapsed">
        </span>
        <span class="menu-item-text">&nbsp;</span>
      </li>
      <li role="menuitem" class=""><a href="javascript:;" @click="changePage('Index')"><span
        class="menu-item-icon" role="img"><i class="fa fa-home fa-2x" aria-hidden="true"></i></span>
        <span class="menu-item-text">&nbsp;</span></a></li>
      <li role="menuitem" class=""><a href="javascript:;" @click="changePage('ContactInfo')">
        <span class="menu-item-icon" role="img"><i class="fa fa-users fa-2x" aria-hidden="true"></i></span>
        <span class="menu-item-text">&nbsp;</span></a></li>
      <li role="menuitem" class=""><a href="javascript:;" @click="changePage('AdLists')">
        <span class="menu-item-icon" role="img"><i class="fa fa-book fa-2x" aria-hidden="true"></i></span>
        <span class="menu-item-text">&nbsp;</span></a></li>
      <li role="menuitem" class=""><a href="javascript:;">
        <span class="menu-item-icon" role="img"><i class="fa fa-list-alt fa-2x" aria-hidden="true"></i></span><span
        class="menu-item-text">&nbsp;</span></a></li>
      <li role="menuitem" class=""><a href="javascript:;" @click="changePage('Settings')">
        <span class="menu-item-icon" role="img"><i class="fa fa-cog fa-2x" aria-hidden="true"></i></span>
        <span class="menu-item-text">&nbsp;</span></a></li>
      <li>
        &nbsp;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ucsidenav',
  props: [],
  methods: {
    changePage: function(page){
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';

</style>

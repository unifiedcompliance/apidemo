<template>
  <div class="subheader-nav">
    <div class="container">
      <ul id="main-menu">
        <li v-for="page in submenu">
          <a :class="page.url === selPage ? 'activeLink' : ''" href="javascript:void(0);" @click="changePage(page.url)">
            {{page.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subheader',
  props: ['submenu', 'selPage'],
  methods: {
    changePage: function (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/contact-engine';

</style>

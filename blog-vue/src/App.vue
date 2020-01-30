<template>
  <div id="app" class="container">
    
    <HeaderNavBar v-if="$router.currentRoute.path != '/login'"></HeaderNavBar>
    <router-view></router-view>
  </div>
</template>

<script>

import HeaderNavBar from './components/HeaderNavBar.vue'


export default {
  name: 'app',
  components: {    
    HeaderNavBar
  }
}
</script>



<template>
  <b-container fluid="sm" id="app"  class="border-pink">
    <router-view/>
  </b-container>
</template>

<script>
import CompoMain from './components/ComponentMain.vue'
export default {
  name: 'App',
  components: {
    CompoMain
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: rgb(31, 30, 30);
}
.border-pink{
  border-top-style: solid;
  border-top-color: rgb(241, 8, 124);
}
.input {
  border: 1px solid white;
  background-color: rgb(49, 49, 49);
  border-radius: 4px;
  -moz-border-radius: 4px;
  color: white
}
</style>

<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
      <ul>
        <li v-for='item in list' :key='item' @click='changePage(item)'> {{item}}</li>
      </ul>
    <P>{{$store.state.version}}</P>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        list:['first','second','third']
      }
    },
    methods:{
      changePage(item){
          // this.$store.commit('User_Name',item);
          this.$router.push(`/${item}`)
      }
    }
  }
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
